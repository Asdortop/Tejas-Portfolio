import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Zap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/PageShell';

/* ═══════════════════════════════════════════════════════════
   DATA STREAM CANVAS
   Falling vertical cyan columns of characters/geometric lines.
   Replaces the old Neural Mesh — much more terminal-coded.
═══════════════════════════════════════════════════════════ */
const GLYPHS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>[]{}//\\|`~+-=*%#@!?'.split('');
const COLS_DENSITY = 28; // px per column

function DataStream() {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let w, h, cols, drops;

        function init() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            cols = Math.floor(w / COLS_DENSITY);
            drops = Array.from({ length: cols }, () => Math.random() * -h * 0.6);
        }

        init();
        window.addEventListener('resize', init);

        const fontSize = 12;

        function draw() {
            // Faint black trail — creates the streaking effect
            ctx.fillStyle = 'rgba(0,0,0,0.055)';
            ctx.fillRect(0, 0, w, h);

            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

            for (let i = 0; i < cols; i++) {
                const x = i * COLS_DENSITY;
                const y = drops[i];

                // Head glyph — bright cyan
                const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                ctx.fillStyle = 'rgba(0,255,255,0.85)';
                ctx.fillText(glyph, x, y);

                // Draw a geometric line trailing below on some columns
                if (Math.random() > 0.97) {
                    ctx.strokeStyle = 'rgba(0,255,255,0.06)';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(x + 6, y);
                    ctx.lineTo(x + 6, y + Math.random() * 60 + 20);
                    ctx.stroke();
                }

                // Occasional hot-pink glyph for accent
                if (Math.random() > 0.985) {
                    ctx.fillStyle = 'rgba(255,0,127,0.5)';
                    ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - fontSize);
                }

                // Reset after column falls past bottom
                if (drops[i] > h && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i] += fontSize * 1.3;
                }
            }
            rafRef.current = requestAnimationFrame(draw);
        }

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', init);
        };
    }, []);

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
                opacity: 0.35,
            }}
        />
    );
}

/* ═══════════════════════════════════════════════════════════
   BOOT SEQUENCE
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
                            color: '#22C55E',
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
   GLITCH TEXT (unchanged, used in hero)
═══════════════════════════════════════════════════════════ */
function GlitchText({ children, style }) {
    return (
        <span
            className="glitch-text"
            style={{ position: 'relative', display: 'inline-block', ...style }}
        >
            <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
            <span
                className="glitch-layer-cyan"
                aria-hidden
                style={{
                    position: 'absolute', inset: 0,
                    color: '#00FFFF', mixBlendMode: 'screen',
                    zIndex: 3, pointerEvents: 'none', userSelect: 'none',
                }}
            >
                {children}
            </span>
            <span
                className="glitch-layer-pink"
                aria-hidden
                style={{
                    position: 'absolute', inset: 0,
                    color: '#FF007F', mixBlendMode: 'screen',
                    zIndex: 4, pointerEvents: 'none', userSelect: 'none',
                }}
            >
                {children}
            </span>
            <span className="halftone-overlay" />
        </span>
    );
}

/* ═══════════════════════════════════════════════════════════
   MARQUEE STATUS BAR
   Fast-scrolling horizontal strip with repeating terminal tags.
═══════════════════════════════════════════════════════════ */
const MARQUEE_TEXT = 'AI/LLM ENTHUSIAST // ML ENGINEER // BACKEND ARCHITECT // DEEP LEARNING RESEARCHER // AGENTIC AI BUILDER // ';

function MarqueeBar() {
    const repeated = MARQUEE_TEXT.repeat(8);
    return (
        <div
            style={{
                width: '100%',
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,0,127,0.18)',
                borderBottom: '1px solid rgba(255,0,127,0.18)',
                background: 'rgba(255,0,127,0.04)',
                padding: '0.55rem 0',
                marginBottom: '2.5rem',
            }}
        >
            <div className="marquee-content"
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#FF007F',
                    textShadow: '0 0 10px rgba(255,0,127,0.5)',
                    willChange: 'transform',
                }}
            >
                {repeated}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   SYSTEM BIO BLOCK
   Terminal-styled bio that appears below the hero + portrait row.
