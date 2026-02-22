import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { Briefcase, Trophy, Server, Leaf, Award } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE DATA
═══════════════════════════════════════════════════════════ */
const EXPERIENCES = [
    {
        type: 'work',
        title: 'Alfago Research LLP',
        role: 'Backend Intern',
        date: 'Jul 2024 – Sep 2024',
        description:
            'Designed and built a Portfolio Management backend from scratch. Containerized the full service stack with Docker and deployed to AWS — achieving production availability and on-demand horizontal scaling.',
        bullets: [
            'Architected RESTful API with FastAPI + PostgreSQL',
            'Docker Compose orchestration for local & staging environments',
            'AWS EC2/S3 deployment pipeline with environment-based config',
        ],
        icon: Server,
        imageBg: 'linear-gradient(135deg, rgba(255,0,127,0.08) 0%, rgba(0,0,0,0) 100%)',
        imageLabel: 'ALFAGO_RESEARCH',
    },
    {
        type: 'work',
        title: 'Infosys Springboard',
        role: 'AI / ML Intern',
        date: 'May 2024 – Jul 2024',
        description:
            'Engineered an AgriYield Prediction system using ensemble ML models. Improved forecast precision by 15% over baseline through rigorous feature engineering and model stacking.',
        bullets: [
            'Random Forest + XGBoost stacking for yield regression',
            'Feature engineering: soil, weather, crop-type embeddings',
            '15% precision gain over naive baseline (RMSE metric)',
        ],
        icon: Leaf,
        imageBg: 'linear-gradient(135deg, rgba(255,0,127,0.08) 0%, rgba(0,0,0,0) 100%)',
        imageLabel: 'INFOSYS_SPRINGBOARD',
    },
    {
        type: 'achievement',
        title: 'Google Solution Challenge 2024',
        role: 'Global Finalist',
        date: '2024',
        description:
            'Selected among the top 20% of global submissions in Google\'s flagship student developer challenge. Competed against thousands of university teams worldwide.',
        bullets: [
            'Top 20% globally — competitive pool of 10,000+ teams',
            'Built a full-stack AI solution addressing a UN SDG',
            'Evaluated by Google engineers on impact and technical depth',
        ],
        icon: Award,
        imageBg: 'linear-gradient(135deg, rgba(0,255,255,0.08) 0%, rgba(0,0,0,0) 100%)',
        imageLabel: 'GOOGLE_SOLUTION_CHALLENGE',
    },
    {
        type: 'achievement',
        title: 'Turing Cup 2025',
        role: 'Finalist',
        date: '2025',
        description:
            'Reached the finals of Turing Cup 2025, demonstrating advanced AI problem-solving and system design under competitive conditions.',
        bullets: [
            'Advanced through qualification and semi-final rounds',
            'AI-focused challenges: optimization, reasoning, agents',
            'Peer cohort of top engineering students nationwide',
        ],
        icon: Trophy,
        imageBg: 'linear-gradient(135deg, rgba(0,255,255,0.08) 0%, rgba(0,0,0,0) 100%)',
        imageLabel: 'TURING_CUP_2025',
    },
];

/* ── per-type theme helpers ──────────────────────────────── */
const theme = (type) => type === 'work'
    ? { accent: '#FF007F', dim: 'rgba(255,0,127,0.08)', glow: 'rgba(255,0,127,0.35)', border: 'rgba(255,0,127,0.3)' }
    : { accent: '#00FFFF', dim: 'rgba(0,255,255,0.07)', glow: 'rgba(0,255,255,0.3)', border: 'rgba(0,255,255,0.3)' };

