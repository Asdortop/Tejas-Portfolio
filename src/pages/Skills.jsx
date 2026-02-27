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
function SkillBox({ skill, accent, index, isActive, isDimmed, onEnter, onLeave }) {
    const { Icon } = skill;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            whileHover={{ scale: 1.08, y: -5, transition: { type: 'spring', stiffness: 260, damping: 22 } }}
            transition={{ type: 'spring', stiffness: 240, damping: 20, delay: index * 0.05 }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
                width: 120,
                height: 120,
                flexShrink: 0,
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.75rem',
                background: isActive
                    ? `radial-gradient(ellipse at 50% 30%, ${accent}22 0%, rgba(5,5,12,0.96) 72%)`
                    : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? accent : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive
                    ? `0 0 28px ${accent}55, inset 0 0 16px ${accent}11`
                    : 'none',
                cursor: 'default',
                opacity: isDimmed ? 0.35 : 1,
                transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, opacity 0.4s ease',
            }}
        >
            <motion.div
                animate={isActive ? { rotate: [0, -6, 6, -3, 0], scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <Icon
                    size={40}
                    style={{
                        color: isActive ? accent : 'rgba(255,255,255,0.32)',
                        filter: isActive ? `drop-shadow(0 0 10px ${accent})` : 'none',
                        transition: 'color 0.5s ease, filter 0.5s ease',
                        display: 'block',
                    }}
                />
            </motion.div>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.56rem',
                fontWeight: 600,
                textAlign: 'center',
                color: isActive ? accent : 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
                lineHeight: 1.35,
                transition: 'color 0.5s ease',
                wordBreak: 'break-word',
            }}>
                {skill.name}
            </span>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   SKILL ROW — plain category label + horizontal box row
═══════════════════════════════════════════════════════════ */
function SkillRow({ row, rowIndex }) {
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: rowIndex * 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            {/* Plain category label */}
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: row.accent,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textShadow: `0 0 10px ${row.accent}66`,
            }}>
                {row.label}
            </span>

            {/* Skill boxes */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {row.skills.map((skill, si) => (
                    <SkillBox
                        key={skill.name}
                        skill={skill}
                        accent={row.accent}
                        index={si}
                        isActive={activeSkill === skill.name}
                        isDimmed={activeSkill !== null && activeSkill !== skill.name}
                        onEnter={() => setActiveSkill(skill.name)}
                        onLeave={() => setActiveSkill(null)}
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
