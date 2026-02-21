import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/PageShell';

/* ═══════════════════════════════════════════════════════════
   NEURAL MESH CANVAS
   120 particles in hot-pink / cyber-cyan with low opacity.
   Connected by faint lines when within LINK_DIST.
   Mouse "magnet" pulls within 150px.
   Slow Z-axis rotation via per-frame angle accumulation.
═══════════════════════════════════════════════════════════ */
const PARTICLE_COUNT = 120;
const LINK_DIST = 130;
const MOUSE_DIST = 150;
const MOUSE_FORCE = 0.25;
const ROTATION_SPEED = 0.00012; // radians / ms
const COLORS = [
    { r: 255, g: 0, b: 127 }, // hot pink  #FF007F
    { r: 0, g: 255, b: 255 }, // cyber cyan #00FFFF
];

function makeParticle(w, h) {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.7,
        alpha: Math.random() * 0.35 + 0.12,
        ...c,
    };
}

function NeuralMesh() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const stateRef = useRef(null);
    const rafRef = useRef(null);

    const init = useCallback((canvas) => {
        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight;
        stateRef.current = {
            particles: Array.from({ length: PARTICLE_COUNT }, () => makeParticle(w, h)),
            angle: 0,
            lastTime: performance.now(),
            w, h,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        init(canvas);

        const onResize = () => init(canvas);
        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        function draw(now) {
            const s = stateRef.current;
            if (!s) return;
            const dt = Math.min(now - s.lastTime, 40); // cap at 40ms
            s.lastTime = now;
            s.angle += ROTATION_SPEED * dt;

            const { w, h, particles } = s;
            const cx = w / 2;
            const cy = h / 2;
            const cos = Math.cos(s.angle);
            const sin = Math.sin(s.angle);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            ctx.clearRect(0, 0, w, h);

            // Update and rotate particles
            for (const p of particles) {
                // Mouse magnet
                const dx = mx - p.x;
                const dy = my - p.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < MOUSE_DIST * MOUSE_DIST && distSq > 1) {
                    const dist = Math.sqrt(distSq);
                    const force = (MOUSE_DIST - dist) / MOUSE_DIST * MOUSE_FORCE;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                // Friction
                p.vx *= 0.992;
                p.vy *= 0.992;

                // Move
                p.x += p.vx * (dt * 0.06);
                p.y += p.vy * (dt * 0.06);

                // Bounce
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                if (p.x > w) { p.x = w; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                if (p.y > h) { p.y = h; p.vy *= -1; }

                // Z-rotation: rotate position around canvas center
                const rx = p.x - cx;
                const ry = p.y - cy;
                const nx = rx * cos - ry * sin;
                const ny = rx * sin + ry * cos;
                // Apply a tiny fraction of the rotation each frame for a "drift" feel
                p.x = cx + rx + (nx - rx) * 0.004;
                p.y = cy + ry + (ny - ry) * 0.004;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK_DIST) {
                        const lineAlpha = (1 - dist / LINK_DIST) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${a.r},${a.g},${a.b},${lineAlpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        }

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [init]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
}

/* ═══════════════════════════════════════════════════════════
   BOOT SEQUENCE
   Phase 0 (0–1.5s) : Terminal lines type out one by one
   Phase 1 (1.5s+)  : Hero slides in with spring animation
═══════════════════════════════════════════════════════════ */
const BOOT_LINES = [
    '> Initializing Tejas_Guduru.sys...',
    '> Loading Core_Modules...',
    '> Status: Optimal',
];

function BootSequence({ onDone }) {
    const [visibleLines, setVisibleLines] = useState([]);

    useEffect(() => {
        const timers = [];
        BOOT_LINES.forEach((line, i) => {
            timers.push(setTimeout(() => {
                setVisibleLines(prev => [...prev, line]);
            }, 350 + i * 420));
        });
        timers.push(setTimeout(onDone, 1500));
        return () => timers.forEach(clearTimeout);
    }, [onDone]);

    return (
        <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
            transition={{ exit: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '4rem clamp(2rem, 8vw, 8rem)',
                background: '#000000',
                zIndex: 40,
            }}
        >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                {visibleLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        style={{
                            color: line.includes('Optimal') ? '#22C55E' : '#22C55E',
                            marginBottom: '0.75rem',
                            letterSpacing: '0.02em',
                            textShadow: '0 0 12px rgba(34,197,94,0.6)',
                        }}
                    >
                        {line}
                        {i === visibleLines.length - 1 && (
                            <span className="cursor-blink" style={{ marginLeft: 4 }}>_</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   HALFTONE GLITCH TEXT
   Three layered spans: white (base), cyan (top-left offset),
   hot-pink (bottom-right offset). CSS animations clip each
   layer on hover for the Spider-Verse slice effect.
   A pink halftone dot grid overlays via .halftone-overlay.
═══════════════════════════════════════════════════════════ */
function GlitchText({ children, style }) {
    return (
        <span
            className="glitch-text"
            style={{ position: 'relative', display: 'inline-block', ...style }}
        >
            {/* White baseline */}
            <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>

            {/* Cyan layer */}
            <span
                className="glitch-layer-cyan"
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    color: '#00FFFF',
                    mixBlendMode: 'screen',
                    zIndex: 3,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                {children}
            </span>

            {/* Hot-pink layer */}
            <span
                className="glitch-layer-pink"
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    color: '#FF007F',
                    mixBlendMode: 'screen',
                    zIndex: 4,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                {children}
            </span>

            {/* Halftone dot overlay */}
            <span className="halftone-overlay" />
        </span>
    );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════ */
const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};
const heroItem = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1, y: 0,
        transition: { type: 'spring', stiffness: 500, damping: 33 },
    },
};

function HeroSection() {
    return (
        <motion.div
            key="hero"
            variants={heroContainer}
            initial="hidden"
            animate="show"
            style={{ maxWidth: 740 }}
        >
            {/* Monospace status line */}
            <motion.div variants={heroItem} style={{ marginBottom: '1.75rem' }}>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#22C55E',
                    letterSpacing: '0.06em',
                    padding: '0.3rem 0.8rem',
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: 2,
                    background: 'rgba(34,197,94,0.07)',
                    textShadow: '0 0 8px rgba(34,197,94,0.6)',
                }}>
                    ▶ SYS.STATUS: ONLINE
                </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={heroItem}
                style={{
                    fontSize: 'clamp(2.6rem, 7vw, 5rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    margin: '0 0 1rem',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    fontFamily: 'var(--font-sans)',
                }}>
                Tejas Guduru.
            </motion.h1>

            {/* Tagline with halftone glitch */}
            <motion.div variants={heroItem} style={{ marginBottom: '1.5rem' }}>
                <GlitchText
                    style={{
                        fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
                        fontWeight: 800,
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        fontFamily: 'var(--font-sans)',
                        color: '#FFFFFF',
                    }}
                >
                    I build intelligent systems.
                </GlitchText>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={heroItem}
                style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '2.75rem',
                    lineHeight: 1.75,
                    fontFamily: 'var(--font-sans)',
                    maxWidth: 520,
                }}>
                B.Tech · Computer Science AI &amp; ML · VNR VJIET · Hyderabad, India
            </motion.p>

            {/* CTAs */}
            <motion.div variants={heroItem}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Link to="/projects"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                        padding: '0.78rem 1.8rem', borderRadius: 2,
                        background: '#FF007F',
                        color: '#000000',
                        fontSize: '0.875rem', fontWeight: 700,
                        fontFamily: 'var(--font-sans)',
                        textDecoration: 'none',
                        boxShadow: '0 0 24px rgba(255,0,127,0.45)',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        e.currentTarget.style.boxShadow = '4px 4px 0 #00FFFF, 0 0 32px rgba(255,0,127,0.6)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = '0 0 24px rgba(255,0,127,0.45)';
                    }}
                >
                    View Projects <ArrowRight size={15} />
                </Link>
                <a href="mailto:tejashguduru@gmail.com"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                        padding: '0.76rem 1.8rem', borderRadius: 2,
                        background: 'transparent',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '0.875rem', fontWeight: 600,
                        fontFamily: 'var(--font-sans)',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, color 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#00FFFF';
                        e.currentTarget.style.color = '#00FFFF';
                        e.currentTarget.style.transform = 'translate(-1px, -1px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.transform = '';
                    }}
                >
                    <Mail size={14} /> Get in touch
                </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={heroItem}
                style={{ display: 'flex', gap: '0.9rem' }}>
                {[
                    { href: 'https://github.com/tejasguduru', icon: Github, label: 'GitHub' },
                    { href: 'https://linkedin.com/in/tejasguduru', icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                        aria-label={label}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 38, height: 38, borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.45)',
                            textDecoration: 'none',
                            transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = '#FF007F';
                            e.currentTarget.style.borderColor = '#FF007F';
                            e.currentTarget.style.boxShadow = '0 0 12px rgba(255,0,127,0.4)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                            e.currentTarget.style.boxShadow = '';
                            e.currentTarget.style.transform = '';
                        }}
                    >
                        <Icon size={17} />
                    </a>
                ))}
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   HOME  (root export)
═══════════════════════════════════════════════════════════ */
export default function Home() {
    const [booted, setBooted] = useState(false);

    return (
        <>
            {/* Full-viewport neural mesh — always present behind everything */}
            <NeuralMesh />

            <AnimatePresence mode="wait">
                {!booted ? (
                    <BootSequence key="boot" onDone={() => setBooted(true)} />
                ) : (
                    <motion.div
                        key="home-hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <PageShell>
                            <section
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    padding: '2rem clamp(1.5rem, 6vw, 6rem) 4rem',
                                    minHeight: 'calc(100vh - 6rem)',
                                }}
                            >
                                <HeroSection />
                            </section>
                        </PageShell>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
