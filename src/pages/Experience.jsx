import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { Briefcase, Trophy } from 'lucide-react';

const TIMELINE = [
    {
        type: 'work',
        role: 'Backend Intern',
        org: 'Alfago Research LLP',
        period: '2024',
        bullets: [
            'Designed and built the Portfolio Management system backend from scratch.',
            'Containerized services via Docker and deployed to AWS for production availability.',
        ],
    },
    {
        type: 'work',
        role: 'AI Intern',
        org: 'Infosys Springboard',
        period: '2024',
        bullets: [
            'Engineered AgriYield Prediction System using Random Forest & XGBoost.',
            'Improved forecast precision by 15% over baseline via feature engineering.',
        ],
    },
    {
        type: 'achievement',
        role: 'Google Solution Challenge 2024',
        org: 'Finalist — Top 20%',
        period: '2024',
        bullets: [
            'Selected among the top 20% of global submissions in Google\'s flagship student dev challenge.',
        ],
    },
    {
        type: 'achievement',
        role: 'Turing Cup 2025',
        org: 'Finalist',
        period: '2025',
        bullets: [
            'Reached the finals of Turing Cup 2025, demonstrating advanced AI problem-solving.',
        ],
    },
];

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export default function Experience() {
    return (
        <PageShell>
            <section style={{ padding: '0 1.5rem 4rem' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>

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
                        Experience &amp; Achievements
                    </motion.h1>

                    {/* Vertical timeline */}
                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                        {/* Vertical line */}
                        <div style={{
                            position: 'absolute', left: '0.45rem', top: 0, bottom: 0,
                            width: 2, background: 'linear-gradient(to bottom, #a8e6cf, #dcedc1)',
                            borderRadius: 2,
                        }} />

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ staggerChildren: 0.12 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                        >
                            {TIMELINE.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    style={{ position: 'relative' }}
                                >
                                    {/* Timeline dot */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '-2rem',
                                        top: '0.35rem',
                                        width: 16, height: 16,
                                        borderRadius: '50%',
                                        background: item.type === 'work' ? '#a8e6cf' : '#dcedc1',
                                        border: '2px solid #ffffff',
                                        boxShadow: '0 0 0 2px #a8e6cf',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {item.type === 'work'
                                            ? <Briefcase size={8} color="#065f46" />
                                            : <Trophy size={8} color="#065f46" />
                                        }
                                    </div>

                                    {/* Card */}
                                    <div style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: 12,
                                        padding: '1.25rem 1.5rem',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                        transition: 'box-shadow 0.2s, border-color 0.2s',
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.boxShadow = '0 4px 24px rgba(168,230,207,0.3)';
                                            e.currentTarget.style.borderColor = '#a8e6cf';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <div>
                                                <h3 style={{
                                                    margin: 0, fontSize: '1rem', fontWeight: 700,
                                                    color: '#0f172a', fontFamily: 'var(--font-sans)',
                                                }}>
                                                    {item.role}
                                                </h3>
                                                <p style={{
                                                    margin: '0.2rem 0 0', fontSize: '0.85rem',
                                                    color: '#065f46', fontWeight: 500,
                                                }}>
                                                    {item.org}
                                                </p>
                                            </div>
                                            <span style={{
                                                fontSize: '0.75rem', fontWeight: 600,
                                                color: '#94a3b8', fontFamily: 'var(--font-mono)',
                                                background: '#f8fafc', padding: '0.2rem 0.6rem',
                                                borderRadius: 6, border: '1px solid #e2e8f0',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {item.period}
                                            </span>
                                        </div>

                                        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                            {item.bullets.map((b, j) => (
                                                <li key={j} style={{
                                                    fontSize: '0.875rem', color: '#475569',
                                                    lineHeight: 1.65, marginBottom: j < item.bullets.length - 1 ? '0.35rem' : 0,
                                                    fontFamily: 'var(--font-sans)',
                                                }}>
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
