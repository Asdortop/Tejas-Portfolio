import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { Briefcase, Trophy, Server, Leaf, Award, ChevronLeft, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE DATA  — each entry now carries an images[]
   For the portfolio, we use labelled gradient placeholders
   unless a real URL is provided (starts with / or http).
═══════════════════════════════════════════════════════════ */
const EXPERIENCES = [
    {
        type: 'work',
        title: 'Infosys Springboard',
        role: 'AI / ML Intern',
        date: 'Nov 2025 – Dec 2025',
        description:
            'Engineered an AgriYield Prediction system using ensemble ML models. Improved forecast precision by 15% over baseline through rigorous feature engineering and model stacking.',
        bullets: [
            'Random Forest + XGBoost stacking for yield regression',
            'Feature engineering: soil, weather, crop-type embeddings',
            '15% precision gain over naive baseline (RMSE metric)',
        ],
        images: [
            { label: 'MODEL_PIPELINE', sub: 'ML training pipeline' },
            { label: 'FEATURE_ENG', sub: 'Feature correlation map' },
            { label: 'RESULT_METRICS', sub: 'Precision improvement' },
        ],
    },
    {
        type: 'work',
        title: 'Alfago Research LLP',
        role: 'Backend Intern',
        date: 'Sep 2025 – Nov 2025',
        description:
            'Designed and built a Portfolio Management backend from scratch. Containerised the full service stack with Docker and deployed to AWS for production availability and on-demand horizontal scaling.',
        bullets: [
            'Architected RESTful API with FastAPI + PostgreSQL',
            'Docker Compose orchestration for local & staging environments',
            'AWS EC2/S3 deployment pipeline with environment-based config',
        ],
        images: [
            { label: 'BACKEND_ARCH', sub: 'System design overview' },
            { label: 'DOCKER_STACK', sub: 'Container orchestration' },
            { label: 'AWS_DEPLOY', sub: 'Cloud deployment pipeline' },
        ],
    },
        {
        type: 'achievement',
        title: 'Turing Cup 2025',
        role: 'Finalist',
        date: 'Apr 2025',
        description:
            'Reached the finals of Turing Cup 2025, demonstrating advanced AI problem-solving and system design under competitive conditions.',
        bullets: [
            'Advanced through qualification and semi-final rounds',
            'Peer cohort of top engineering students nationwide',
        ],
        images: [
            { label: 'FINALIST_BADGE', sub: 'Finalist recognition' },
            { label: 'CHALLENGE_UI', sub: 'Competition interface' },
        ],
    },
    {
        type: 'achievement',
        title: 'Hackindia Hackathon',
        role: 'Regional Semifinalist',
        date: 'Apr 2025',
        description:
            'Advanced to the regional semi-finals by building an AI-powered assistant that makes finding and understanding enterprise documents effortless, bridging the gap between raw data and fast decision-making.',
        bullets: [
            'Built a smart search tool allowing users to find information using natural questions instead of rigid keywords.',
            'Developed automated summaries and visual search to give users immediate, context-aware answers.',
        ],
        images: [
            { label: 'HACKINDIA_BADGE', sub: 'Regional semi-finalist recognition' },
            { label: 'RAG_ARCHITECTURE', sub: 'System design overview' },
        ],
    },
    {
        type: 'achievement',
        title: 'Webathon',
        role: 'Finalist',
        date: 'Apr 2025',
        description:
            'Competed in an intensive web development hackathon, reaching the finals by designing and building a comprehensive Book Management System.',
        bullets: [
            'Developed a full-stack Book Management System from concept to deployment',
            'Implemented an intuitive UI/UX for seamless digital library administration',
            'Secured a finalist position among a competitive pool of web developers',
        ],
        images: [
            { label: 'DASHBOARD_UI', sub: 'Book management dashboard' },
            { label: 'WEBATHON_BADGE', sub: 'Finalist recognition' },
        ],
    },
    {
        type: 'achievement',
        title: 'Google Solution Challenge 2025',
        role: 'Finalist',
        date: 'Feb 2025',
        description:
            'Reached the finals by engineering a real-world healthcare accessibility platform aimed at bridging the medical divide for rural communities.',
        bullets: [
            'Built a digital solution providing easier healthcare access in rural areas',
            'Addressed critical real-world challenges aligned with UN Sustainable Development Goals',
            'Recognized as a finalist for project impact and technical execution',
        ],
        images: [
            { label: 'HEALTHCARE_UI', sub: 'Platform interface' },
            { label: 'GSC_FINALIST', sub: '2025 Finalist certificate' },
        ],
    },
    {
        type: 'achievement',
        title: 'Codenox 2.0',
        role: 'Semi-Finalist',
        date: 'Nov 2024',
        description:
            'Competed in the Codenox coding competition, advancing to the semi-finals by demonstrating strong algorithmic problem-solving and competitive programming skills.',
        bullets: [
            'Advanced to the semi-finals in a highly competitive coding tournament',
            'Demonstrated proficiency in data structures and algorithmic optimization',
            'Solved complex programming challenges under strict time constraints',
        ],
        images: [
            { label: 'CODENOX_BADGE', sub: 'Semi-finalist recognition' },
            { label: 'LEADERBOARD', sub: 'Competition ranking' },
        ],
    }
];

/* ── per-type theme helpers ──────────────────────────────── */
const theme = (type) =>
    type === 'work'
        ? { accent: '#FF007F', dim: 'rgba(255,0,127,0.08)', glow: 'rgba(255,0,127,0.35)', border: 'rgba(255,0,127,0.3)' }
        : { accent: '#00FFFF', dim: 'rgba(0,255,255,0.07)', glow: 'rgba(0,255,255,0.3)', border: 'rgba(0,255,255,0.3)' };

/* ═══════════════════════════════════════════════════════════
   IMAGE CAROUSEL
   Accepts an images[] of { src?, label, sub }.
   src = real URL → renders <img>; otherwise renders cyberpunk placeholder.
   Hover shows prev/next arrows and pagination dots.
═══════════════════════════════════════════════════════════ */
function ImageCarousel({ images, accent, icon: Icon }) {
    const [idx, setIdx] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [direction, setDirection] = useState(1); // 1=forward, -1=backward

    const go = (delta) => {
        setDirection(delta);
        setIdx((prev) => (prev + delta + images.length) % images.length);
    };

    const current = images[idx];
    const isReal = current.src && (current.src.startsWith('/') || current.src.startsWith('http'));

    const slideVariants = {
        enter: (d) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: '0 0 clamp(160px, 28%, 240px)',
                aspectRatio: '4/3',
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${accent}55`,
                boxShadow: `0 0 28px ${accent}33`,
                background: '#050505',
                cursor: 'pointer',
            }}
        >
            {/* ── Slide ── */}
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
                <motion.div
                    key={idx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    {isReal ? (
                        <img
                            src={current.src}
                            alt={current.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    ) : (
                        /* Cyberpunk placeholder */
                        <>
                            {/* Diagonal grid lines */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: `repeating-linear-gradient(45deg, ${accent}10 0px, ${accent}10 1px, transparent 1px, transparent 12px)`,
                                pointerEvents: 'none',
                            }} />
                            {/* Scanlines */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
                                pointerEvents: 'none',
                            }} />
                            {/* Corner brackets */}
                            {[
                                { top: 8, left: 8, borderTop: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` },
                                { top: 8, right: 8, borderTop: `1px solid ${accent}`, borderRight: `1px solid ${accent}` },
                                { bottom: 8, left: 8, borderBottom: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` },
                                { bottom: 8, right: 8, borderBottom: `1px solid ${accent}`, borderRight: `1px solid ${accent}` },
                            ].map((s, i) => (
                                <span key={i} style={{ position: 'absolute', width: 14, height: 14, opacity: 0.7, ...s }} />
                            ))}
                            <Icon size={22} color={accent} style={{ opacity: 0.7, marginBottom: '0.5rem', position: 'relative', zIndex: 1 }} />
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                                color: accent, letterSpacing: '0.1em',
                                textAlign: 'center', padding: '0 0.75rem',
                                opacity: 0.85, position: 'relative', zIndex: 1,
                            }}>
                                {current.label}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                                color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em',
                                marginTop: '0.3rem', position: 'relative', zIndex: 1,
                                textAlign: 'center', padding: '0 0.5rem',
                            }}>
                                {current.sub}
                            </span>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* ── Prev / Next arrows (hover only) ── */}
            {images.length > 1 && (
                <AnimatePresence>
                    {hovered && (
                        <>
                            {[
                                { side: 'left', delta: -1, Icon: ChevronLeft, style: { left: 4 } },
                                { side: 'right', delta: 1, Icon: ChevronRight, style: { right: 4 } },
                            ].map(({ side, delta, Icon: Arr, style: s }) => (
                                <motion.button
                                    key={side}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={(e) => { e.stopPropagation(); go(delta); }}
                                    style={{
                                        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                                        ...s,
                                        width: 28, height: 28,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'rgba(0,0,0,0.7)',
                                        border: `1px solid ${accent}55`,
                                        borderRadius: 2,
                                        color: accent,
                                        cursor: 'pointer',
                                        zIndex: 10,
                                        boxShadow: `0 0 10px ${accent}33`,
                                    }}
                                >
                                    <Arr size={14} />
                                </motion.button>
                            ))}
                        </>
                    )}
                </AnimatePresence>
            )}

            {/* ── Pagination dots (hover only) ── */}
            {images.length > 1 && (
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                                display: 'flex', gap: '0.35rem', zIndex: 10,
                            }}
                        >
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setDirection(i > idx ? 1 : -1); setIdx(i); }}
                                    style={{
                                        width: i === idx ? 16 : 6,
                                        height: 4,
                                        borderRadius: 2,
                                        background: i === idx ? accent : `${accent}40`,
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        boxShadow: i === idx ? `0 0 6px ${accent}` : 'none',
                                        transition: 'width 0.25s, background 0.25s, box-shadow 0.25s',
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Slide counter — always visible, tiny */}
            {images.length > 1 && (
                <div style={{
                    position: 'absolute', top: 6, right: 8,
                    fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                    color: `${accent}99`, letterSpacing: '0.06em', zIndex: 5,
                }}>
                    {idx + 1}/{images.length}
                </div>
            )}
        </div>
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
            <div style={{ position: 'absolute', inset: 0, background: t.dim, pointerEvents: 'none' }} />

            {/* Type badge */}
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.2rem 0.65rem', marginBottom: '0.9rem',
                border: `1px solid ${t.border}`, borderRadius: 2,
                background: 'rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                fontWeight: 700, letterSpacing: '0.1em',
                color: t.accent, textShadow: `0 0 8px ${t.accent}`,
            }}>
                <Icon size={9} />
                {item.type === 'work' ? 'WORK_EXPERIENCE' : 'ACHIEVEMENT'}
            </div>

            <div style={{ marginBottom: '0.9rem', position: 'relative' }}>
                <h3 style={{
                    margin: '0 0 0.2rem',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontWeight: 800, color: '#FFFFFF',
                    fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em',
                }}>
                    {item.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                        color: t.accent, fontWeight: 600, letterSpacing: '0.02em',
                    }}>{item.role}</span>
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em',
                        padding: '0.1rem 0.5rem',
                        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2,
                    }}>{item.date}</span>
                </div>
            </div>

            <p style={{
                margin: '0 0 1rem', fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.52)', lineHeight: 1.75,
                fontFamily: 'var(--font-sans)', position: 'relative',
            }}>
                {item.description}
            </p>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', position: 'relative' }}>
                {item.bullets.map((b, i) => (
                    <li key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.55rem',
                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.45)', lineHeight: 1.65,
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
   TIMELINE NODE (glowing dot on SVG path)
═══════════════════════════════════════════════════════════ */
function TimelineNode({ type, cy, cx }) {
    const t = theme(type);
    return (
        <g>
            <circle cx={cx} cy={cy} r={13} fill="none" stroke={t.accent} strokeWidth={0.8} opacity={0.25} />
            <circle cx={cx} cy={cy} r={8} fill="rgba(0,0,0,0.85)" stroke={t.accent} strokeWidth={1.2}
                style={{ filter: `drop-shadow(0 0 6px ${t.accent})` }} />
            <circle cx={cx} cy={cy} r={3.5} fill={t.accent}
                style={{ filter: `drop-shadow(0 0 5px ${t.accent})` }} />
        </g>
    );
}

/* ═══════════════════════════════════════════════════════════
   WINDING SVG PATH
═══════════════════════════════════════════════════════════ */
function WindingPath({ containerRef, itemCount }) {
    const svgRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);
    const [svgH, setSvgH] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 40%'],
    });
    const rawProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

    // measure on mount + resize
    const measure = () => {
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        setSvgH(rect.height);
        const path = svg.querySelector('.winding-path');
        if (path) setPathLength(path.getTotalLength());
    };

    // We use a callback ref to measure after render
    const svgCallbackRef = (node) => {
        svgRef.current = node;
        if (node) {
            setTimeout(measure, 50);
        }
    };

    const W = 60;
    const cx = W / 2;
    const amplitude = 14;
    const n = itemCount || 3;
    const segH = svgH > 0 ? svgH / n : 300;

    let d = `M ${cx} 0`;
    for (let i = 0; i < n; i++) {
        const y0 = i * segH;
        const y1 = (i + 0.5) * segH;
        const y2 = (i + 1) * segH;
        const xPeak = i % 2 === 0 ? cx + amplitude : cx - amplitude;
        d += ` C ${cx} ${y0 + segH * 0.25}, ${xPeak} ${y1 - segH * 0.1}, ${xPeak} ${y1}`;
        d += ` C ${xPeak} ${y1 + segH * 0.1}, ${cx} ${y2 - segH * 0.25}, ${cx} ${y2}`;
    }

    const nodePositions = Array.from({ length: n }, (_, i) => (i + 0.5) * segH);
    const dashOffset = useTransform(rawProgress, [0, 1], [pathLength, 0]);

    return (
        <svg
            ref={svgCallbackRef}
            viewBox={`0 0 ${W} ${svgH > 0 ? svgH : 1200}`}
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: '100%', overflow: 'visible', zIndex: 0, pointerEvents: 'none' }}
        >
            <defs>
                <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#FF007F" />
                    <stop offset="50%" stopColor="#CC00CC" />
                    <stop offset="100%" stopColor="#00FFFF" />
                </linearGradient>
            </defs>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1.5} />
            <motion.path
                className="winding-path"
                d={d} fill="none" stroke="url(#streamGrad)" strokeWidth={2} strokeLinecap="round"
                strokeDasharray={pathLength || 9999}
                style={{ strokeDashoffset: dashOffset, filter: 'drop-shadow(0 0 4px rgba(255,0,127,0.7)) drop-shadow(0 0 10px rgba(0,255,255,0.4))' }}
            />
            {nodePositions.map((ny, i) => (
                <TimelineNode key={i} type={EXPERIENCES[i]?.type ?? 'work'} cy={ny} cx={cx} />
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

                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ marginBottom: '3.5rem' }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#22C55E', letterSpacing: '0.1em', marginBottom: '0.6rem', textShadow: '0 0 8px rgba(34,197,94,0.5)' }}>
                            &gt; cat ./experience.log
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em', fontFamily: 'var(--font-sans)' }}>
                            Experience &amp; Achievements
                        </h1>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                            {[{ label: 'WORK_XP', color: '#FF007F' }, { label: 'ACHIEVEMENT', color: '#00FFFF' }].map(({ label, color }) => (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Timeline container */}
                    <div ref={containerRef} style={{ position: 'relative' }}>

                        {/* SVG winding path — desktop only */}
                        <div aria-hidden className="winding-svg-col" style={{ display: 'none', position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 60, pointerEvents: 'none', zIndex: 0 }}>
                            <WindingPath containerRef={containerRef} itemCount={EXPERIENCES.length} />
                        </div>

                        {/* Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                            {EXPERIENCES.map((item, i) => {
                                const t = theme(item.type);
                                const isEven = i % 2 === 0;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.3 }}
                                        className={`timeline-row ${isEven ? 'row-even' : 'row-odd'}`}
                                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}
                                    >
                                        {/* Mobile: carousel first, then text */}
                                        <ImageCarousel images={item.images} accent={t.accent} icon={item.type === 'work' ? Briefcase : Trophy} />
                                        <TextCard item={item} flip={isEven} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @media (min-width: 768px) {
                    .winding-svg-col { display: block !important; }
                    .timeline-row {
                        flex-direction: row !important;
                        align-items: center;
                        gap: 0 !important;
                        padding: 0 calc(30px + 1.5rem);
                    }
                    .timeline-row.row-even > *:first-child { order: 2; margin-left: 1.5rem; }
                    .timeline-row.row-even > *:last-child  { order: 1; margin-right: 1.5rem; }
                    .timeline-row.row-odd  > *:first-child { order: 1; margin-right: 1.5rem; }
                    .timeline-row.row-odd  > *:last-child  { order: 2; margin-left: 1.5rem; }
                }
            `}</style>
        </PageShell>
    );
}
