import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Terminal, Cpu, GitBranch, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────
   Stage helpers
   Stage 1: 0  – 33   → Serene text
   Stage 2: 34 – 66   → Image (center stage)
   Stage 3: 67 – 100  → Cyberpunk image bg + terminal
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
   STAGE 1 — Serene / Watercolor
───────────────────────────────────────────── */
function SereneView({ stateA, tags }) {
    return (
        <motion.div key="serene" variants={fadeSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-4">
            <p className="italic leading-relaxed text-base" style={{ color: '#1e293b', opacity: 0.82 }}>
                {stateA}
            </p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{ background: '#dcedc1', color: '#1e293b', border: '1px solid #a8e6cf' }}>
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   STAGE 2 — Project Image (center stage)
───────────────────────────────────────────── */
function ImageView({ image, title }) {
    return (
        <motion.div key="image" variants={fadeSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-3">
            <div className="relative overflow-hidden rounded-lg"
                style={{ aspectRatio: '16/9', background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                <img
                    src={image}
                    alt={`${title} mockup`}
                    className="w-full h-full object-cover"
                    style={{ display: 'block' }}
                />
                {/* Soft radial vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.4) 100%)',
                    pointerEvents: 'none',
                }} />
            </div>
            <p className="text-xs text-center font-medium" style={{ color: '#94a3b8' }}>
                ↑ Project Mockup — drag deeper to reveal implementation details
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   STAGE 3 — Cyberpunk: image bg + terminal overlay
───────────────────────────────────────────── */
function GlitchView({ stateB, tags, title, image }) {
    return (
        <motion.div key="glitch" variants={glitchSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-3">

            {/* Image with cyberpunk CSS filter — always visible as background */}
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
                <img
                    src={image}
                    alt={`${title} background`}
                    className="w-full h-full object-cover"
                    style={{
                        display: 'block',
                        filter: 'contrast(1.6) saturate(0.15) brightness(0.3) hue-rotate(200deg)',
                    }}
                />

                {/* Dark overlay with pink/cyan gradient sheen */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(9,9,11,0.85) 0%, rgba(255,0,127,0.07) 50%, rgba(6,182,212,0.05) 100%)',
                    pointerEvents: 'none',
                }} />

                {/* Scanlines */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 4px)',
                    pointerEvents: 'none',
                }} />

                {/* Terminal content on top of the image */}
                <div className="absolute inset-0 p-3 flex flex-col gap-1.5 overflow-hidden"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    {/* Terminal window bar */}
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: '#ff007f', boxShadow: '0 0 5px #ff007f' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#06b6d4', boxShadow: '0 0 5px #06b6d4' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
                        <span className="text-xs ml-1" style={{ color: '#52525b' }}>
                            /{title.toLowerCase().replace(/[\s/&]+/g, '-')}.sys
                        </span>
                        <Terminal size={10} className="ml-auto" style={{ color: '#52525b' }} />
                    </div>

                    {/* Log lines — staggered in */}
                    {stateB.map((line, i) => {
                        const rest = line.replace(/^SYS\.\d+:\s*/, '');
                        return (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.09, duration: 0.25 }}
                                className="flex gap-2 items-start">
                                <span className="shrink-0 text-xs font-bold px-1.5 py-0.5 rounded" style={{
                                    color: '#06b6d4',
                                    background: 'rgba(6,182,212,0.15)',
                                    border: '1px solid rgba(6,182,212,0.35)',
                                }}>
                                    SYS.{i + 1}
                                </span>
                                <span className="text-xs leading-relaxed" style={{
                                    color: '#f0fdf4',
                                    textShadow: '0 0 8px rgba(34,197,94,0.5)',
                                }}>
                                    {rest}
                                </span>
                            </motion.div>
                        );
                    })}

                    <span className="text-xs font-mono mt-0.5" style={{ color: '#22c55e', textShadow: '0 0 8px #22c55e' }}>
                        <span className="cursor-blink">█</span>
                    </span>
                </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-mono font-medium"
                        style={{
                            color: '#22c55e', background: 'rgba(34,197,94,0.08)',
                            border: '1px solid rgba(34,197,94,0.3)', borderRadius: 0,
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

    /* ── Motion value updated on every slider tick ── */
    const depthMV = useMotionValue(0);

    /* ── Continuous color interpolation via useTransform ──
       Input keyframes [0, 33, 45, 100] make the dark theme arrive faster —
       fully dark by depth 45 (mid-Stage 2) with no hard snap.              */
    const bgColor = useTransform(
        depthMV,
        [0, 33, 45, 100],
        ['#ffffff', '#f3fdf8', '#101012', '#09090b'],
    );
    const borderColorMV = useTransform(
        depthMV,
        [0, 33, 45, 100],
        ['#a8e6cf', '#a8e6cf', '#ff007f', '#ff007f'],
    );
    const titleColorMV = useTransform(
        depthMV,
        [0, 33, 45, 100],
        ['#1e293b', '#475569', '#e4e4e7', '#f8fafc'],
    );

    /* ── Stage-driven maxWidth — 5–7% growth only, no overlap risk.
       460px base → 490px at Stage 2 (+6.5%) → 495px at Stage 3 (+7.6%).   */
    const stageMaxWidth = stage === 1 ? 460 : stage === 2 ? 490 : 495;

    /* ── Box shadow — discrete per stage, CSS transition handles animation ── */
    const shadowByStage = stage === 1
        ? '0 8px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)'
        : stage === 2
            ? '0 12px 40px rgba(168,230,207,0.20)'
            : '4px 4px 0px rgba(255,0,127,1), 0 0 24px rgba(255,0,127,0.12)';

    const handleSlider = (e) => {
        const val = Number(e.target.value);
        setDepth(val);
        depthMV.set(val); // keeps motion value in sync for useTransform
    };

    const stageLabel = stage === 1 ? 'SURFACE' : stage === 2 ? 'MID-LAYER' : 'CORE';
    const stageLabelColor = stage === 1 ? '#a8e6cf' : stage === 2 ? '#22c55e' : '#ff007f';

    return (
        /* layout prop: framer-motion measures, FLIP-animates position changes.
           When maxWidth shifts, siblings are nudged smoothly via spring physics. */
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
                /* dimensions – state driven so layout FLIP actually fires */
                width: '100%',
                maxWidth: stageMaxWidth,
                minWidth: 300,
                /* colors – motion-value driven, interpolated every slider tick */
                background: bgColor,
                borderColor: borderColorMV,
                /* non-interpolated styles */
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: shadowByStage,
                transition: 'box-shadow 0.5s ease',
            }}
        >
            <div className="relative p-6 flex flex-col gap-5">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {stage === 3
                            ? <Cpu size={20} style={{ color: '#ff007f' }} />
                            : <GitBranch size={20} style={{ color: stage === 2 ? '#22c55e' : '#a8e6cf' }} />
                        }
                        <motion.h3
                            className="font-bold text-lg leading-tight"
                            style={{
                                color: titleColorMV,
                                fontFamily: stage === 3 ? 'var(--font-mono)' : 'var(--font-sans)',
                                letterSpacing: stage === 3 ? '0.05em' : 'normal',
                            }}
                        >
                            {stage === 3 ? `> ${title.toUpperCase()}` : title}
                        </motion.h3>
                    </div>
                    <ExternalLink
                        size={16}
                        className="shrink-0 mt-0.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                        style={{ color: stage === 3 ? '#06b6d4' : '#1e293b' }}
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
                                color: titleColorMV,
                                fontFamily: stage === 3 ? 'var(--font-mono)' : 'var(--font-sans)',
                                opacity: 0.6,
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
                        style={{ color: stage === 3 ? '#3f3f46' : '#cbd5e1' }}>
                        <span>0</span>
                        <div className="absolute left-[33%] flex flex-col items-center -translate-x-1/2 gap-0.5">
                            <div className="w-px h-2" style={{ background: stage >= 2 ? '#22c55e' : '#e2e8f0' }} />
                            <span style={{ color: stage >= 2 ? '#22c55e' : '#cbd5e1' }}>34</span>
                        </div>
                        <div className="absolute left-[66%] flex flex-col items-center -translate-x-1/2 gap-0.5">
                            <div className="w-px h-2" style={{ background: stage >= 3 ? '#ff007f' : '#e2e8f0' }} />
                            <span style={{ color: stage >= 3 ? '#ff007f' : '#cbd5e1' }}>67</span>
                        </div>
                        <span>100</span>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
