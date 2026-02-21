import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';

const SKILL_GROUPS = [
    {
        category: 'AI / ML',
        color: '#a8e6cf',
        glow: 'rgba(168,230,207,0.5)',
        skills: ['Python', 'NLP', 'Computer Vision', 'Gemini API', 'Hugging Face', 'FAISS', 'Pinecone'],
    },
    {
        category: 'Backend / Infra',
        color: '#06b6d4',
        glow: 'rgba(6,182,212,0.5)',
        skills: ['C++', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Kafka'],
    },
    {
        category: 'Frontend',
        color: '#dcedc1',
        glow: 'rgba(220,237,193,0.8)',
        skills: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};
const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

export default function Skills() {
    return (
        <PageShell>
            <section style={{ padding: '0 1.5rem 4rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 800, color: '#0f172a',
                            margin: '0 0 2.5rem', letterSpacing: '-0.02em',
                            fontFamily: 'var(--font-sans)',
                        }}
                    >
                        Skills
                    </motion.h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {SKILL_GROUPS.map(({ category, color, glow, skills }) => (
                            <div key={category}>
                                <h2 style={{
                                    fontSize: '0.75rem', fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: '0.1em',
                                    color: '#94a3b8', marginBottom: '1rem', marginTop: 0,
                                    fontFamily: 'var(--font-sans)',
                                }}>
                                    {category}
                                </h2>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: '-40px' }}
                                    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
                                >
                                    {skills.map((skill) => (
                                        <motion.div
                                            key={skill}
                                            variants={nodeVariants}
                                            whileHover={{
                                                scale: 1.1,
                                                boxShadow: `0 0 16px ${glow}`,
                                                transition: { duration: 0.15 },
                                            }}
                                            style={{
                                                padding: '0.5rem 1.1rem',
                                                borderRadius: '9999px',
                                                background: '#ffffff',
                                                border: `1px solid ${color}`,
                                                fontSize: '0.85rem',
                                                fontWeight: 500,
                                                color: '#1e293b',
                                                cursor: 'default',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                                fontFamily: 'var(--font-sans)',
                                                transition: 'box-shadow 0.2s',
                                            }}
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
