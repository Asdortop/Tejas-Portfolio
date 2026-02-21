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
            "Selected among the top 20% of global submissions in Google's flagship student dev challenge.",
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
                            fontWeight: 800, color: '#F8FAFC',
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
                            width: 2,
                            background: 'linear-gradient(to bottom, #D946EF, #2DD4BF)',
                            borderRadius: 2,
                            opacity: 0.4,
                        }} />

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ staggerChildren: 0.12 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                        >
                            {TIMELINE.map((item, i) => {
                                const accentColor = item.type === 'work' ? '#2DD4BF' : '#D946EF';
                                return (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        style={{ position: 'relative' }}
                                    >
                                        {/* Timeline dot */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '-2rem',
                                            top: '0.45rem',
                                            width: 16, height: 16,
                                            borderRadius: item.type === 'achievement' ? 2 : '50%',
                                            background: accentColor,
                                            border: '2px solid #05050A',
                                            boxShadow: `0 0 10px ${accentColor}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            {item.type === 'work'
                                                ? <Briefcase size={8} color="#05050A" />
                                                : <Trophy size={8} color="#05050A" />
                                            }
                                        </div>

                                        {/* Card */}
                                        <div
                                            style={{
                                                background: '#0D0D14',
                                                border: '1px solid rgba(255,255,255,0.07)',
                                                borderRadius: 10,
                                                padding: '1.25rem 1.5rem',
                                                transition: 'box-shadow 0.25s, border-color 0.25s',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.boxShadow = `0 0 24px ${accentColor}22`;
                                                e.currentTarget.style.borderColor = `${accentColor}44`;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.boxShadow = '';
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                                                <div>
                                                    <h3 style={{
                                                        margin: 0, fontSize: '1rem', fontWeight: 700,
                                                        color: '#F8FAFC', fontFamily: 'var(--font-sans)',
                                                    }}>
                                                        {item.role}
                                                    </h3>
                                                    <p style={{
                                                        margin: '0.2rem 0 0', fontSize: '0.83rem',
                                                        color: accentColor, fontWeight: 500,
                                                        fontFamily: 'var(--font-sans)',
                                                    }}>
                                                        {item.org}
                                                    </p>
                                                </div>
                                                <span style={{
                                                    fontSize: '0.72rem', fontWeight: 600,
                                                    color: '#475569', fontFamily: 'var(--font-mono)',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: 4, border: '1px solid rgba(255,255,255,0.07)',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {item.period}
                                                </span>
                                            </div>

                                            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                                {item.bullets.map((b, j) => (
                                                    <li key={j} style={{
                                                        fontSize: '0.875rem', color: '#94A3B8',
                                                        lineHeight: 1.65,
                                                        marginBottom: j < item.bullets.length - 1 ? '0.35rem' : 0,
                                                        fontFamily: 'var(--font-sans)',
                                                    }}>
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
