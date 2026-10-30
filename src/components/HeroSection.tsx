import React from 'react';
import { ArrowDown, Mail, Github, Linkedin, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { InteractiveCodeTerminal } from './InteractiveCodeTerminal';

interface HeroSectionProps {
  onOpenDemo: (demoId: string) => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onOpenResume }) => {
  return (
    <section className="flex flex-col gap-8 pt-4" id="overview">
      {/* Availability Status Pill */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#12151f]/80 backdrop-blur-md border border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_2px_12px_rgba(0,173,184,0.15)] dark:shadow-[0_0_15px_rgba(0,240,255,0.15)] self-start">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono-code text-xs uppercase tracking-wider text-cyan-800 dark:text-cyan-200 font-semibold">
          {PORTFOLIO_DATA.profile.availability}
        </span>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Headings & Intro */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.12] tracking-tight text-slate-900 dark:text-white">
            Engineering{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-purple-600 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400 bg-clip-text text-transparent">
              Intelligent Systems
            </span>{' '}
            & Modern Web Experiences
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
            <strong className="text-slate-900 dark:text-white font-semibold">Mithun T</strong> — 3rd Semester B.Tech in
            Artificial Intelligence & Machine Learning at{' '}
            <span className="text-cyan-600 dark:text-cyan-300 font-medium">REVA University, Bengaluru</span>. Fusing quantitative
            machine learning models with high-performance React 18, TypeScript & Python system engineering.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 font-semibold text-sm flex items-center gap-2 transition-all shadow-[0_4px_16px_rgba(15,23,42,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenDemo('stock-ml')}
              className="px-5 py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Live ML Demo</span>
            </button>

            <a
              href="#contact"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:border-white/10 dark:text-white font-medium text-sm flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block mx-1"></div>

            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 dark:bg-[#11141c] dark:border-white/10 dark:hover:border-cyan-500/40 dark:text-gray-300 dark:hover:text-white flex items-center gap-1.5 transition-all text-xs font-mono-code shadow-xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 dark:bg-[#11141c] dark:border-white/10 dark:hover:border-purple-500/40 dark:text-gray-300 dark:hover:text-white flex items-center gap-1.5 transition-all text-xs font-mono-code shadow-xs"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right: Interactive Code & Terminal Simulator */}
        <div className="lg:col-span-6 w-full">
          <InteractiveCodeTerminal onOpenDemo={onOpenDemo} onOpenResume={onOpenResume} />
        </div>
      </div>

      {/* 3 Core Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {PORTFOLIO_DATA.telemetry.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/90 dark:bg-[#11131c]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-1 shadow-sm hover:border-slate-300 dark:hover:border-white/15 transition-all"
          >
            <span
              className={`font-mono-code text-[11px] uppercase font-semibold ${
                item.color === 'cyan'
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : item.color === 'emerald'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-purple-600 dark:text-purple-400'
              }`}
            >
              {item.label}
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white font-display-hero">{item.value}</span>
            <span className="text-xs text-slate-500 dark:text-gray-400 font-mono-code">{item.subtext}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