═══════════════════════════════════════════════════════════ */
function SystemBioBlock() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.35 }}
            style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 1.4vw, 0.875rem)',
                lineHeight: 1.9,
                color: '#22C55E',
                padding: '1.1rem 1.4rem',
                border: '1px solid rgba(34,197,94,0.2)',
                borderLeft: '3px solid #22C55E',
                background: 'rgba(34,197,94,0.04)',
                borderRadius: 2,
                maxWidth: 680,
                marginTop: '2rem',
                textShadow: '0 0 8px rgba(34,197,94,0.35)',
            }}
        >
            <div style={{ marginBottom: '0.3rem', opacity: 0.55, fontSize: '0.68rem', color: '#00FFFF', letterSpacing: '0.08em' }}>
                ┌─ [system_bio] ─────────────────────────────────
            </div>
            <div>&gt; Final-year B.Tech in AI &amp; ML student at VNRVJIET.</div>
            <div>&gt; Focused on building production-ready Agentic AI</div>
            <div>&gt;&nbsp; and scalable backend architectures.</div>
            <div style={{ marginTop: '0.3rem', opacity: 0.55, fontSize: '0.68rem', color: '#00FFFF', letterSpacing: '0.08em' }}>
                └───────────────────────────────────────────────
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   GHIBLI-GLITCH PORTRAIT
   Default: serene image with soft border glow.
   Toggled: CSS chromatic aberration + jitter + scanline overlay.
   Framer Motion spring transitions (stiffness: 300, damping: 20).
