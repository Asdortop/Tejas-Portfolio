import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, GitBranch, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────────── */
const contentVariants = {
    initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

const glitchVariants = {
    initial: { opacity: 0, x: -8, filter: 'blur(4px) saturate(2)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px) saturate(1)', transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: 8, filter: 'blur(4px) saturate(2)', transition: { duration: 0.25 } },
};

/* ─────────────────────────────────────────────
   State A — Serene / Watercolor View
───────────────────────────────────────────── */
function SereneView({ stateA, tags }) {
    return (
        <motion.div
            key="serene"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4"
        >
            <p
                className="italic leading-relaxed text-base"
                style={{ color: '#1e293b', opacity: 0.82 }}
            >
                {stateA}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                            background: '#dcedc1',
                            color: '#1e293b',
                            border: '1px solid #a8e6cf',
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   State B — Glitch / Terminal View
───────────────────────────────────────────── */
function GlitchView({ stateB, tags, title }) {
    return (
        <motion.div
            key="glitch"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-3"
        >
            {/* Terminal top bar */}
            <div className="flex items-center gap-2 mb-1 pb-2" style={{ borderBottom: '1px solid #27272a' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff007f', boxShadow: '0 0 6px #ff007f' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                <span
                    className="ml-2 text-xs font-mono"
                    style={{ color: '#52525b' }}
                >
                    /{title.toLowerCase().replace(/[\s/]+/g, '-')}.sys
                </span>
                <Terminal size={12} className="ml-auto" style={{ color: '#52525b' }} />
            </div>

            {/* Log lines */}
            <div className="flex flex-col gap-2 font-mono text-sm">
                {stateB.map((line, i) => {
                    const sysLabel = `SYS.${i + 1}`;
                    const rest = line.replace(/^SYS\.\d+:\s*/, '');
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.25 }}
                            className="flex gap-2 items-start"
                        >
                            <span
                                className="shrink-0 font-bold text-xs px-1.5 py-0.5 rounded"
                                style={{
                                    color: '#06b6d4',
                                    background: 'rgba(6,182,212,0.12)',
                                    border: '1px solid rgba(6,182,212,0.3)',
                                    fontFamily: 'inherit',
                                }}
                            >
                                {sysLabel}
                            </span>
                            <span style={{ color: '#f8fafc', lineHeight: '1.5' }}>
                                {rest}
                            </span>
                        </motion.div>
                    );
                })}
                {/* Blinking cursor */}
                <span className="font-mono text-sm" style={{ color: '#22c55e' }}>
                    <span className="cursor-blink">█</span>
                </span>
            </div>

            {/* Tech tags in glitch style */}
            <div className="flex flex-wrap gap-2 mt-1 pt-2" style={{ borderTop: '1px solid #27272a' }}>
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-mono font-medium"
                        style={{
                            color: '#22c55e',
                            background: 'rgba(34,197,94,0.08)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            borderRadius: 0,
                        }}
                    >
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
export default function ProjectCard({ title, stateA, stateB, tags, index }) {
    const [depth, setDepth] = useState(0);
    const isGlitch = depth >= 50;

    /* Card style transitions */
    const cardStyle = isGlitch
        ? {
            background: '#18181b',
            border: '1px solid #ff007f',
            boxShadow: '4px 4px 0px #ff007f',
            color: '#f8fafc',
        }
        : {
            background: '#ffffff',
            border: '1px solid #a8e6cf',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
            color: '#1e293b',
        };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-xl overflow-hidden transition-all duration-500"
            style={{ ...cardStyle, position: 'relative' }}
        >
            {/* Scanlines overlay only in glitch mode */}
            {isGlitch && <div className="scanlines" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />}

            <div className="relative p-6 flex flex-col gap-5" style={{ zIndex: 2 }}>

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {isGlitch
                            ? <Cpu size={20} style={{ color: '#ff007f' }} />
                            : <GitBranch size={20} style={{ color: '#a8e6cf' }} />
                        }
                        <h3
                            className="font-bold text-lg leading-tight transition-all duration-300"
                            style={{
                                color: isGlitch ? '#f8fafc' : '#1e293b',
                                fontFamily: isGlitch ? 'var(--font-mono)' : 'var(--font-sans)',
                                letterSpacing: isGlitch ? '0.05em' : 'normal',
                            }}
                        >
                            {isGlitch ? `> ${title.toUpperCase()}` : title}
                        </h3>
                    </div>
                    <ExternalLink
                        size={16}
                        className="shrink-0 mt-0.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                        style={{ color: isGlitch ? '#06b6d4' : '#1e293b' }}
                    />
                </div>

                {/* Animated content: AnimatePresence handles the crossfade */}
                <div className="min-h-[120px]">
                    <AnimatePresence mode="wait">
                        {isGlitch
                            ? <GlitchView key="glitch" stateB={stateB} tags={tags} title={title} />
                            : <SereneView key="serene" stateA={stateA} tags={tags} />
                        }
                    </AnimatePresence>
                </div>

                {/* Depth Slider */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label
                            className="text-xs font-semibold uppercase tracking-widest"
                            style={{
                                color: isGlitch ? '#52525b' : '#94a3b8',
                                fontFamily: isGlitch ? 'var(--font-mono)' : 'var(--font-sans)',
                            }}
                        >
                            {isGlitch ? '// depth_level' : 'Depth'}
                        </label>
                        <span
                            className="text-xs font-mono font-bold tabular-nums"
                            style={{ color: isGlitch ? '#ff007f' : '#a8e6cf' }}
                        >
                            {isGlitch ? `0x${depth.toString(16).toUpperCase().padStart(2, '0')}` : `${depth}%`}
                        </span>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={depth}
                        onChange={(e) => setDepth(Number(e.target.value))}
                        className={isGlitch ? 'slider-glitch' : 'slider-serene'}
                        aria-label={`Depth for ${title}`}
                    />

                    {/* Threshold label */}
                    <div className="flex justify-between text-xs" style={{ color: isGlitch ? '#3f3f46' : '#cbd5e1' }}>
                        <span>{isGlitch ? 'SURFACE' : 'Surface'}</span>
                        <span
                            className="font-semibold"
                            style={{ color: isGlitch ? '#ff007f' : '#a8e6cf' }}
                        >
                            {isGlitch ? '⚡ THRESHOLD BREACHED' : '— threshold 50 —'}
                        </span>
                        <span>{isGlitch ? 'CORE' : 'Core'}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