/* ═══════════════════════════════════════════════════════════
   IMAGE PLACEHOLDER — CRT-styled placeholder for each item
═══════════════════════════════════════════════════════════ */
function ImagePlaceholder({ item, flip }) {
    const t = theme(item.type);
    return (
        <motion.div
            initial={{ opacity: 0, x: flip ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
            style={{
                flex: '0 0 clamp(160px, 28%, 240px)',
                aspectRatio: '4/3',
                background: item.imageBg,
                border: `1px solid ${t.border}`,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.7rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 0 30px ${t.glow}`,
            }}
        >
            {/* Scanline overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
                pointerEvents: 'none',
            }} />

            {/* Corner brackets */}
            {[
                { top: 6, left: 6, borderTop: `1px solid ${t.accent}`, borderLeft: `1px solid ${t.accent}` },
                { top: 6, right: 6, borderTop: `1px solid ${t.accent}`, borderRight: `1px solid ${t.accent}` },
                { bottom: 6, left: 6, borderBottom: `1px solid ${t.accent}`, borderLeft: `1px solid ${t.accent}` },
                { bottom: 6, right: 6, borderBottom: `1px solid ${t.accent}`, borderRight: `1px solid ${t.accent}` },
            ].map((s, i) => (
                <span key={i} style={{ position: 'absolute', width: 14, height: 14, ...s, opacity: 0.7 }} />
            ))}

            <item.icon size={26} color={t.accent} style={{ opacity: 0.8 }} />

            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: t.accent,
                letterSpacing: '0.1em',
                textAlign: 'center',
                padding: '0 0.75rem',
                opacity: 0.75,
            }}>
                {item.imageLabel}
            </span>

            <span style={{
                position: 'absolute', bottom: 8, right: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.06em',
            }}>
                {item.type === 'work' ? 'WORK_XP' : 'ACHIEVEMENT'}
            </span>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   TEXT CARD
═══════════════════════════════════════════════════════════ */
function TextCard({ item, flip }) {
    const t = theme(item.type);
    const Icon = item.type === 'work' ? Briefcase : Trophy;

    return (
        <motion.div
            initial={{ opacity: 0, x: flip ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{
                flex: 1,
                background: '#050505',
                border: `1px solid ${t.border}`,
                borderLeft: `3px solid ${t.accent}`,
                borderRadius: 3,
                padding: '1.4rem 1.6rem',
                boxShadow: `0 0 24px ${t.glow}`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle background tint */}
            <div style={{
                position: 'absolute', inset: 0,
                background: t.dim,
                pointerEvents: 'none',
            }} />

            {/* Type badge */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.2rem 0.65rem',
                marginBottom: '0.9rem',
                border: `1px solid ${t.border}`,
                borderRadius: 2,
                background: 'rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: t.accent,
                textShadow: `0 0 8px ${t.accent}`,
            }}>
                <Icon size={9} />
                {item.type === 'work' ? 'WORK_EXPERIENCE' : 'ACHIEVEMENT'}
            </div>

            {/* Title + Role + Date */}
            <div style={{ marginBottom: '0.9rem', position: 'relative' }}>
                <h3 style={{
                    margin: '0 0 0.2rem',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '-0.02em',
                }}>
                    {item.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: t.accent,
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                    }}>
                        {item.role}
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.28)',
                        letterSpacing: '0.06em',
                        padding: '0.1rem 0.5rem',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 2,
                    }}>
                        {item.date}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p style={{
                margin: '0 0 1rem',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.52)',
                lineHeight: 1.75,
                fontFamily: 'var(--font-sans)',
                position: 'relative',
            }}>
                {item.description}
            </p>

            {/* Bullet list */}
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', position: 'relative' }}>
                {item.bullets.map((b, i) => (
                    <li key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.55rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.45)',
                        lineHeight: 1.65,
                        marginBottom: i < item.bullets.length - 1 ? '0.35rem' : 0,
                    }}>
                        <span style={{ color: t.accent, flexShrink: 0, marginTop: '0.1em' }}>›</span>
                        {b}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   TIMELINE NODE (glowing dot on the SVG path)
═══════════════════════════════════════════════════════════ */
function TimelineNode({ type, cy, cx }) {
    const t = theme(type);
    return (
        <g>
            {/* Outer pulse ring */}
            <circle cx={cx} cy={cy} r={13}
                fill="none"
                stroke={t.accent}
                strokeWidth={0.8}
                opacity={0.25}
            />
            {/* Mid ring */}
            <circle cx={cx} cy={cy} r={8}
                fill="rgba(0,0,0,0.85)"
                stroke={t.accent}
                strokeWidth={1.2}
                style={{ filter: `drop-shadow(0 0 6px ${t.accent})` }}
            />
            {/* Core dot */}
            <circle cx={cx} cy={cy} r={3.5}
                fill={t.accent}
                style={{ filter: `drop-shadow(0 0 5px ${t.accent})` }}
            />
        </g>
    );
}

/* ═══════════════════════════════════════════════════════════
   WINDING SVG PATH + SCROLL DRAW
   SVG sits absolutely in the center column of the grid.
   useScroll on the container drives strokeDashoffset.
═══════════════════════════════════════════════════════════ */
function WindingPath({ containerRef, nodeYs, itemCount }) {
    const svgRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);
    const [svgH, setSvgH] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 40%'],
    });

    const rawProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const measure = () => {
            const rect = svg.getBoundingClientRect();
            setSvgH(rect.height);
            const path = svg.querySelector('.winding-path');
            if (path) setPathLength(path.getTotalLength());
        };

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Build the sine-wave-ish path
    // SVG viewBox width = 60 (narrow center column), center at x=30
    const W = 60;
    const cx = W / 2;
    const amplitude = 14; // how far left/right the wave swings
    const itemCount2 = itemCount || 3;
    const segH = svgH > 0 ? svgH / itemCount2 : 300;

    // Build a smooth cubic Bezier path weaving left <-> right at each item
    let d = `M ${cx} 0`;
    for (let i = 0; i < itemCount2; i++) {
        const y0 = i * segH;
        const y1 = (i + 0.5) * segH;
        const y2 = (i + 1) * segH;
        const xPeak = i % 2 === 0 ? cx + amplitude : cx - amplitude;
        d += ` C ${cx} ${y0 + segH * 0.25}, ${xPeak} ${y1 - segH * 0.1}, ${xPeak} ${y1}`;
        d += ` C ${xPeak} ${y1 + segH * 0.1}, ${cx} ${y2 - segH * 0.25}, ${cx} ${y2}`;
    }

    // Node Y positions as fraction of svgH
    const nodePositions = Array.from({ length: itemCount2 }, (_, i) => (i + 0.5) * segH);

    // dashoffset: start at full length (hidden), animate to 0 (fully drawn)
    const dashOffset = useTransform(rawProgress, [0, 1], [pathLength, 0]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${svgH > 0 ? svgH : 1200}`}
            preserveAspectRatio="none"
            style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: '100%',
                overflow: 'visible',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            {/* Base dim path */}
            <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={1.5}
            />

            {/* Animated glowing draw path */}
            <motion.path
                className="winding-path"
                d={d}
                fill="none"
                stroke="url(#streamGrad)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray={pathLength || 9999}
                style={{
                    strokeDashoffset: dashOffset,
                    filter: 'drop-shadow(0 0 4px rgba(255,0,127,0.7)) drop-shadow(0 0 10px rgba(0,255,255,0.4))',
                }}
            />

            {/* Gradient definition */}
            <defs>
                <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#FF007F" />
                    <stop offset="50%" stopColor="#CC00CC" />
                    <stop offset="100%" stopColor="#00FFFF" />
                </linearGradient>
            </defs>

            {/* Nodes */}
            {nodePositions.map((ny, i) => (
                <TimelineNode
                    key={i}
                    type={EXPERIENCES[i]?.type ?? 'work'}
                    cy={ny}
                    cx={cx}
                />
            ))}
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function Experience() {
    const containerRef = useRef(null);

    return (
        <PageShell>
            <section style={{ padding: '0 clamp(1rem, 4vw, 4rem) 5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                    {/* ── Page header ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ marginBottom: '3.5rem' }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#22C55E',
                            letterSpacing: '0.1em',
                            marginBottom: '0.6rem',
                            textShadow: '0 0 8px rgba(34,197,94,0.5)',
                        }}>
                            &gt; cat ./experience.log
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            margin: 0,
                            letterSpacing: '-0.03em',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            Experience &amp; Achievements
                        </h1>
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            marginTop: '0.75rem',
                            flexWrap: 'wrap',
                        }}>
                            {[
                                { label: 'WORK_XP', color: '#FF007F' },
                                { label: 'ACHIEVEMENT', color: '#00FFFF' },
                            ].map(({ label, color }) => (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Timeline container ── */}
                    <div
                        ref={containerRef}
                        style={{
                            position: 'relative',
                            // On desktop: invisible center column for SVG sits between cards
                        }}
                    >
                        {/* ── SVG Winding Path — desktop only ── */}
                        <div
                            aria-hidden
                            style={{
                                display: 'none',   // hidden on mobile
                                position: 'absolute',
                                top: 0, bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 60,
                                pointerEvents: 'none',
                                zIndex: 0,
                            }}
                            className="winding-svg-col"
                        >
                            <WindingPath
                                containerRef={containerRef}
                                itemCount={EXPERIENCES.length}
                            />
                        </div>

                        {/* ── Items ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                            {EXPERIENCES.map((item, i) => {
                                const isEven = i % 2 === 0;
                                // even: Text LEFT, Image RIGHT
                                // odd:  Image LEFT, Text RIGHT
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',  // mobile: stacked
                                            gap: '1rem',
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                        className={`timeline-row ${isEven ? 'row-even' : 'row-odd'}`}
                                    >
                                        {/* Mobile: Image → Text. Desktop handled by CSS below */}
                                        <ImagePlaceholder item={item} flip={!isEven} />
                                        <TextCard item={item} flip={isEven} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Inline CSS for desktop alternating + showing the SVG column */}
            <style>{`
                @media (min-width: 768px) {
                    .winding-svg-col {
                        display: block !important;
                    }
                    .timeline-row {
                        flex-direction: row !important;
                        align-items: center;
                        gap: 0 !important;
                        /* Leave a 60px gap in the center for the SVG */
                        padding: 0 calc(30px + 1.5rem);
                    }
                    /* Even: Text left, Image right */
                    .timeline-row.row-even {
                        flex-direction: row !important;
                    }
                    .timeline-row.row-even > *:first-child {
                        order: 2;   /* ImagePlaceholder goes RIGHT */
                        margin-left: 1.5rem;
                    }
                    .timeline-row.row-even > *:last-child {
                        order: 1;   /* TextCard stays LEFT */
                        margin-right: 1.5rem;
                    }
                    /* Odd: Image left, Text right */
                    .timeline-row.row-odd {
                        flex-direction: row !important;
                    }
                    .timeline-row.row-odd > *:first-child {
                        order: 1;   /* ImagePlaceholder is LEFT */
                        margin-right: 1.5rem;
                    }
                    .timeline-row.row-odd > *:last-child {
                        order: 2;   /* TextCard is RIGHT */
                        margin-left: 1.5rem;
                    }
                }
            `}</style>
        </PageShell>
    );
}
