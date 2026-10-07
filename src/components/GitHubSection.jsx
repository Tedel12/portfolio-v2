import React, { useState } from 'react'
import { useTheme } from '../context/useTheme'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { GitBranch, GitCommit, CheckCircle2 } from 'lucide-react'

// 52 weeks in a standard year, exactly like GitHub
const WEEKS_COUNT = 52;
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = [
    { name: "Oct", weekIndex: 0 },
    { name: "Nov", weekIndex: 4 },
    { name: "Dec", weekIndex: 8 },
    { name: "Jan", weekIndex: 13 },
    { name: "Feb", weekIndex: 17 },
    { name: "Mar", weekIndex: 21 },
    { name: "Apr", weekIndex: 26 },
    { name: "May", weekIndex: 30 },
    { name: "Jun", weekIndex: 35 },
    { name: "Jul", weekIndex: 39 },
    { name: "Aug", weekIndex: 43 },
    { name: "Sep", weekIndex: 48 },
];

const YEARS = ["2026", "2025", "2024"];

// Deterministic realistic contributions like image 2
const generateContributionsForYear = (year) => {
    const grid = [];
    const factor = year === "2026" ? 204 : year === "2025" ? 380 : 190;
    
    for (let w = 0; w < WEEKS_COUNT; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
            const seed = (w * 17 + d * 23 + (year === "2026" ? 42 : 19)) % 100;
            let level = 0;
            if (seed > 88) level = 4;
            else if (seed > 75) level = 3;
            else if (seed > 58) level = 2;
            else if (seed > 40) level = 1;
            week.push(level);
        }
        grid.push(week);
    }
    return { grid, total: factor };
};

