import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Terminal, Cpu, GitBranch, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────
   Stage helpers
   Stage 1: 0  – 33   → Serene text
   Stage 2: 34 – 66   → Image fade-in
   Stage 3: 67 – 100  → Cyberpunk image bg + terminal overlay
───────────────────────────────────────────── */
const getStage = (d) => (d <= 33 ? 1 : d <= 66 ? 2 : 3);

/* ─────────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────────── */
const fadeSlide = {
    initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
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
                {/* Soft vignette to blend edges */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(255,255,255,0.45) 100%)',
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
   STAGE 3 — Cyberpunk: image bg + terminal
───────────────────────────────────────────── */
function GlitchView({ stateB, tags, title, image }) {
    return (
        <motion.div key="glitch" variants={glitchSlide} initial="initial" animate="animate" exit="exit"
            className="flex flex-col gap-3">

            {/* Image as cyberpunk background — always visible */}
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
                {/* The image with heavy CSS filter for neon/glitch feel */}
                <img
                    src={image}
                    alt={`${title} background`}
                    className="w-full h-full object-cover"
                    style={{
                        display: 'block',
                        filter: 'contrast(1.6) saturate(0.2) brightness(0.35) hue-rotate(200deg)',
                        transition: 'filter 0.4s ease',
                    }}
                />

                {/* Dark overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(9,9,11,0.82) 0%, rgba(255,0,127,0.08) 50%, rgba(6,182,212,0.06) 100%)',
                    pointerEvents: 'none',
                }} />

                {/* Scanlines over the image */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
                    pointerEvents: 'none',
                }} />

                {/* Terminal content on top of image */}
                <div className="absolute inset-0 p-3 flex flex-col gap-1.5 overflow-hidden"
                    style={{ fontFamily: 'var(--font-mono)' }}>

                    {/* Mini terminal bar */}
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: '#ff007f', boxShadow: '0 0 5px #ff007f' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#06b6d4', boxShadow: '0 0 5px #06b6d4' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
                        <span className="text-xs ml-1" style={{ color: '#52525b' }}>
                            /{title.toLowerCase().replace(/[\s/&]+/g, '-')}.sys
                        </span>
                        <Terminal size={10} className="ml-auto" style={{ color: '#52525b' }} />
                    </div>

                    {/* Log lines */}
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
                                <span className="text-xs leading-relaxed" style={{ color: '#f0fdf4', textShadow: '0 0 8px rgba(34,197,94,0.6)' }}>
                                    {rest}
                                </span>
                            </motion.div>
                        );
                    })}

                    {/* Blinking cursor */}
                    <span className="text-xs font-mono mt-0.5" style={{ color: '#22c55e', textShadow: '0 0 8px #22c55e' }}>
                        <span className="cursor-blink">█</span>
                    </span>
                </div>
            </div>

            {/* Tech tags below image */}
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

    /* useMotionValue + useTransform for scale */
    const depthMV = useMotionValue(0);
    const scale = useTransform(depthMV, [0, 100], [1.0, 1.15]);

    const handleSlider = (e) => {
        const val = Number(e.target.value);
        setDepth(val);
        depthMV.set(val);
    };

    /* Card style driven by stage */
    const cardStyle = stage === 1
        ? {
            background: '#ffffff',
            border: '1px solid #a8e6cf',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
            color: '#1e293b',
        }
        : stage === 2
            ? {
                background: '#ffffff',
                border: '1px solid #dcedc1',
                boxShadow: '0 12px 40px rgba(168,230,207,0.25)',
                color: '#1e293b',
            }
            : {
                background: '#09090b',
                border: '1px solid #ff007f',
                boxShadow: '4px 4px 0px #ff007f, 0 0 24px rgba(255,0,127,0.15)',
                color: '#f8fafc',
            };

    /* Stage label */
    const stageLabel = stage === 1 ? 'SURFACE' : stage === 2 ? 'MID-LAYER' : 'CORE';
    const stageLabelColor = stage === 1 ? '#a8e6cf' : stage === 2 ? '#22c55e' : '#ff007f';

    return (
        <motion.div
            layout
            style={{ scale }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-xl overflow-visible transition-all duration-500"
        >
            {/* Inner card that changes styles */}
            <div className="relative rounded-xl overflow-hidden transition-all duration-500" style={cardStyle}>

                <div className="relative p-6 flex flex-col gap-5" style={{ zIndex: 2 }}>

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {stage === 3
                                ? <Cpu size={20} style={{ color: '#ff007f' }} />
                                : <GitBranch size={20} style={{ color: stage === 2 ? '#22c55e' : '#a8e6cf' }} />
                            }
                            <h3 className="font-bold text-lg leading-tight transition-all duration-300"
                                style={{
                                    color: stage === 3 ? '#f8fafc' : '#1e293b',
                                    fontFamily: stage === 3 ? 'var(--font-mono)' : 'var(--font-sans)',
                                    letterSpacing: stage === 3 ? '0.05em' : 'normal',
                                }}>
                                {stage === 3 ? `> ${title.toUpperCase()}` : title}
                            </h3>
                        </div>
                        <ExternalLink size={16}
                            className="shrink-0 mt-0.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                            style={{ color: stage === 3 ? '#06b6d4' : '#1e293b' }}
                        />
                    </div>

                    {/* Stage badge */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{ background: stageLabelColor, boxShadow: `0 0 6px ${stageLabelColor}` }} />
                        <span className="text-xs font-mono font-semibold tracking-widest uppercase"
                            style={{ color: stageLabelColor }}>
                            Stage {stage} — {stageLabel}
                        </span>
                    </div>

                    {/* Animated content: 3 stages via AnimatePresence key */}
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
                            <label className="text-xs font-semibold uppercase tracking-widest"
                                style={{
                                    color: stage === 3 ? '#52525b' : '#94a3b8',
                                    fontFamily: stage === 3 ? 'var(--font-mono)' : 'var(--font-sans)',
                                }}>
                                {stage === 3 ? '// depth_level' : 'Depth'}
                            </label>
                            <span className="text-xs font-mono font-bold tabular-nums"
                                style={{ color: stageLabelColor }}>
                                {stage === 3 ? `0x${depth.toString(16).toUpperCase().padStart(2, '0')}` : `${depth}%`}
                            </span>
                        </div>

                        <input
                            type="range" min={0} max={100} value={depth}
                            onChange={handleSlider}
                            className={stage === 3 ? 'slider-glitch' : 'slider-serene'}
                            aria-label={`Depth for ${title}`}
                        />

                        {/* Stage thresholds */}
                        <div className="relative flex justify-between text-xs mt-1"
                            style={{ color: stage === 3 ? '#3f3f46' : '#cbd5e1' }}>
                            <span>0</span>
                            <div className="absolute left-[33%] flex flex-col items-center -translate-x-1/2">
                                <div className="w-px h-2 mb-0.5" style={{ background: stage >= 2 ? '#22c55e' : '#e2e8f0' }} />
                                <span className="text-xs" style={{ color: stage >= 2 ? '#22c55e' : '#cbd5e1' }}>34</span>
                            </div>
                            <div className="absolute left-[66%] flex flex-col items-center -translate-x-1/2">
                                <div className="w-px h-2 mb-0.5" style={{ background: stage >= 3 ? '#ff007f' : '#e2e8f0' }} />
                                <span className="text-xs" style={{ color: stage >= 3 ? '#ff007f' : '#cbd5e1' }}>67</span>
                            </div>
                            <span>100</span>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
