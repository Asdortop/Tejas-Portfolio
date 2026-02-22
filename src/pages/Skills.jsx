import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell } from '../components/PageShell';

/* ═══════════════════════════════════════════════════════════
   SKILL DATA
═══════════════════════════════════════════════════════════ */
const SKILL_GROUPS = [
    {
        category: 'AI / ML',
        comment: '// AI / ML',
        accent: '#22C55E',
        dim: 'rgba(34,197,94,0.12)',
        borderGlow: 'rgba(34,197,94,0.7)',
        skills: [
            {
                name: 'Python',
                category: 'AI / ML',
                accent: '#22C55E',
                proficiency: 95,
                status: 'System optimal.',
                details: [
                    'Primary language for all ML/AI pipelines.',
                    'Libraries: NumPy · Pandas · Scikit-Learn · PyTorch.',
                    'Async-first design patterns via asyncio.',
                ],
            },
            {
                name: 'NLP / LLMs',
                category: 'AI / ML',
                accent: '#22C55E',
                proficiency: 88,
                status: 'System optimal.',
                details: [
                    'Prompt engineering · RAG architectures · fine-tuning.',
                    'Frameworks: LangChain · LlamaIndex · Hugging Face.',
                    'Gemini API · OpenAI · Ollama (local inference).',
                ],
            },
            {
                name: 'RAG Pipelines',
                category: 'AI / ML',
                accent: '#22C55E',
                proficiency: 85,
                status: 'System optimal.',
                details: [
                    'Retrieval-Augmented Generation for grounded LLM output.',
                    'Vector stores: FAISS · Pinecone · ChromaDB.',
                    'Hybrid search: dense + sparse retrieval strategies.',
                ],
            },
            {
                name: 'Computer Vision',
                category: 'AI / ML',
                accent: '#22C55E',
                proficiency: 78,
                status: 'Module loaded.',
                details: [
                    'Object detection · image classification pipelines.',
                    'Frameworks: OpenCV · torchvision · YOLO variants.',
                    'Deployed inference via ONNX for edge devices.',
                ],
            },
            {
                name: 'Hugging Face',
                category: 'AI / ML',
                accent: '#22C55E',
                proficiency: 83,
                status: 'System optimal.',
                details: [
                    'Transformers library: BERT · T5 · LLaMA · Mistral.',
                    'Datasets hub · model cards · Inference API.',
                    'PEFT / LoRA fine-tuning for task-specific adaptation.',
                ],
            },
            {
                name: 'FAISS / Pinecone',
                category: 'AI / ML',
                accent: '#22C55E',
                proficiency: 80,
                status: 'System optimal.',
                details: [
                    'High-dimensional ANN index for semantic search.',
                    'Used in production RAG systems at scale.',
                    'Pinecone serverless for zero-ops vector storage.',
                ],
            },
        ],
    },
    {
        category: 'Backend / Infra',
        comment: '// BACKEND / INFRA',
        accent: '#FF007F',
        dim: 'rgba(255,0,127,0.1)',
        borderGlow: 'rgba(255,0,127,0.7)',
        skills: [
            {
                name: 'FastAPI',
                category: 'Backend / Infra',
                accent: '#FF007F',
                proficiency: 92,
                status: 'System optimal.',
                details: [
                    'Async REST & WebSocket APIs — production grade.',
                    'Pydantic v2 schemas · dependency injection · OAuth2.',
                    'Deployed on Docker · paired with PostgreSQL + Redis.',
                ],
            },
            {
                name: 'PostgreSQL',
                category: 'Backend / Infra',
                accent: '#FF007F',
                proficiency: 85,
                status: 'System optimal.',
                details: [
                    'Relational data modelling · complex JOIN queries.',
                    'ORM: SQLAlchemy (async) · Alembic migrations.',
                    'Indexing strategies · JSONB for semi-structured data.',
                ],
            },
            {
                name: 'Docker',
                category: 'Backend / Infra',
                accent: '#FF007F',
                proficiency: 88,
                status: 'System optimal.',
                details: [
                    'Multi-stage Dockerfiles for lean production images.',
                    'Docker Compose for local dev orchestration.',
                    'Published to GHCR; deployed on AWS ECS + Fargate.',
                ],
            },
            {
                name: 'Kafka',
                category: 'Backend / Infra',
                accent: '#FF007F',
                proficiency: 72,
                status: 'Module loaded.',
                details: [
                    'Event-driven microservice communication.',
                    'Producer / consumer patterns with aiokafka.',
                    'Used for real-time data ingestion pipelines.',
                ],
            },
            {
                name: 'AWS',
                category: 'Backend / Infra',
                accent: '#FF007F',
                proficiency: 75,
                status: 'Module loaded.',
                details: [
                    'Services: EC2 · S3 · Lambda · SQS · RDS · ECS.',
                    'IAM roles · VPC networking · CloudWatch logging.',
                    'Infrastructure-as-code via Terraform (learning).',
                ],
            },
            {
                name: 'C++',
                category: 'Backend / Infra',
                accent: '#FF007F',
                proficiency: 70,
                status: 'Module loaded.',
                details: [
                    'High-performance data structures & algorithms.',
                    'Used for competitive programming & system design.',
                    'STL · memory management · multithreading basics.',
                ],
            },
        ],
    },
    {
        category: 'Frontend',
        comment: '// FRONTEND',
        accent: '#00FFFF',
        dim: 'rgba(0,255,255,0.09)',
        borderGlow: 'rgba(0,255,255,0.7)',
        skills: [
            {
                name: 'React.js',
                category: 'Frontend',
                accent: '#00FFFF',
                proficiency: 87,
                status: 'System optimal.',
                details: [
                    'Component architecture · hooks · context API.',
                    'React Router v7 · Vite toolchain · Code splitting.',
                    'Custom hooks for shared stateful logic.',
                ],
            },
            {
                name: 'Framer Motion',
                category: 'Frontend',
                accent: '#00FFFF',
                proficiency: 82,
                status: 'System optimal.',
                details: [
                    'Spring physics · layout animations · AnimatePresence.',
                    'useSpring / useTransform for gesture-driven UIs.',
                    'Scroll-linked animations via useScroll.',
                ],
            },
            {
                name: 'Tailwind CSS',
                category: 'Frontend',
                accent: '#00FFFF',
                proficiency: 90,
                status: 'System optimal.',
                details: [
                    'Utility-first design system with custom theme tokens.',
                    'v4 CSS-first config · @theme overrides.',
                    'Responsive · dark mode · arbitrary value support.',
                ],
            },
        ],
    },
];