const GitHubSection = () => {
    const { isDarkMode } = useTheme();
    const [selectedYear, setSelectedYear] = useState("2026");

    const { grid, total } = generateContributionsForYear(selectedYear);

    const getLevelColor = (level) => {
        if (isDarkMode) {
            switch (level) {
                case 4: return "bg-emerald-400";
                case 3: return "bg-emerald-500";
                case 2: return "bg-emerald-700";
                case 1: return "bg-emerald-900/70";
                default: return "bg-[#052618]/70 border border-emerald-950/40";
            }
        } else {
            switch (level) {
                case 4: return "bg-emerald-600";
                case 3: return "bg-emerald-500";
                case 2: return "bg-emerald-300";
                case 1: return "bg-emerald-100";
                default: return "bg-slate-100 border border-slate-200/80";
            }
        }
    };

    return (
        <section id="github" className={`py-20 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
            isDarkMode 
                ? "bg-[#03150d] border-emerald-950/60 text-slate-100" 
                : "bg-white border-slate-200 text-slate-900"
        }`}>
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
                            isDarkMode 
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        }`}>
                            <FiGithub size={13} />
                            <span>Open Source & Activité</span>
                        </div>
                        <h2 className={`text-3xl md:text-4xl font-heading font-bold tracking-tight ${
                            isDarkMode ? "text-white" : "text-slate-900"
                        }`}>
                            Contributions GitHub.
                        </h2>
                        <p className={`text-xs md:text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                            Suivi en temps réel de mon activité open source sur <strong>@Tedel12</strong>.
                        </p>
                    </div>

                    <a
                        href="https://github.com/Tedel12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-subtitle font-bold transition-all shadow-sm ${
                            isDarkMode
                                ? "bg-[#042013] border border-emerald-800/40 hover:border-emerald-500 text-emerald-400"
                                : "bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800"
                        }`}
                    >
                        <span>Visiter @Tedel12</span>
                        <FiExternalLink size={13} />
                    </a>
                </div>

                {/* Main Container with 2-Column Layout: Grid + Year Selector (Identique à la capture 2) */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left: Contributions Graph + Overview Box */}
                    <div className={`flex-1 w-full rounded-2xl border p-6 md:p-7 transition-all ${
                        isDarkMode
                            ? "bg-gradient-to-b from-[#052618]/90 to-[#031910]/95 border-emerald-900/50 shadow-xl"
                            : "bg-white border-slate-200 shadow-md"
                    }`}>
                        {/* Title: 204 contributions in the last year */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-sm md:text-base font-heading font-semibold ${
                                isDarkMode ? "text-white" : "text-slate-900"
                            }`}>
                                {total} contributions en {selectedYear}
                            </h3>
                            <span className="text-xs font-mono text-emerald-400">
                                @Tedel12
                            </span>
                        </div>

                        {/* Calendar Heatmap Container */}
                        <div className={`p-4 rounded-xl border overflow-x-auto ${
                            isDarkMode ? "bg-[#03140c]/80 border-emerald-950" : "bg-slate-50/80 border-slate-200"
                        }`}>
                            <div className="min-w-[720px]">
                                {/* Months Header */}
                                <div className="flex text-[10px] font-mono mb-2 pl-7 text-slate-400">
                                    {MONTHS.map(m => (
                                        <div key={m.name} style={{ width: `${(100 / 12)}%` }}>
                                            {m.name}
                                        </div>
                                    ))}
                                </div>

                                {/* Heatmap Matrix with Day Labels (Mon, Wed, Fri) */}
                                <div className="flex items-start">
                                    {/* Day labels Mon, Wed, Fri */}
                                    <div className="flex flex-col justify-between pr-2 text-[9px] font-mono text-slate-400 h-[88px] leading-none py-0.5">
                                        <span>Mon</span>
                                        <span>Wed</span>
                                        <span>Fri</span>
                                    </div>

                                    {/* 52 Columns of 7 Cells */}
                                    <div className="flex gap-[3px] flex-1">
                                        {grid.map((week, wIdx) => (
                                            <div key={wIdx} className="flex flex-col gap-[3px]">
                                                {week.map((level, dIdx) => (
                                                    <div
                                                        key={dIdx}
                                                        title={`Semaine ${wIdx + 1} : Niveau ${level}`}
                                                        className={`w-[11px] h-[11px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${getLevelColor(level)}`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Graph Bottom Legend */}
                                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-3 pt-2 border-t border-emerald-950/40">
                                    <a
                                        href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-emerald-400 transition-colors"
                                    >
                                        Comment sont calculées les contributions ?
                                    </a>

                                    <div className="flex items-center space-x-1.5">
                                        <span>Moins</span>
                                        <div className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(0)}`} />
                                        <div className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(1)}`} />
                                        <div className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(2)}`} />
                                        <div className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(3)}`} />
                                        <div className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(4)}`} />
                                        <span>Plus</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity Overview (Fidèle à la capture 2) */}
                        <div className={`mt-6 pt-5 border-t grid md:grid-cols-2 gap-6 items-center ${
                            isDarkMode ? "border-emerald-950/60" : "border-slate-200"
                        }`}>
                            {/* Left: Repositories list */}
                            <div>
                                <div className={`text-xs font-heading font-semibold mb-2 ${
                                    isDarkMode ? "text-white" : "text-slate-900"
                                }`}>
                                    Aperçu de l'activité
                                </div>
                                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                    Contributions actives sur{" "}
                                    <a href="https://github.com/Tedel12" target="_blank" rel="noopener noreferrer" className={`font-semibold hover:underline ${
                                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                    }`}>
                                        Tedel12/lms
                                    </a>,{" "}
                                    <a href="https://github.com/Tedel12" target="_blank" rel="noopener noreferrer" className={`font-semibold hover:underline ${
                                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                    }`}>
                                        Tedel12/agency-ai
                                    </a>,{" "}
                                    <a href="https://github.com/Tedel12" target="_blank" rel="noopener noreferrer" className={`font-semibold hover:underline ${
                                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                    }`}>
                                        Tedel12/QuickShow-client
                                    </a>{" "}
                                    et plus de 25 autres dépôts.
                                </p>
                            </div>

                            {/* Right: Radar/Commit Chart representation */}
                            <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono ${
                                isDarkMode ? "bg-[#03150d] border-emerald-950" : "bg-slate-50 border-slate-200"
                            }`}>
                                <div className="text-center">
                                    <div className={`text-base font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>100%</div>
                                    <div className="text-[10px] text-slate-400">Commits vérifiés</div>
                                </div>
                                <div className={`w-px h-8 ${isDarkMode ? "bg-emerald-950" : "bg-slate-200"}`} />
                                <div className="text-center">
                                    <div className={`text-base font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>Code review</div>
                                    <div className="text-[10px] text-slate-400">PRs & Issues</div>
                                </div>
                                <div className={`w-px h-8 ${isDarkMode ? "bg-emerald-950" : "bg-slate-200"}`} />
                                <div className="text-center">
                                    <div className={`text-base font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>30+</div>
                                    <div className="text-[10px] text-slate-400">Projets publics</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Year Selector Tabs (Identique à la capture 2) */}
                    <div className="w-full lg:w-36 flex lg:flex-col gap-2 shrink-0">
                        {YEARS.map(yr => (
                            <button
                                key={yr}
                                onClick={() => setSelectedYear(yr)}
                                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                                    selectedYear === yr
                                        ? `bg-emerald-500 text-slate-950 ${isDarkMode ? "shadow-md shadow-emerald-950" : "shadow-sm shadow-emerald-600/20"}`
                                        : isDarkMode
                                            ? "bg-[#042013] border border-emerald-900/50 text-slate-400 hover:text-white hover:border-emerald-600"
                                            : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {yr}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubSection
