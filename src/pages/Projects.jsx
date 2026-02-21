import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { PageShell } from '../components/PageShell';

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

export default function Projects() {
    return (
        <PageShell>
            <section style={{ padding: '0 1.5rem 4rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 800,
                            color: '#F8FAFC',
                            margin: '0 0 0.5rem',
                            letterSpacing: '-0.02em',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            Projects
                        </h1>
                        <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                            Drag each card&apos;s <strong style={{ color: '#94A3B8' }}>Depth</strong> slider —
                            Stage&nbsp;1 shows the summary, Stage&nbsp;2 reveals the project mockup,
                            Stage&nbsp;3 unlocks raw implementation metrics.
                        </p>
                    </motion.div>

                    {/* Card grid — flex-wrap so layout FLIP reflows siblings */}
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
        </PageShell>
    );
}
