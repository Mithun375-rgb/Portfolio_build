import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Code, CheckCircle, Shield } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { StockPredictorDemo } from './demos/StockPredictorDemo';
import { IotWaterDemo } from './demos/IotWaterDemo';
import { FinDriveDemo } from './demos/FinDriveDemo';
import { FreshkartDemo } from './demos/FreshkartDemo';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0e15] border border-slate-200 dark:border-cyan-500/30 shadow-2xl dark:shadow-[0_16px_60px_rgba(0,240,255,0.15)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#111420] border-b border-slate-200 dark:border-white/[0.08] shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-400 font-mono-code font-bold text-xs">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono-code">{project.title}</h3>
                <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-mono-code">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 text-xs font-mono-code transition-all"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 text-xs font-mono-code transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Interactive Live Demo Container */}
          <div className="p-5 rounded-2xl bg-[#080910] text-gray-200 border border-slate-300/40 dark:border-white/[0.08] ring-1 ring-cyan-500/20 shadow-inner">
            {project.demoType === 'stock-ml' && <StockPredictorDemo />}
            {project.demoType === 'iot-water' && <IotWaterDemo />}
            {project.demoType === 'findrive' && <FinDriveDemo />}
            {project.demoType === 'freshkart' && <FreshkartDemo />}
            {project.demoType === 'portfolio' && (
              <div className="flex flex-col gap-4 text-gray-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono-code uppercase">
                      Personal Developer Portfolio Architecture
                    </h4>
                    <p className="text-xs text-gray-400">Continuous deployment on Vercel Edge Network</p>
                  </div>
                  <a
                    href="https://my-portfolio-umber-eta-0wcxcov9jd.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                  >
                    <span>Visit Live Vercel App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono-code text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] text-gray-500 block">LIGHTHOUSE PERFORMANCE</span>
                    <span className="text-lg font-bold text-emerald-400">100 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] text-gray-500 block">A11Y ACCESSIBILITY</span>
                    <span className="text-lg font-bold text-emerald-400">100 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] text-gray-500 block">BEST PRACTICES</span>
                    <span className="text-lg font-bold text-cyan-300">100 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] text-gray-500 block">FIRST CONTENTFUL PAINT</span>
                    <span className="text-lg font-bold text-purple-300">&lt; 0.4s</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-300 pt-1">
                  Engineered with semantic HTML5, zero render-blocking dependencies, and responsive dark aesthetics.
                  Demonstrates clean client-side performance, WCAG AA compliance, and high readability across desktop,
                  tablet, and mobile viewports.
                </p>
              </div>
            )}
          </div>

          {/* Deep Architectural Narrative */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-bold">
              Engineering Architecture & Problem Space
            </h4>
            <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Key Deliverables Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
              Key Shipped Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] flex items-start gap-2.5 text-xs text-slate-700 dark:text-gray-300"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack List */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold">
              Verified Technical Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono-code text-slate-800 dark:text-gray-200 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 dark:bg-[#090b10] border-t border-slate-200 dark:border-white/[0.08] text-xs font-mono-code text-slate-500 dark:text-gray-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Authored by Mithun T · REVA University AIML</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-medium transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
