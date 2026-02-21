import './index.css';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';

/* ─────────────────────────────────────────────
   Project Data (PRD Section 4.2)
───────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'AI-Powered Medical Chatbot',
    image: '/img-chatbot.svg',
    stateA:
      'A context-aware multilingual AI healthcare chatbot designed for seamless patient interaction.',
    stateB: [
      'SYS.1: Leveraged RAG, Pinecone, and Gemini API to improve response accuracy by 25%.',
      'SYS.2: Combined hybrid semantic + keyword retrieval for 20% higher precision.',
      'SYS.3: Integrated Whisper API for speech-to-text yielding 140% faster query resolution.',
    ],
    tags: ['Python', 'RAG', 'Pinecone', 'Gemini API', 'Whisper', 'NLP'],
  },
  {
    title: 'Portfolio & Tax Computation System',
    image: '/img-portfolio-tax.svg',
    stateA:
      'An automated system tracking trades and computing tax workflows for salaried individuals.',
    stateB: [
      'SYS.1: Backend API built with FastAPI and PostgreSQL, automating 90% of tracking.',
      'SYS.2: Deployed containerized services via Docker on AWS for high availability.',
    ],
    tags: ['FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Python'],
  },
  {
    title: 'AI-Powered Resume Analyzer',
    image: '/img-resume-analyzer.svg',
    stateA:
      'An intelligent tool that reads and analyzes resumes to provide automated scoring and feedback.',
    stateB: [
      'SYS.1: Integrated NLP models via Gemini API for structured ATS-optimized feedback.',
      'SYS.2: Delivered feedback on 80%+ of resumes with 95% parsing accuracy.',
      'SYS.3: Boosted user engagement by 60% through intelligent recommendation engine.',
    ],
    tags: ['Gemini API', 'NLP', 'Python', 'React', 'FastAPI'],
  },
];

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#fcfdfc' }}>

      {/* ── Hero placeholder (Phase 3) ── */}
      <section
        id="hero"
        style={{
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.5rem 1rem',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#1e293b',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Tejas Guduru.{' '}
            <span style={{ color: '#a8e6cf', textDecoration: 'underline', textDecorationColor: '#a8e6cf' }}>
              I build intelligent systems.
            </span>
          </h1>
          <p
            style={{
              color: '#64748b',
              marginTop: '0.75rem',
              fontSize: '1rem',
              fontWeight: 400,
            }}
          >
            B.Tech in Computer Science AI &amp; Machine Learning | VNR VJIET | Hyderabad, India
          </p>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1e293b',
              marginTop: 0,
              marginBottom: '0.5rem',
            }}
          >
            Projects
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Drag each card&apos;s <strong>Depth</strong> slider — Stage 1 shows the summary,
            Stage 2 reveals the project mockup, Stage 3 unlocks the raw implementation metrics.
          </p>

          {/*
            Flex-wrap container: cards have layout prop + dynamic maxWidth.
            When a card expands, Framer Motion FLIP spring-animates siblings
            out of the way — no CSS grid track constraints needed.
          */}
          <motion.div
            layout
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'flex-start',
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} index={i} {...project} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Skills / Experience placeholders (Phase 3) ── */}
      <section id="skills" style={{ padding: '2rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#cbd5e1', textAlign: 'center', fontSize: '0.85rem' }}>
            Skills &amp; Experience sections — coming in Phase 3.
          </p>
        </div>
      </section>

    </div>
  );
}
