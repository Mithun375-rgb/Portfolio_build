import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const md = `# MITHUN T
Undergraduate Engineer — B.Tech in Artificial Intelligence & Machine Learning (3rd Sem)
REVA University, Bengaluru, Karnataka, India
Email: ${PORTFOLIO_DATA.profile.email}
GitHub: ${PORTFOLIO_DATA.profile.github}
LinkedIn: ${PORTFOLIO_DATA.profile.linkedin}
Portfolio: ${PORTFOLIO_DATA.profile.vercelPortfolio}

## EDUCATION
B.Tech in Artificial Intelligence & Machine Learning (2023 — 2027)
REVA University, Bengaluru
Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (C/Python), Linear Algebra for ML, Discrete Mathematics, Database Management Systems.

## TECHNICAL SKILLS
- Languages: C, Python 3, TypeScript, JavaScript (ES6+), Embedded C/C++
- Machine Learning & Data: yfinance, Scikit-Learn (Random Forest, Classification), Pandas, NumPy, Matplotlib
- Web Engineering: React 18, Vite, Tailwind CSS, REST APIs, HTML5/CSS3
- Hardware & IoT: ESP32 Microcontroller, HC-SR04 Ultrasonic Telemetry, Flow Sensors (YF-S201), 5V Relay Actuation

## FEATURED PROJECTS
1. Stock Market Intelligence Platform (Python, yfinance, Scikit-Learn, Pandas)
   - Real-time stock status analytics and ML forecasting with 84.6% backtested accuracy and <240ms latency.
2. IoT Smart Water Management System (ESP32, HC-SR04, Flow Meter, Embedded C++)
   - Automated depth ultrasound sensing with fail-safe relay pump actuation preventing dry-run and overflow.
3. FinDrive 2.0 — Student Financial Intelligence (React 18, TypeScript, Tailwind, Supabase)
   - Automated 50/30/20 budget calculations and interactive grant/scholarship pipeline radar.
4. Freshkart — Grocery Delivery Client (React, JavaScript, LocalStorage)
   - High-speed catalog discovery with sub-8ms state latency and persistent cart state.
5. Personal Developer Portfolio (HTML5, CSS3, JS, Vercel)
   - 100/100 Lighthouse score portfolio continuously deployed on Vercel.
`;
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0e15] border border-slate-200 dark:border-cyan-500/30 shadow-2xl dark:shadow-[0_16px_60px_rgba(0,240,255,0.15)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#111420] border-b border-slate-200 dark:border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono-code">Curriculum Vitae · Mithun T</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10 text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-gray-200 text-xs sm:text-sm font-body-md leading-relaxed">
          {/* Header Contact Block */}
          <div className="border-b border-slate-200 dark:border-white/[0.08] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-mono-code">MITHUN T</h1>
              <p className="text-cyan-700 dark:text-cyan-300 font-mono-code text-xs mt-1 font-semibold">
                B.Tech Artificial Intelligence & Machine Learning (3rd Semester)
              </p>
              <p className="text-slate-500 dark:text-gray-400 text-xs">REVA University, Bengaluru, Karnataka, India</p>
            </div>

            <div className="flex flex-col gap-1 text-xs font-mono-code text-slate-600 dark:text-gray-300 text-left sm:text-right">
              <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-cyan-700 dark:text-cyan-400 hover:underline">
                {PORTFOLIO_DATA.profile.email}
              </a>
              <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
                github.com/{PORTFOLIO_DATA.profile.githubUsername}
              </a>
              <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
                linkedin.com/in/{PORTFOLIO_DATA.profile.linkedinUsername}
              </a>
              <a href={PORTFOLIO_DATA.profile.vercelPortfolio} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                vercel.app
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-white/[0.06] pb-1">
              Education
            </h2>
            <div className="flex justify-between items-baseline">
              <div>
                <strong className="text-slate-900 dark:text-white text-sm">REVA University, Bengaluru</strong>
                <div className="text-xs text-slate-600 dark:text-gray-300">Bachelor of Technology in Artificial Intelligence & Machine Learning</div>
              </div>
              <span className="text-xs font-mono-code text-slate-500 dark:text-gray-400">2023 — 2027 (Current: 3rd Sem)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 pt-1">
              Core Coursework: Data Structures & Algorithms (C), Object-Oriented Programming, Linear Algebra & Probability for ML, Discrete Mathematical Structures, Database Management Systems.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-white/[0.06] pb-1">
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                <strong className="text-slate-900 dark:text-white font-mono-code block text-xs">Languages & Foundations:</strong>
                <span className="text-slate-600 dark:text-gray-300">C (Pointers & Structs), Python 3, TypeScript, JavaScript ES6+</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                <strong className="text-slate-900 dark:text-white font-mono-code block text-xs">Data Science & ML:</strong>
                <span className="text-slate-600 dark:text-gray-300">yfinance API, Scikit-Learn (Random Forest, Classification), Pandas, NumPy</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                <strong className="text-slate-900 dark:text-white font-mono-code block text-xs">Web Engineering:</strong>
                <span className="text-slate-600 dark:text-gray-300">React 18, Vite, Tailwind CSS, Supabase, RESTful APIs, LocalStorage</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                <strong className="text-slate-900 dark:text-white font-mono-code block text-xs">Hardware & Systems:</strong>
                <span className="text-slate-600 dark:text-gray-300">ESP32 MCU, HC-SR04 Ultrasound, Flow Meters, 5V Relays, Embedded C++</span>
              </div>
            </div>
          </div>

          {/* Shipped Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-purple-700 dark:text-purple-400 border-b border-slate-200 dark:border-white/[0.06] pb-1">
              Engineering Deliverables
            </h2>
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white text-xs font-mono-code">{proj.title}</strong>
                    <span className="text-[10px] font-mono-code text-cyan-700 dark:text-cyan-300 font-medium">[{proj.techStack.slice(0, 3).join(', ')}]</span>
                  </div>
                  <span className="text-[11px] font-mono-code text-slate-500">{proj.status}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-gray-300">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-[#090b10] border-t border-slate-200 dark:border-white/[0.08] text-xs font-mono-code text-slate-500 dark:text-gray-400 shrink-0">
          <span>Active for Summer 2025 Internship Opportunities</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
