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
    // Track which link the mouse is hovering — null means "show active route highlight"
    const [hoveredPath, setHoveredPath] = useState(null);

    // The active highlight follows hovered link first, then falls back to current route
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
            {/* Glassmorphism pill */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.35rem',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    background: 'rgba(255, 255, 255, 0.72)',
                    border: '1px solid rgba(168, 230, 207, 0.45)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                    whiteSpace: 'nowrap',
                }}
                onMouseLeave={() => setHoveredPath(null)}
            >
                {LINKS.map(({ to, label, icon: Icon }) => {
                    const isExact = to === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(to);
                    const isHighlighted = to === '/'
                        ? hoveredPath === '/' || (hoveredPath === null && isExact)
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
                                gap: '0.375rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '9999px',
                                fontSize: '0.8125rem',
                                fontWeight: 500,
                                fontFamily: 'var(--font-sans)',
                                textDecoration: 'none',
                                color: isHighlighted ? '#064e3b' : '#64748b',
                                transition: 'color 0.2s ease',
                                zIndex: 1,
                            }}
                        >
                            {/* Sliding background highlight — single layoutId shared across all */}
                            <AnimatePresence>
                                {isHighlighted && (
                                    <motion.span
                                        layoutId="nav-highlight"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '9999px',
                                            background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
                                            zIndex: -1,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </AnimatePresence>

                            <Icon size={14} strokeWidth={isHighlighted ? 2.5 : 1.75} />
                            <span>{label}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
