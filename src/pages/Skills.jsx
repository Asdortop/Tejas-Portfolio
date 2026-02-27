import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import {
    Brain, Network, MessageSquare, Cpu, BarChart2, Layers, Search, Flame,
    Component, Zap, Server, Layout, Wind,
    Database, FileText, Box, Cloud, GitBranch, HardDrive,
    Code2, Terminal, Braces, Binary, BookOpen,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   DATA — categories as rows, each with icon square skills
═══════════════════════════════════════════════════════════ */
const ROWS = [
    {
        id: 'ai',
        label: 'AI & Machine Learning',
        comment: '// intelligence stack',
        accent: '#00FFFF',
        skills: [
            { name: 'Machine Learning', Icon: Brain },
            { name: 'Deep Learning', Icon: Network },
            { name: 'NLP & RAG', Icon: MessageSquare },
            { name: 'LLMs', Icon: Cpu },
            { name: 'Scikit-learn', Icon: BarChart2 },
            { name: 'PyTorch', Icon: Flame },
            { name: 'Hugging Face', Icon: Layers },
            { name: 'Vector DBs', Icon: Search },
        ],
    },
    {
        id: 'web',
        label: 'Web Development',
        comment: '// frontend & backend',
        accent: '#FF007F',
        skills: [
            { name: 'React.js', Icon: Component },
            { name: 'FastAPI', Icon: Zap },
            { name: 'Flask', Icon: Server },
            { name: 'Node & Express', Icon: Server },
            { name: 'HTML5 / CSS3', Icon: Layout },
            { name: 'Tailwind CSS', Icon: Wind },
        ],
    },
    {
        id: 'db',
        label: 'Databases & DevOps',
        comment: '// data layer & infra',
        accent: '#22C55E',
        skills: [
            { name: 'PostgreSQL', Icon: Database },
            { name: 'MySQL', Icon: Database },
            { name: 'MongoDB', Icon: FileText },
            { name: 'Docker', Icon: Box },
            { name: 'AWS', Icon: Cloud },
            { name: 'Git & GitHub', Icon: GitBranch },
            { name: 'Redis', Icon: HardDrive },
        ],
    },
    {
        id: 'cs',
        label: 'Core CS & Languages',
        comment: '// foundations',
        accent: '#FF007F',
        skills: [
            { name: 'Python', Icon: Code2 },
            { name: 'C++ & C', Icon: Terminal },
            { name: 'JavaScript', Icon: Braces },
            { name: 'DSA', Icon: Binary },
            { name: 'OOP / OS / DBMS', Icon: BookOpen },
        ],
    },
];

/* ═══════════════════════════════════════════════════════════
   SKILL BOX — square tile with icon + name
═══════════════════════════════════════════════════════════ */
function SkillBox({ skill, accent, index }) {
    const [hovered, setHovered] = useState(false);
    const { Icon } = skill;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            whileHover={{ scale: 1.1, y: -4, transition: { type: 'spring', stiffness: 320, damping: 18 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.05 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: 112,
                height: 112,
                flexShrink: 0,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                padding: '0.6rem',
                background: hovered
                    ? `radial-gradient(ellipse at 50% 30%, ${accent}1e 0%, rgba(5,5,12,0.95) 70%)`
                    : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.09)'}`,
                boxShadow: hovered
                    ? `0 0 24px ${accent}55, inset 0 0 14px ${accent}0f`
                    : 'none',
                cursor: 'default',
                transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
            }}
        >
            <motion.div
                animate={hovered ? { rotate: [0, -8, 8, -4, 0], scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
                <Icon
                    size={34}
                    style={{
                        color: hovered ? accent : 'rgba(255,255,255,0.38)',
                        filter: hovered ? `drop-shadow(0 0 8px ${accent})` : 'none',
                        transition: 'color 0.25s, filter 0.25s',
                        display: 'block',
                    }}
                />
            </motion.div>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.54rem',
                fontWeight: 600,
                textAlign: 'center',
                color: hovered ? accent : 'rgba(255,255,255,0.5)',
                letterSpacing: '0.04em',
                lineHeight: 1.35,
                transition: 'color 0.25s',
                wordBreak: 'break-word',
            }}>
                {skill.name}
            </span>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   SKILL ROW — category label + horizontal box row
═══════════════════════════════════════════════════════════ */
function SkillRow({ row, rowIndex }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: rowIndex * 0.08 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1.5rem',
                background: '#050505',
                border: `1px solid rgba(255,255,255,0.06)`,
                borderLeft: `3px solid ${row.accent}`,
                borderRadius: 4,
                boxShadow: `0 0 28px ${row.accent}0a`,
            }}
        >
            {/* Row header */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: row.accent,
                        boxShadow: `0 0 8px ${row.accent}`,
                        flexShrink: 0,
                        display: 'inline-block',
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: row.accent,
                        letterSpacing: '0.1em',
                        textShadow: `0 0 10px ${row.accent}88`,
                        textTransform: 'uppercase',
                    }}>
                        {row.label}
                    </span>
                </div>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.04em',
                }}>
                    {row.comment}
                </span>
            </div>

            {/* Skill boxes */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
            }}>
                {row.skills.map((skill, si) => (
                    <SkillBox
                        key={skill.name}
                        skill={skill}
                        accent={row.accent}
                        index={si}
                    />
                ))}
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function Skills() {
    return (
        <PageShell>
            <section style={{ padding: '0 clamp(1rem, 5vw, 4rem) 5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#22C55E',
                            letterSpacing: '0.1em',
                            marginBottom: '0.6rem',
                            textShadow: '0 0 8px rgba(34,197,94,0.5)',
                        }}>
                            &gt; ls -la ./skills
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 800,
                            color: '#F8FAFC',
                            margin: '0 0 0.4rem',
                            letterSpacing: '-0.02em',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            Skills
                        </h1>
                        <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.28)',
                            margin: 0,
                            letterSpacing: '0.04em',
                        }}>
                            // Hover any tile to inspect
                        </p>
                    </motion.div>

                    {/* Category rows stacked vertically */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {ROWS.map((row, ri) => (
                            <SkillRow key={row.id} row={row} rowIndex={ri} />
                        ))}
                    </div>

                </div>
            </section>
        </PageShell>
    );
}
