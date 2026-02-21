import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/PageShell';

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Home() {
    return (
        <PageShell>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2rem 1.5rem 4rem',
                    minHeight: 'calc(100vh - 6rem)',
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    style={{ maxWidth: 680 }}
                >
                    {/* Status chip */}
                    <motion.div variants={itemVariants}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.35rem 0.9rem', borderRadius: '9999px',
                            background: '#dcfce7', border: '1px solid #a8e6cf',
                            fontSize: '0.78rem', fontWeight: 600, color: '#065f46',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                            Open to opportunities
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 variants={itemVariants}
                        style={{
                            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                            fontWeight: 900,
                            color: '#0f172a',
                            margin: '0 0 1.25rem',
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            fontFamily: 'var(--font-sans)',
                        }}>
                        Tejas Guduru.{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #a8e6cf, #22c55e)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            I build<br />intelligent systems.
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p variants={itemVariants}
                        style={{
                            fontSize: '1.05rem', color: '#64748b', marginBottom: '2.5rem',
                            lineHeight: 1.7, fontFamily: 'var(--font-sans)',
                        }}>
                        B.Tech in Computer Science — AI &amp; Machine Learning<br />
                        VNR VJIET · Hyderabad, India
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={itemVariants}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/projects"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.75rem 1.75rem', borderRadius: '9999px',
                                background: '#0f172a', color: '#ffffff',
                                fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
                                fontFamily: 'var(--font-sans)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = ''}
                        >
                            View Projects <ArrowRight size={16} />
                        </Link>
                        <a href="mailto:tejashguduru@gmail.com"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.75rem 1.75rem', borderRadius: '9999px',
                                background: '#ffffff', color: '#0f172a',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
                                fontFamily: 'var(--font-sans)',
                                transition: 'transform 0.2s, border-color 0.2s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.borderColor = '#a8e6cf';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                            }}
                        >
                            <Mail size={16} /> Get in touch
                        </a>
                    </motion.div>

                    {/* Social links */}
                    <motion.div variants={itemVariants}
                        style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginTop: '2.5rem' }}>
                        {[
                            { href: 'https://github.com/tejasguduru', icon: Github, label: 'GitHub' },
                            { href: 'https://linkedin.com/in/tejasguduru', icon: Linkedin, label: 'LinkedIn' },
                        ].map(({ href, icon: Icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer"
                                aria-label={label}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: '#f8fafc', border: '1px solid #e2e8f0',
                                    color: '#64748b', textDecoration: 'none',
                                    transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#065f46';
                                    e.currentTarget.style.borderColor = '#a8e6cf';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = '#64748b';
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.transform = '';
                                }}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>
            </section>
        </PageShell>
    );
}
