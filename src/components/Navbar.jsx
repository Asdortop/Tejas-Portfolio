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
            {/* Dark frosted pill — bg-black/50, border-pink/30 */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.15rem',
                    padding: '0.3rem',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,0,127,0.28)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,0,127,0.06) inset',
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
                                padding: '0.48rem 1rem',
                                borderRadius: '9999px',
                                fontSize: '0.8125rem',
                                fontWeight: isActive ? 600 : 400,
                                fontFamily: 'var(--font-sans)',
                                textDecoration: 'none',
                                color: isHighlighted ? '#FF007F' : 'rgba(255,255,255,0.6)',
                                transition: 'color 0.2s',
                                zIndex: 1,
                            }}
                        >
                            {/* Sliding hot-pink highlight pill */}
                            <AnimatePresence>
                                {isHighlighted && (
                                    <motion.span
                                        layoutId="nav-highlight"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '9999px',
                                            background: 'rgba(255,0,127,0.1)',
                                            border: '1px solid rgba(255,0,127,0.3)',
                                            zIndex: -1,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                                    />
                                )}
                            </AnimatePresence>

                            <Icon
                                size={14}
                                strokeWidth={isActive ? 2.5 : 1.75}
                                style={{ color: isHighlighted ? '#FF007F' : 'rgba(255,255,255,0.35)' }}
                            />
                            <span>{label}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
