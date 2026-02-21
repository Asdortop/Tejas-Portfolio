import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';

/* ─────────────────────────────────────────────
   AnimatedRoutes must live inside BrowserRouter
   so useLocation() is available for the key prop.
───────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    /*
      mode="wait" — the exit animation of the leaving page completes
      before the entering page starts. Produces a cinematic crossfade.
      The key is location.pathname so switching routes triggers the
      enter/exit cycle.
    */
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Root App
───────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      {/* Page background — always full-height serene off-white */}
      <div style={{ minHeight: '100vh', background: '#fcfdfc' }}>
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
