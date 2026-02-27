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
        githubUrl: 'https://github.com/Asdortop/Medical-Chatbot',
    },
    {
        title: 'A Survey on Geometric and Temporal Deep Learning Architectures for Financial Time Series Forecasting',
        image: '/img-financial-dl-survey.svg',
        stateA: 'A comprehensive survey proposing a hybrid Geometric-Temporal Deep Learning framework that integrates spatial market structures with temporal convolution for robust financial forecasting.',
        stateB: [
            'SYS.1: Integrated Graph Signal Processing and Laplacian diffusion to isolate local mispricing and quantify market smoothness.',
            'SYS.2: Applied Topological Data Analysis (TDA) using persistent homology to detect structural regime shifts and systemic fragility.',
            'SYS.3: Championed Causal Temporal Convolutional Networks (TCN) over standard LSTMs for capturing long-range dependencies without data leakage.'
        ],
        tags: ['Geometric Deep Learning ', 'TCN ', 'Spectral Graph Theory ', 'Topological Data Analysis ', 'Algorithmic Trading '],
        githubUrl: null,
    },
    {
        title: 'AI AgriYield Predictor',
        image: '/img-agriyield-predictor.svg',
        stateA:
            'A full-stack machine learning platform that predicts crop yields using advanced feature engineering, LightGBM modeling, and explainable AI insights.',
        stateB: [
            'SYS.1: Built an end-to-end ML pipeline with target encoding, interaction features, and Optuna-based hyperparameter tuning to achieve 88% R² accuracy.',
            'SYS.2: Integrated SHAP-based explainable AI to provide transparent, per-prediction feature contribution analysis for stakeholders.',
            'SYS.3: Developed a React + Flask production-ready web app with real-time predictions (~50ms) and interactive visualizations.',
        ],
        tags: ['Python', 'LightGBM', 'Flask', 'React', 'SHAP'],
        githubUrl: 'https://github.com/Asdortop/AI_AgriYield_Predictor-TejasGuduru',
    },
    {
        title: 'Heart Disease Prediction Using Machine Learning',
        image: '/img-heart-disease-prediction.svg',
        stateA: 'A machine learning project that predicts heart disease risk based on clinical attributes, evaluating diverse algorithms to find the most effective and interpretable approach.',
        stateB: [
            'SYS.1: Built a robust data pipeline utilizing IQR capping for outliers and StandardScaler for feature normalization.',
            'SYS.2: Evaluated base models, advanced boosters, and built soft voting and stacking classifiers, optimizing via GridSearchCV.',
            'SYS.3: Identified Logistic Regression as optimal (86.17% accuracy), prioritizing clinical interpretability over the complex ensembles.'
        ],
        tags: ['Python ', 'Logistic Regression ', 'Ensemble Models ', 'GridSearchCV ', 'scikit-learn'],
        githubUrl: null
    },
    {
        title: 'AI-Powered Resume Analyzer',
        image: '/img-resume-analyzer.svg',
        stateA:
            'An AI-driven platform that extracts resume content and evaluates it against job descriptions to provide detailed scoring and insights.',
        stateB: [
            'SYS.1: Integrated Gemini API with custom prompt engineering to deliver structured resume analysis and ATS-based evaluation.',
            'SYS.2: Analyzed resumes against job descriptions to generate strengths, weaknesses, improvement suggestions, and category-wise ratings.',
            'SYS.3: Visualized performance scores (technical skills, experience, projects, soft skills) using interactive bar charts with Streamlit UI.',
        ],
        tags: ['Gemini API', 'NLP', 'Python', 'Streamlit', 'CSS'],
        githubUrl: 'https://github.com/Asdortop/ResumeAIze',
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
        githubUrl: 'https://github.com/Asdortop/Position_Tracker',
    },
    {
        title: 'CareerGuide – College & Career Assistant',
        image: '/img-career-guide.svg',
        stateA:
            'A modern web platform that helps students explore colleges, predict ranks, discover scholarships, and visualize career growth with AI-powered guidance.',
        stateB: [
            'SYS.1: Built College Finder with advanced filters, interactive map view, and detailed institution insights for informed decision-making.',
            'SYS.2: Integrated Rank Predictor, Scholarship Finder, and AI Mentor to provide personalized academic and career recommendations.',
            'SYS.3: Developed dynamic Timeline and Career Tree visualizations using d3/recharts with a fully responsive Tailwind + shadcn/ui interface.',
        ],
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase'],
        githubUrl: 'https://github.com/Asdortop/CareerGuide_SIH_2025',
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

                    {/* Card grid — 2-column CSS grid so cards fill width evenly */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
                            gap: '1.5rem',
                            alignItems: 'stretch',
                        }}
                    >
                        {PROJECTS.map((project, i) => (
                            <ProjectCard key={project.title} index={i} {...project} />
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