/* ═══════════════════════════════════════════════════════════
   PROFICIENCY BAR
   Thin pixel-style bar that fills on mount.
═══════════════════════════════════════════════════════════ */
function ProficiencyBar({ value, accent }) {
    return (
        <div style={{
            width: '100%',
            height: 2,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 0,
            overflow: 'hidden',
            marginTop: '0.5rem',
        }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.08 }}
                style={{
                    height: '100%',
                    background: accent,
                    boxShadow: `0 0 6px ${accent}`,
                }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   TERMINAL CURSOR BLINK (reusable)
═══════════════════════════════════════════════════════════ */
function Cursor() {
    return <span className="cursor-blink" style={{ marginLeft: 2, color: '#FF007F' }}>█</span>;
}

/* ═══════════════════════════════════════════════════════════
   TYPING LINE
   Types out a string character by character.
═══════════════════════════════════════════════════════════ */
function TypingLine({ text, color = '#FFFFFF', delay = 0, speed = 22, prefix = '' }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        // Clear on re-render
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
        setDisplayed('');
        setDone(false);

        let i = 0;
        const startTimer = setTimeout(() => {
            const tick = () => {
                if (i <= text.length) {
                    setDisplayed(text.slice(0, i));
                    i++;
                    if (i > text.length) { setDone(true); return; }
                    timeouts.current.push(setTimeout(tick, speed));
                }
            };
            tick();
        }, delay);
        timeouts.current.push(startTimer);

        return () => timeouts.current.forEach(clearTimeout);
    }, [text, delay, speed]);

    return (
        <div style={{ color, fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.7 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>{prefix}</span>
            {displayed}
            {!done && <Cursor />}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   TERMINAL PANEL (right column)
═══════════════════════════════════════════════════════════ */
function TerminalPanel({ activeSkill }) {
    return (
        <div style={{
            position: 'sticky',
            top: '6rem',
            background: '#000000',
            border: '1px solid rgba(255,0,127,0.25)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(255,0,127,0.07), inset 0 0 0 1px rgba(255,255,255,0.03)',
            minHeight: 420,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Title bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 0.9rem',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.025)',
                flexShrink: 0,
            }}>
                {/* Mac-style window dots */}
                {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
                    <span key={i} style={{
                        width: 11, height: 11, borderRadius: '50%',
                        background: c, display: 'inline-block',
                        boxShadow: `0 0 6px ${c}55`,
                        flexShrink: 0,
                    }} />
                ))}
                <span style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.08em',
                }}>
                    skill_inspector.sh
                </span>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.1rem 0.4rem',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#22C55E',
                    borderRadius: 2,
                    letterSpacing: '0.06em',
                }}>LIVE</span>
            </div>

            {/* Output area */}
            <div style={{
                flex: 1,
                padding: '1.25rem 1.2rem',
                overflowY: 'auto',
            }}>
                <AnimatePresence mode="wait">
                    {!activeSkill ? (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {/* Static header lines */}
                            {[
                                { t: '# Tejas Guduru — Skill Inspector v2.6', c: 'rgba(255,255,255,0.2)' },
                                { t: '# ─────────────────────────────────────', c: 'rgba(255,255,255,0.1)' },
                                { t: '', c: '' },
                            ].map((l, i) => (
                                <div key={i} style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem',
                                    color: l.c,
                                    lineHeight: 1.9,
                                }}>{l.t}</div>
                            ))}
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.82rem',
                                color: '#FF007F',
                                lineHeight: 1.7,
                            }}>
                                &gt; Awaiting system input...<Cursor />
                            </div>
                            <div style={{
                                marginTop: '1.5rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: 'rgba(255,255,255,0.18)',
                                lineHeight: 1.9,
                            }}>
                                <div>// Hover any skill node on the left</div>
                                <div>// to inspect its details here.</div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeSkill.name}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                        >
                            {/* Header comment */}
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                color: 'rgba(255,255,255,0.2)',
                                marginBottom: '0.75rem',
                                lineHeight: 1.8,
                            }}>
                                <div># ─────────────────────────────────────</div>
                                <div># INSPECT: {activeSkill.name.toUpperCase()}</div>
                                <div># ─────────────────────────────────────</div>
                            </div>

                            {/* Core fields */}
                            <TypingLine
                                text={`> Target     : ${activeSkill.name}`}
                                color={activeSkill.accent}
                                delay={0}
                                speed={18}
                            />
                            <TypingLine
                                text={`> Category   : ${activeSkill.category}`}
                                color="rgba(255,255,255,0.75)"
                                delay={120}
                                speed={18}
                            />
                            <TypingLine
                                text={`> Proficiency: ${activeSkill.proficiency}%`}
                                color="rgba(255,255,255,0.75)"
                                delay={260}
                                speed={18}
                            />
                            <TypingLine
                                text={`> Status     : ${activeSkill.status}`}
                                color="#22C55E"
                                delay={410}
                                speed={18}
                            />

                            {/* Proficiency bar */}
                            <div style={{ margin: '0.85rem 0' }}>
                                <ProficiencyBar value={activeSkill.proficiency} accent={activeSkill.accent} />
                            </div>

                            {/* Divider */}
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.68rem',
                                color: 'rgba(255,255,255,0.12)',
                                margin: '0.85rem 0',
                            }}>───────────────────────────────────────</div>

                            {/* Detail lines */}
                            {activeSkill.details.map((line, i) => (
                                <TypingLine
                                    key={`${activeSkill.name}-d${i}`}
                                    text={`  ${line}`}
                                    color="rgba(255,255,255,0.5)"
                                    delay={560 + i * 200}
                                    speed={10}
                                    prefix="  "
                                />
                            ))}

                            {/* Prompt */}
                            <div style={{
                                marginTop: '1.2rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.2)',
                            }}>
                                &gt; _
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   SKILL NODE (left column card)
═══════════════════════════════════════════════════════════ */
function SkillNode({ skill, isActive, onEnter, onLeave }) {
    return (
        <motion.div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.7rem 1rem',
                borderRadius: 2,
                background: isActive ? skill.dim : 'rgba(255,255,255,0.025)',
                borderLeft: `2px solid ${isActive ? skill.accent : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive ? `0 0 16px ${skill.accent}22, inset 0 0 0 1px ${skill.accent}18` : 'none',
                cursor: 'default',
                transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                {/* Status dot */}
                <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isActive ? skill.accent : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `0 0 8px ${skill.accent}` : 'none',
                    flexShrink: 0,
                    transition: 'background 0.2s, box-shadow 0.2s',
                }} />
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? skill.accent : 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s, font-weight 0.15s',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {skill.name}
                </span>
            </div>

            {/* Proficiency percent (right-aligned) */}
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: isActive ? skill.accent : 'rgba(255,255,255,0.2)',
                letterSpacing: '0.04em',
                flexShrink: 0,
                transition: 'color 0.2s',
            }}>
                {skill.proficiency}%
            </span>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function Skills() {
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <PageShell>
            <section style={{ padding: '0 clamp(1rem, 5vw, 4rem) 5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#22C55E',
                            letterSpacing: '0.1em',
                            marginBottom: '0.6rem',
                            textShadow: '0 0 8px rgba(34,197,94,0.5)',
                        }}>
                            &gt; ls -la ./skills
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            margin: 0,
                            letterSpacing: '-0.03em',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            Skill Dashboard
                        </h1>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.3)',
                            marginTop: '0.5rem',
                            letterSpacing: '0.04em',
                        }}>
                            // Hover a node to inspect its details →
                        </div>
                    </motion.div>

                    {/* ── 2-col dashboard grid ── */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                        gap: '2rem',
                        alignItems: 'start',
                    }}>

                        {/* LEFT COLUMN — Skill nodes */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
                            {SKILL_GROUPS.map(({ comment, accent, skills: groupSkills }, gi) => (
                                <motion.div
                                    key={comment}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: gi * 0.07 }}
                                >
                                    {/* Category comment label */}
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        color: accent,
                                        letterSpacing: '0.1em',
                                        marginBottom: '0.75rem',
                                        textShadow: `0 0 10px ${accent}88`,
                                    }}>
                                        {comment}
                                    </div>

                                    {/* Skill node list */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        {groupSkills.map((skill) => (
                                            <SkillNode
                                                key={skill.name}
                                                skill={skill}
                                                isActive={activeSkill?.name === skill.name}
                                                onEnter={() => setActiveSkill(skill)}
                                                onLeave={() => setActiveSkill(null)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT COLUMN — Sticky terminal */}
                        <TerminalPanel activeSkill={activeSkill} />
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
