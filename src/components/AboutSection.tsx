import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-6" id="about">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono-code text-xs text-cyan-600 dark:text-cyan-400 font-bold">01 // CONTEXT</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display-hero">
            Engineering Narrative
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-mono-code text-slate-600 dark:text-gray-400">
          BENGALURU, IN
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Narrative Card */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono-code text-xs text-cyan-700 dark:text-cyan-300">
                REVA University
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono-code text-xs text-emerald-700 dark:text-emerald-300">
                B.Tech AI & ML
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono-code text-xs text-purple-700 dark:text-purple-300">
                Mithun T
              </span>
            </div>

            <p className="text-base text-slate-700 dark:text-gray-200 leading-relaxed font-body-md">
              Currently in my{' '}
              <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                3rd Semester of B.Tech in Artificial Intelligence & Machine Learning
              </span>{' '}
              at REVA University, Bangalore. My work focuses on fusing rigorous mathematical foundations
              with actionable machine learning systems and modern high-velocity web interfaces.
            </p>

            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-body-md">
              Rather than treating data science and software engineering in silos, I connect algorithmic
              forecasting (e.g. real-time market prediction with{' '}
              <span className="text-slate-900 dark:text-white font-medium">Python & yfinance</span>) with responsive,
              low-latency client-side architectures in React 18, TypeScript, and Vite.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090b10] border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono-code text-slate-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">&gt;</span>
              <span>
                curr_status:{' '}
                <span className="text-slate-900 dark:text-white font-medium">"architecting ML pipelines & shipping responsive web tools"</span>
              </span>
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">SEM_03</span>
          </div>
        </div>

        {/* Right Coordinates Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between gap-5 shadow-sm">
          <div className="flex flex-col gap-3">
            <span className="font-mono-code text-xs text-slate-500 dark:text-gray-400 uppercase font-semibold">
              Academic Coordinates
            </span>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] flex flex-col">
                <span className="text-[11px] text-slate-500 dark:text-gray-400 font-mono-code">Candidate</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{PORTFOLIO_DATA.profile.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] flex flex-col">
                <span className="text-[11px] text-slate-500 dark:text-gray-400 font-mono-code">Institution</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{PORTFOLIO_DATA.profile.university}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] flex flex-col">
                <span className="text-[11px] text-slate-500 dark:text-gray-400 font-mono-code">Specialization</span>
                <span className="text-sm font-medium text-cyan-600 dark:text-cyan-300">{PORTFOLIO_DATA.profile.degree}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-between">
            <span className="text-xs font-mono-code text-cyan-800 dark:text-cyan-200 font-medium">Core Foundations</span>
            <span className="text-xs font-mono-code text-emerald-600 dark:text-emerald-400 font-semibold">DSA · OOP · ML</span>
          </div>
        </div>
      </div>
    </section>
  );
};
