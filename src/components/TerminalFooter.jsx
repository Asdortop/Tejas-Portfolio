import { Github, Linkedin, Mail } from 'lucide-react';

const LINKS = [
    {
        icon: Linkedin,
        label: '> ./connect --network linkedin',
        href: 'https://www.linkedin.com/in/tejas-guduru/',
    },
    {
        icon: Github,
        label: '> ./connect --network github',
        href: 'https://github.com/Asdortop',
    },
    {
        icon: Mail,
        label: '> ./send_packet --dest email',
        href: 'mailto:tejasnarayanaguduru@gmail.com',
    },
];

export default function TerminalFooter() {
    return (
        <footer className="w-full border-t-2 border-pink-500/40 bg-[#05050A] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto font-mono text-sm md:text-base">

                {/* ── LEFT: Connection Terminal ── */}
                <div>
                    <p className="text-green-400 mb-6 font-bold tracking-wider">
                        // ESTABLISH_CONNECTION
                    </p>

                    <div className="flex flex-col gap-5">
                        {LINKS.map(({ icon: Icon, label, href }) => (
                            <a
                                key={href}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 text-slate-400 no-underline transition-all duration-300"
                            >
                                <Icon
                                    size={15}
                                    strokeWidth={1.8}
                                    className="transition-all duration-300 group-hover:text-cyan-400 group-hover:[filter:drop-shadow(0_0_6px_#00FFFF)] flex-shrink-0"
                                />
                                <span className="transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-2 group-hover:[text-shadow:0_0_10px_rgba(0,255,255,0.7)]">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: System Status & Log ── */}
                <div className="flex flex-col md:items-end gap-4">

                    {/* Status badges */}
                    <span className="bg-pink-500/10 text-pink-500 px-3 py-1 border border-pink-500/30 tracking-widest text-xs font-bold w-fit">
                        [NODE: HYDERABAD_IN]
                    </span>
                    <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 border border-cyan-500/30 tracking-widest text-xs font-bold w-fit">
                        [STATUS: SYSTEM_OPTIMAL]
                    </span>

                    {/* Build log */}
                    <div className="text-slate-500 mt-6 text-xs md:text-sm md:text-right text-left leading-relaxed tracking-wide">
                        <p>Compiled with React &amp; Tailwind CSS</p>
                        <p>© 2026 Tejas Guduru // VNRVJIET.sys</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
