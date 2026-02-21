import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderKanban, Cpu, Briefcase } from 'lucide-react';

const LINKS = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/projects', label: 'Projects', icon: FolderKanban },
    { to: '/skills', label: 'Skills', icon: Cpu },
    { to: '/experience', label: 'Experience', icon: Briefcase },
];

export default function Navbar() {
    const location = useLocation();
    const [hoveredPath, setHoveredPath] = useState(null);

    // Hover takes priority over active route for the highlight pill
    const highlightedPath = hoveredPath ?? location.pathname;

    return (
        <nav
            aria-label="Main navigation"
            style={{
                position: 'fixed',
                top: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
            }}
        >
            {/* Dark frosted glass pill */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    padding: '0.3rem',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset',
                    whiteSpace: 'nowrap',
                }}
                onMouseLeave={() => setHoveredPath(null)}
            >
                {LINKS.map(({ to, label, icon: Icon }) => {
                    const isActive = to === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(to);
                    const isHighlighted = to === '/'
                        ? highlightedPath === '/'
                        : (highlightedPath ?? '').startsWith(to);

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onMouseEnter={() => setHoveredPath(to)}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.5rem 1.05rem',
                                borderRadius: '9999px',
                                fontSize: '0.8125rem',
                                fontWeight: isActive ? 600 : 400,
                                fontFamily: 'var(--font-sans)',
                                textDecoration: 'none',
                                color: isHighlighted ? '#2DD4BF' : 'rgba(248,250,252,0.55)',
                                transition: 'color 0.2s ease',
                                zIndex: 1,
                            }}
                        >
                            {/* Sliding teal highlight pill — single layoutId shared */}
                            <AnimatePresence>
                                {isHighlighted && (
                                    <motion.span
                                        layoutId="nav-highlight"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '9999px',
                                            background: 'rgba(45, 212, 191, 0.12)',
                                            border: '1px solid rgba(45, 212, 191, 0.22)',
                                            zIndex: -1,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    />
                                )}
                            </AnimatePresence>

                            <Icon
                                size={14}
                                strokeWidth={isActive ? 2.5 : 1.75}
                                style={{ color: isHighlighted ? '#2DD4BF' : 'rgba(248,250,252,0.4)' }}
                            />
                            <span>{label}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
