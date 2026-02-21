import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Terminal, Cpu, GitBranch, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────
   Stage helpers
   Stage 1:  0–33  → Sleek Minimal Dark
   Stage 2: 34–66  → Project mockup (center stage)
   Stage 3: 67–100 → Hardcore Terminal (Void + violet borders)
───────────────────────────────────────────── */
const getStage = (d) => (d <= 33 ? 1 : d <= 66 ? 2 : 3);

/* ─────────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────────── */
const fadeSlide = {
    initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.25 } },
};

const glitchSlide = {
    initial: { opacity: 0, x: -10, filter: 'blur(5px) saturate(2)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px) saturate(1)', transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: 10, filter: 'blur(5px)', transition: { duration: 0.22 } },
};

/* ─────────────────────────────────────────────
   STAGE 1 — Sleek Minimal Dark
───────────────────────────────────────────── */
function SereneView({ stateA, tags }) {
    return (
        <motion.div key="serene" variants={fadeSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-4">
            <p className="leading-relaxed text-base" style={{ color: 'rgba(248,250,252,0.72)', fontFamily: 'var(--font-sans)' }}>
                {stateA}
            </p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                            background: 'rgba(45,212,191,0.1)',
                            color: '#2DD4BF',
                            border: '1px solid rgba(45,212,191,0.25)',
                        }}>
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   STAGE 2 — Project Image
───────────────────────────────────────────── */
function ImageView({ image, title }) {
    return (
        <motion.div key="image" variants={fadeSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-3">
            <div className="relative overflow-hidden rounded-lg"
                style={{ aspectRatio: '16/9', background: '#0D0D14', border: '1px solid rgba(45,212,191,0.15)' }}>
                <img
                    src={image}
                    alt={`${title} mockup`}
                    className="w-full h-full object-cover"
                    style={{ display: 'block' }}
                />
                {/* Subtle dark vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,5,10,0.55) 100%)',
                    pointerEvents: 'none',
                }} />
            </div>
            <p className="text-xs text-center font-medium" style={{ color: '#475569', fontFamily: 'var(--font-mono)' }}>
                // project_mockup — drag deeper to expose internals
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   STAGE 3 — Hardcore Terminal
───────────────────────────────────────────── */
function GlitchView({ stateB, tags, title, image }) {
    return (
        <motion.div key="glitch" variants={glitchSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-3">

            {/* Image with hardcore cyberpunk filter */}
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '16/9' }}>
                <img
                    src={image}
                    alt={`${title} background`}
                    className="w-full h-full object-cover"
                    style={{
                        display: 'block',
                        filter: 'contrast(1.7) saturate(0.1) brightness(0.25) hue-rotate(270deg)',
                    }}
                />

                {/* Violet/fuchsia gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(5,5,10,0.9) 0%, rgba(217,70,239,0.06) 50%, rgba(45,212,191,0.04) 100%)',
                    pointerEvents: 'none',
                }} />

                {/* Scanlines */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
                    pointerEvents: 'none',
                }} />

                {/* Terminal content */}
                <div className="absolute inset-0 p-3 flex flex-col gap-1.5 overflow-hidden"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    {/* Window bar */}
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: '#D946EF', boxShadow: '0 0 6px #D946EF' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#2DD4BF', boxShadow: '0 0 6px #2DD4BF' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#BEF264', boxShadow: '0 0 6px #BEF264' }} />
                        <span className="text-xs ml-1" style={{ color: '#475569' }}>
                            /{title.toLowerCase().replace(/[\s/&]+/g, '-')}.sys
                        </span>
                        <Terminal size={10} className="ml-auto" style={{ color: '#475569' }} />
                    </div>

                    {/* Staggered log lines */}
                    {stateB.map((line, i) => {
                        const rest = line.replace(/^SYS\.\d+:\s*/, '');
                        return (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.09, duration: 0.25 }}
                                className="flex gap-2 items-start">
                                <span className="shrink-0 text-xs font-bold px-1.5 py-0.5 rounded-sm" style={{
                                    color: '#2DD4BF',
                                    background: 'rgba(45,212,191,0.12)',
                                    border: '1px solid rgba(45,212,191,0.3)',
                                }}>
                                    SYS.{i + 1}
                                </span>
                                <span className="text-xs leading-relaxed" style={{
                                    color: '#BEF264',
                                    textShadow: '0 0 8px rgba(190,242,100,0.45)',
                                }}>
                                    {rest}
                                </span>
                            </motion.div>
                        );
                    })}

                    <span className="text-xs font-mono mt-0.5" style={{ color: '#D946EF', textShadow: '0 0 8px #D946EF' }}>
                        <span className="cursor-blink">█</span>
                    </span>
                </div>
            </div>

            {/* Neon Lemon tech tags */}
            <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-mono font-medium"
                        style={{
                            color: '#BEF264',
                            background: 'rgba(190,242,100,0.06)',
                            border: '1px solid rgba(190,242,100,0.25)',
                            borderRadius: 0,
                        }}>
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Main ProjectCard Component
───────────────────────────────────────────── */
export default function ProjectCard({ title, stateA, stateB, tags, image, index }) {
    const [depth, setDepth] = useState(0);
    const stage = getStage(depth);

    const depthMV = useMotionValue(0);

    /* ── Color interpolation — tighter [0,33,45,100] keyframes
       Dark bg stays dark; only border and accent colors shift
       as the card transitions from Minimal → Terminal.         */
    const bgColor = useTransform(
        depthMV,
        [0, 33, 45, 100],
        ['#0D0D14', '#0D0D14', '#07070C', '#05050A'],
    );
    const borderColorMV = useTransform(
        depthMV,
        [0, 33, 45, 100],
        ['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.07)', '#D946EF', '#D946EF'],
    );
    const titleColorMV = useTransform(
        depthMV,
        [0, 33, 45, 100],
        ['#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC'],
    );

    /* ── Stage-driven maxWidth — 5–7% subtle growth ── */
    const stageMaxWidth = stage === 1 ? 460 : stage === 2 ? 490 : 495;

    /* ── Box shadow — violet glow on Stage 3 ── */
    const shadowByStage = stage === 1
        ? '0 4px 24px rgba(0,0,0,0.4)'
        : stage === 2
            ? '0 8px 32px rgba(45,212,191,0.08)'
            : '0 0 0 1px #D946EF, 0 0 24px rgba(217,70,239,0.2), 4px 4px 0 #D946EF';

    const handleSlider = (e) => {
        const val = Number(e.target.value);
        setDepth(val);
        depthMV.set(val);
    };

    const stageLabel = stage === 1 ? 'SURFACE' : stage === 2 ? 'MID-LAYER' : 'CORE';
    const stageLabelColor = stage === 1 ? '#2DD4BF' : stage === 2 ? '#2DD4BF' : '#D946EF';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.1 },
                y: { duration: 0.5, delay: index * 0.1 },
                layout: { type: 'spring', stiffness: 280, damping: 28 },
            }}
            style={{
                width: '100%',
                maxWidth: stageMaxWidth,
                minWidth: 300,
                background: bgColor,
                borderColor: borderColorMV,
                borderWidth: stage === 3 ? 2 : 1,
                borderStyle: 'solid',
                borderRadius: stage === 3 ? 4 : 12,
                overflow: 'hidden',
                boxShadow: shadowByStage,
                transition: 'box-shadow 0.5s ease, border-radius 0.4s ease, border-width 0.3s ease',
            }}
        >
            <div className="relative p-6 flex flex-col gap-5">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {stage === 3
                            ? <Cpu size={20} style={{ color: '#D946EF' }} />
                            : <GitBranch size={20} style={{ color: '#2DD4BF' }} />
                        }
                        <motion.h3
                            className="font-bold text-lg leading-tight"
                            style={{
                                color: titleColorMV,
                                fontFamily: stage === 3 ? 'var(--font-mono)' : 'var(--font-sans)',
                                letterSpacing: stage === 3 ? '0.04em' : 'normal',
                            }}
                        >
                            {stage === 3 ? `> ${title.toUpperCase()}` : title}
                        </motion.h3>
                    </div>
                    <ExternalLink
                        size={16}
                        className="shrink-0 mt-0.5 cursor-pointer"
                        style={{
                            color: stage === 3 ? '#D946EF' : 'rgba(248,250,252,0.3)',
                            opacity: 0.7,
                            transition: 'opacity 0.2s, color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; }}
                    />
                </div>

                {/* Stage badge */}
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        animate={{ background: stageLabelColor, boxShadow: `0 0 6px ${stageLabelColor}` }}
                        transition={{ duration: 0.4 }}
                    />
                    <span className="text-xs font-mono font-semibold tracking-widest uppercase"
                        style={{ color: stageLabelColor }}>
                        Stage {stage} — {stageLabel}
                    </span>
                </div>

                {/* Animated content */}
                <div className="min-h-[190px]">
                    <AnimatePresence mode="wait">
                        {stage === 1 && <SereneView key="serene" stateA={stateA} tags={tags} />}
                        {stage === 2 && <ImageView key="image" image={image} title={title} />}
                        {stage === 3 && <GlitchView key="glitch" stateB={stateB} tags={tags} title={title} image={image} />}
                    </AnimatePresence>
                </div>

                {/* Depth Slider */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <motion.label
                            className="text-xs font-semibold uppercase tracking-widest"
                            style={{
                                color: stage === 3 ? '#D946EF' : 'rgba(248,250,252,0.4)',
                                fontFamily: stage === 3 ? 'var(--font-mono)' : 'var(--font-sans)',
                            }}
                        >
                            {stage === 3 ? '// depth_level' : 'Depth'}
                        </motion.label>
                        <span className="text-xs font-mono font-bold tabular-nums"
                            style={{ color: stageLabelColor }}>
                            {stage === 3
                                ? `0x${depth.toString(16).toUpperCase().padStart(2, '0')}`
                                : `${depth}%`
                            }
                        </span>
                    </div>

                    <input
                        type="range" min={0} max={100} value={depth}
                        onChange={handleSlider}
                        className={stage === 3 ? 'slider-glitch' : 'slider-serene'}
                        aria-label={`Depth for ${title}`}
                    />

                    {/* Threshold markers */}
                    <div className="relative flex justify-between text-xs"
                        style={{ color: 'rgba(248,250,252,0.2)' }}>
                        <span>0</span>
                        <div className="absolute left-[33%] flex flex-col items-center -translate-x-1/2 gap-0.5">
                            <div className="w-px h-2" style={{ background: stage >= 2 ? '#2DD4BF' : 'rgba(255,255,255,0.1)' }} />
                            <span style={{ color: stage >= 2 ? '#2DD4BF' : 'rgba(255,255,255,0.2)' }}>34</span>
                        </div>
                        <div className="absolute left-[66%] flex flex-col items-center -translate-x-1/2 gap-0.5">
                            <div className="w-px h-2" style={{ background: stage >= 3 ? '#D946EF' : 'rgba(255,255,255,0.1)' }} />
                            <span style={{ color: stage >= 3 ? '#D946EF' : 'rgba(255,255,255,0.2)' }}>67</span>
                        </div>
                        <span>100</span>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
