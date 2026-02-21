import { motion } from 'framer-motion';

/* Shared page-transition wrapper — every page uses this */
export const PageShell = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        style={{ minHeight: '100vh', paddingTop: '6rem' }}
    >
        {children}
    </motion.div>
);
