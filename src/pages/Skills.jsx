import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';

const SKILL_GROUPS = [
    {
        category: 'AI / ML',
        color: '#2DD4BF',
        glow: 'rgba(45,212,191,0.45)',
        skills: ['Python', 'NLP', 'Computer Vision', 'Gemini API', 'Hugging Face', 'FAISS', 'Pinecone'],
    },
    {
        category: 'Backend / Infra',
        color: '#D946EF',
        glow: 'rgba(217,70,239,0.45)',
        skills: ['C++', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Kafka'],
    },
    {
        category: 'Frontend',
        color: '#BEF264',
        glow: 'rgba(190,242,100,0.45)',
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
                            fontWeight: 800, color: '#F8FAFC',
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
                                    fontSize: '0.7rem', fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: '0.12em',
                                    color: color, marginBottom: '1rem', marginTop: 0,
                                    fontFamily: 'var(--font-mono)',
                                    opacity: 0.75,
                                }}>
                  // {category}
                                </h2>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: '-40px' }}
                                    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}
                                >
                                    {skills.map((skill) => (
                                        <motion.div
                                            key={skill}
                                            variants={nodeVariants}
                                            whileHover={{
                                                scale: 1.08,
                                                boxShadow: `0 0 18px ${glow}`,
                                                borderColor: color,
                                                transition: { duration: 0.12 },
                                            }}
                                            style={{
                                                padding: '0.45rem 1rem',
                                                borderRadius: '9999px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: `1px solid rgba(255,255,255,0.08)`,
                                                fontSize: '0.84rem',
                                                fontWeight: 500,
                                                color: '#F8FAFC',
                                                cursor: 'default',
                                                fontFamily: 'var(--font-sans)',
                                                transition: 'box-shadow 0.2s, border-color 0.2s',
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
