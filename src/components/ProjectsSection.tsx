import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowRight,
  Cpu,
  ShoppingBag,
  Zap,
} from 'lucide-react';

interface ProjectsSectionProps {
  onOpenDemo: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDemo }) => {
  const [filter, setFilter] = useState<'all' | 'ml' | 'web' | 'iot'>('all');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const featuredProject = PORTFOLIO_DATA.projects.find((p) => p.featured);

  return (
    <section className="flex flex-col gap-6" id="projects">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono-code text-xs text-cyan-600 dark:text-cyan-400 font-bold">03 // ARTIFACTS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display-hero">
            Shipped Projects
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#12141c]/80 border border-slate-200 dark:border-white/[0.08] rounded-xl self-start sm:self-auto shadow-inner">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-mono-code rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-black font-semibold shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All (5)
          </button>
          <button
            onClick={() => setFilter('ml')}
            className={`px-3 py-1 text-xs font-mono-code rounded-lg transition-all cursor-pointer ${
              filter === 'ml'
                ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-black font-semibold shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AI & Machine Learning
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-3 py-1 text-xs font-mono-code rounded-lg transition-all cursor-pointer ${
              filter === 'web'
                ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-black font-semibold shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Web Engineering
          </button>
          <button
            onClick={() => setFilter('iot')}
            className={`px-3 py-1 text-xs font-mono-code rounded-lg transition-all cursor-pointer ${
              filter === 'iot'
                ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-black font-semibold shadow-xs'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            IoT & Embedded
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* STANDOUT FEATURED BENTO CARD: Stock Market Intelligence Platform */}
        {featuredProject && (filter === 'all' || filter === 'ml') && (
          <div className="lg:col-span-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-50/70 via-white to-slate-50 border border-cyan-400/50 shadow-[0_8px_30px_rgba(0,173,184,0.08)] dark:from-[#121624] dark:via-[#10141f] dark:to-[#0c0f17] dark:border-cyan-500/40 dark:shadow-[0_8px_36px_rgba(0,240,255,0.12)] flex flex-col gap-6 relative overflow-hidden transition-all hover:border-cyan-500">
            {/* Ambient Cyan Glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                    PROJECT // 01 · FEATURED
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                  <span className="font-mono-code text-xs text-purple-700 dark:text-purple-400 font-medium">
                    MACHINE LEARNING · QUANTITATIVE FINANCE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono-code font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  <span>{featuredProject.status}</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pt-1">
                <div className="max-w-3xl flex flex-col gap-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-display-hero">
                    {featuredProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
                    {featuredProject.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                  <button
                    onClick={() => onOpenDemo(featuredProject.id)}
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,173,184,0.3)] dark:shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Launch ML Studio</span>
                  </button>
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:border-white/10 dark:text-white font-medium text-xs font-mono-code flex items-center gap-1.5 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono-code text-cyan-800 dark:text-cyan-300 font-medium shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Telemetry / Model Metrics Panel */}
            <div className="rounded-xl bg-slate-50/90 dark:bg-[#080a10]/90 border border-slate-200 dark:border-white/[0.08] p-4 flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-600 dark:text-gray-400">
                <span className="text-cyan-700 dark:text-cyan-400 font-semibold">// QUANT_INFERENCE_ENGINE · LIVE METRICS</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">SIGNAL ACCURACY: 84.6%</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05] flex flex-col shadow-xs">
                  <span className="text-[11px] font-mono-code text-slate-500 dark:text-gray-400">Backtested Accuracy</span>
                  <span className="text-sm font-mono-code text-emerald-600 dark:text-emerald-400 font-bold">84.6%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05] flex flex-col shadow-xs">
                  <span className="text-[11px] font-mono-code text-slate-500 dark:text-gray-400">Query Latency</span>
                  <span className="text-sm font-mono-code text-cyan-700 dark:text-cyan-400 font-bold">&lt; 240ms</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05] flex flex-col shadow-xs">
                  <span className="text-[11px] font-mono-code text-slate-500 dark:text-gray-400">Prediction Engine</span>
                  <span className="text-sm font-mono-code text-slate-900 dark:text-white font-semibold">Random Forest + MA</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05] flex flex-col shadow-xs">
                  <span className="text-[11px] font-mono-code text-slate-500 dark:text-gray-400">Live Indicator</span>
                  <span className="text-sm font-mono-code text-emerald-600 dark:text-emerald-400 font-bold">
                    BUY (Confidence: 87%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 2: IoT Smart Water Management */}
        {filteredProjects.some((p) => p.id === 'iot-water') && (
          <div className="lg:col-span-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-6 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                  PROJECT // 02 · EMBEDDED AUTOMATION
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono-code font-medium">
                  Prototype Deployed
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="max-w-3xl flex flex-col gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display-hero">
                    IoT Smart Water Management System
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
                    Real-time automated water level and flow monitoring system preventing overflow and dry-run pump
                    hazards. Integrates ultrasound depth telemetry and turbidity quality assessment for pure municipal
                    distribution. Automated 5V relay switching triggers fail-safe pump actuation with zero manual
                    intervention.
                  </p>
                </div>

                <button
                  onClick={() => onOpenDemo('iot-water')}
                  className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 dark:text-emerald-300 dark:border-emerald-500/40 font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Launch IoT Simulator</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['ESP32 MCU', 'HC-SR04 Ultrasonic', 'YF-S201 Flow Meter', 'Turbidity Sensor', '5V Relay Module', 'Embedded C/C++'].map(
                  (tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-mono-code text-slate-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Hardware metrics strip */}
            <div className="rounded-xl bg-slate-50 dark:bg-[#080a10] border border-slate-200/80 dark:border-white/[0.06] p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono-code">
              <div>
                <span className="text-slate-500 dark:text-gray-500 block">Depth Delta</span>
                <span className="text-slate-900 dark:text-white font-semibold">2.4cm / ±0.1</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-gray-500 block">Flow Rate</span>
                <span className="text-slate-900 dark:text-white font-semibold">14.2 L/min</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-gray-500 block">Turbidity NTU</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-semibold">&lt; 3.2 (Clean)</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-gray-500 block">Relay State</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">CLOSED (Safe)</span>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 3: Personal Developer Portfolio (Col 6) */}
        {filteredProjects.some((p) => p.id === 'personal-portfolio') && (
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs text-cyan-700 dark:text-cyan-400 font-semibold">PROJECT // 03</span>
                <a
                  href={PORTFOLIO_DATA.profile.vercelPortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display-hero">Personal Developer Portfolio</h3>
              <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
                High-performance minimalist developer portfolio engineered with sleek dark/light aesthetics and fluid
                micro-interactions. Fully responsive cross-device layout adhering strictly to modern a11y accessibility
                standards and semantic HTML. Continuously deployed on Vercel at my live link.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['HTML5', 'CSS3', 'JavaScript', 'Vercel Deploy'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-mono-code text-slate-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={PORTFOLIO_DATA.profile.vercelPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 dark:text-cyan-300 text-xs font-mono-code flex items-center gap-1.5 transition-all border border-cyan-200 dark:border-cyan-500/30 shadow-xs"
              >
                <span>Visit Live Vercel Link</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => onOpenDemo('personal-portfolio')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-300 text-xs font-mono-code transition-colors cursor-pointer border border-slate-200/80 dark:border-transparent"
              >
                Architecture
              </button>
            </div>
          </div>
        )}

        {/* PROJECT 4: FinDrive 2.0 (Col 6) */}
        {filteredProjects.some((p) => p.id === 'findrive') && (
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs text-purple-700 dark:text-purple-400 font-semibold">PROJECT // 04 · FINTECH</span>
                <span className="text-xs font-mono-code text-slate-500 dark:text-gray-500">REACT 18</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display-hero">
                FinDrive 2.0 (Student Finance Intelligence)
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
                Comprehensive financial management platform designed for college students featuring automated 50/30/20
                budget allocations. Built-in scholarship matching radar and interactive Kanban board to track grant
                deadlines. Powered by Supabase cloud database with secure authentication.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['React 18', 'TypeScript', 'Tailwind CSS', 'Supabase'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-mono-code text-slate-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onOpenDemo('findrive')}
                className="px-3.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:hover:bg-purple-500/30 dark:text-purple-300 text-xs font-mono-code flex items-center gap-1.5 transition-all border border-purple-200 dark:border-purple-500/30 cursor-pointer shadow-xs"
              >
                <span>Launch 50/30/20 Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-300 text-xs font-mono-code transition-colors flex items-center gap-1 border border-slate-200/80 dark:border-transparent"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        )}

        {/* PROJECT 5: Freshkart (Col 12) */}
        {filteredProjects.some((p) => p.id === 'freshkart') && (
          <div className="lg:col-span-12 p-6 md:p-7 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-4 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-xs text-cyan-700 dark:text-cyan-400 font-semibold">PROJECT // 05 · E-COMMERCE</span>
              <span className="text-xs font-mono-code text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Sub-8ms State Latency</span>
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="max-w-3xl flex flex-col gap-1.5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display-hero">
                  Freshkart (Grocery Delivery Application)
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-body-md">
                  High-speed grocery delivery e-commerce platform delivering instant catalog discovery and frictionless
                  checkout flows. Dynamic category filtering and real-time cart state management with persistent LocalStorage
                  session synchronization.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenDemo('freshkart')}
                  className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 dark:text-emerald-300 dark:border-emerald-500/40 text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer font-semibold shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Launch Store Simulator</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript ES6+', 'Tailwind CSS', 'LocalStorage Store'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-mono-code text-slate-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
