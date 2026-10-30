import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Code, CheckCircle } from 'lucide-react';

export const MilestonesSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-6" id="experience">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono-code text-xs text-cyan-600 dark:text-cyan-400 font-bold">04 // CHRONOLOGY</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display-hero">
            Experience & Milestones
          </h2>
        </div>
        <span className="text-xs font-mono-code text-slate-500 dark:text-gray-400">2023 — 2025</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.milestones.map((milestone, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between gap-5 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono-code font-bold ${
                    idx === 0 ? 'text-cyan-700 dark:text-cyan-300' : 'text-purple-700 dark:text-purple-300'
                  }`}
                >
                  {milestone.period}
                </span>
                <span className="text-xs font-mono-code text-slate-500 dark:text-gray-400">{milestone.badge}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display-hero">{milestone.title}</h3>
                <div className="text-xs font-mono-code text-cyan-700 dark:text-cyan-400 mt-0.5 font-medium">
                  {milestone.organization}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
                {milestone.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-white/[0.06]">
                {milestone.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono-code text-slate-500 dark:text-gray-400 flex items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-white/[0.06]">
              {idx === 0 ? (
                <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              ) : (
                <Code className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              )}
              <span>{idx === 0 ? 'Semester 3 Undergraduate · REVA Campus' : 'Python · yfinance · Scikit-Learn · React 18'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