═══════════════════════════════════════════════════════════ */
function GhibliGlitchPortrait() {
    const [isGlitched, setIsGlitched] = useState(false);

    // Spring values for the wrapper scale feel
    const scaleSpring = useSpring(1, { stiffness: 300, damping: 20 });
    const shadowSize = useTransform(scaleSpring, [1, 1.04], [
        '0 0 30px rgba(255,0,127,0.35)',
        '0 0 60px rgba(255,0,127,0.7), 0 0 120px rgba(0,255,255,0.3)',
    ]);

    const handleToggle = () => {
        setIsGlitched(prev => !prev);
        scaleSpring.set(1.04);
        setTimeout(() => scaleSpring.set(1), 250);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                flexShrink: 0,
            }}
        >
            {/* Portrait wrapper */}
            <motion.div
                style={{
                    position: 'relative',
                    width: 'clamp(200px, 22vw, 280px)',
                    aspectRatio: '3/4',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: shadowSize,
                    border: isGlitched
                        ? '1px solid rgba(0,255,255,0.6)'
                        : '1px solid rgba(255,0,127,0.3)',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s',
                }}
                onClick={handleToggle}
            >
                {/* The actual image */}
                <img
                    src="/3b4a8793-f31e-4617-bf7c-8544b6563208.jpg"
                    alt="Tejas Guduru"
                    className={isGlitched ? 'portrait-glitch' : ''}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        position: 'relative',
                        // Glitch mode: desaturate + high contrast → cyberpunk look
                        filter: isGlitched
                            ? 'contrast(1.4) saturate(0.3) brightness(0.85) hue-rotate(160deg)'
                            : 'contrast(1.05) saturate(1.1) brightness(0.95)',
                        transition: isGlitched ? 'none' : 'filter 0.5s ease',
                    }}
                />

                {/* Halftone dot grid overlay — visible in glitch mode */}
                <AnimatePresence>
                    {isGlitched && (
                        <motion.div
                            key="halftone"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: 'radial-gradient(circle, rgba(255,0,127,0.25) 1px, transparent 1px)',
                                backgroundSize: '5px 5px',
                                mixBlendMode: 'screen',
                                pointerEvents: 'none',
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Cyan chromatic aberration pseudo-layer (DOM-based) */}
                <AnimatePresence>
                    {isGlitched && (
                        <motion.div
                            key="chroma-cyan"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.18 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(/3b4a8793-f31e-4617-bf7c-8544b6563208.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center top',
                                filter: 'saturate(0) brightness(3) sepia(1) hue-rotate(150deg)',
                                transform: 'translateX(5px)',
                                mixBlendMode: 'screen',
                                pointerEvents: 'none',
                                animation: 'chroma-cyan 0.1s steps(1) infinite',
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Hot-pink chromatic aberration layer */}
                <AnimatePresence>
                    {isGlitched && (
                        <motion.div
                            key="chroma-red"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.18 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(/3b4a8793-f31e-4617-bf7c-8544b6563208.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center top',
                                filter: 'saturate(0) brightness(3) sepia(1) hue-rotate(-30deg)',
                                transform: 'translateX(-5px)',
                                mixBlendMode: 'screen',
                                pointerEvents: 'none',
                                animation: 'chroma-red 0.1s steps(1) infinite',
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* CRT scanlines — always present, more visible in glitch */}
                <div
                    className={isGlitched ? 'portrait-scanlines' : ''}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: isGlitched ? undefined : 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Mode label in corner */}
                <div style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.5rem',
                    background: isGlitched ? 'rgba(0,255,255,0.15)' : 'rgba(255,0,127,0.15)',
                    border: isGlitched ? '1px solid rgba(0,255,255,0.4)' : '1px solid rgba(255,0,127,0.4)',
                    color: isGlitched ? '#00FFFF' : '#FF007F',
                    borderRadius: 1,
                    transition: 'all 0.3s',
                }}>
                    {isGlitched ? 'CYBER_MODE' : 'GHIBLI_MODE'}
                </div>
            </motion.div>

            {/* Toggle button */}
            <motion.button
                onClick={handleToggle}
                whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.96 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1.2rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    borderRadius: 2,
                    border: isGlitched ? '1px solid rgba(0,255,255,0.5)' : '1px solid rgba(255,0,127,0.5)',
                    background: isGlitched ? 'rgba(0,255,255,0.07)' : 'rgba(255,0,127,0.07)',
                    color: isGlitched ? '#00FFFF' : '#FF007F',
                    textShadow: isGlitched ? '0 0 8px rgba(0,255,255,0.6)' : '0 0 8px rgba(255,0,127,0.6)',
                    boxShadow: isGlitched ? '0 0 14px rgba(0,255,255,0.15)' : '0 0 14px rgba(255,0,127,0.15)',
                    transition: 'all 0.3s',
                }}
            >
                {isGlitched
                    ? <><RefreshCw size={11} /> RESTORE_REALITY</>
                    : <><Zap size={11} /> SWITCH_REALITY</>
                }
            </motion.button>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION (unchanged core, same animations)
═══════════════════════════════════════════════════════════ */
const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};
const heroItem = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1, y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
};

function HeroSection() {
    return (
        <motion.div
            key="hero"
            variants={heroContainer}
            initial="hidden"
            animate="show"
            style={{ flex: 1, minWidth: 0 }}
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
                    maxWidth: 480,
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
                        fontFamily: 'var(--font-mono)',
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
                        fontFamily: 'var(--font-mono)',
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
    const onDone = useCallback(() => setBooted(true), []);

    return (
        <>
            {/* Data-stream canvas — always present behind everything */}
            <DataStream />

            <AnimatePresence mode="wait">
                {!booted ? (
                    <BootSequence key="boot" onDone={onDone} />
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
                                    padding: '2rem clamp(1.5rem, 6vw, 6rem) 4rem',
                                    minHeight: 'calc(100vh - 6rem)',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* ── Marquee strip ── */}
                                <MarqueeBar />

                                {/* ── Hero row: text left, portrait right ── */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 'clamp(2rem, 5vw, 5rem)',
                                    flexWrap: 'wrap',
                                }}>
                                    <HeroSection />
                                    <GhibliGlitchPortrait />
                                </div>

                                {/* ── System Bio block ── */}
                                <SystemBioBlock />
                            </section>
                        </PageShell>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
