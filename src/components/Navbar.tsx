import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, isDark, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }

      // Detect active section based on scroll offset
      const sections = ['overview', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const secEl = document.getElementById(sections[i]);
        if (secEl) {
          const rect = secEl.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Milestones' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* ================= SUBTLE HORIZONTAL SCROLL PROGRESS BAR AT TOP ================= */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-slate-200/50 dark:bg-black/30"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(0,173,184,0.6)] dark:shadow-[0_0_12px_rgba(0,240,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#090a0f]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-colors duration-200">
        {/* Synchronized rim accent */}
        <div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-cyan-500/70 via-teal-400/70 to-purple-500/70 dark:from-cyan-400/60 dark:via-teal-300/60 dark:to-purple-400/60 transition-all duration-150 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="h-16 max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title wordmark */}
          <a href="#overview" className="flex items-center gap-3 group whitespace-nowrap shrink-0">
            <div className="h-9 w-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-mono-code font-bold text-sm shadow-[0_0_12px_rgba(0,173,184,0.2)] dark:shadow-[0_0_12px_rgba(0,240,255,0.25)] group-hover:border-cyan-500 transition-all">
              MT
            </div>
            <div className="flex flex-col">
              <span className="font-mono-code text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Mithun T
              </span>
              <span className="font-mono-code text-[10px] text-slate-500 dark:text-gray-400">REVA University · AIML</span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-[#12141c]/80 border border-slate-200/80 dark:border-white/[0.08] px-2 py-1 rounded-full shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`px-3.5 py-1 text-xs rounded-full transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-semibold shadow-xs border border-slate-200 dark:border-white/10'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Social Outlets */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-gray-300 flex items-center justify-center transition-all cursor-pointer"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden lg:flex h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-gray-300 items-center gap-1.5 transition-all text-xs font-mono-code"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden lg:flex h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-gray-300 items-center gap-1.5 transition-all text-xs font-mono-code"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={onOpenResume}
              className="h-9 px-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,173,184,0.3)] dark:shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0c0e15] border-b border-slate-200 dark:border-white/10 px-6 py-4 flex flex-col gap-3 font-mono-code text-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition-colors ${
                  activeSection === link.id
                    ? 'text-cyan-600 dark:text-cyan-300 font-bold'
                    : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PORTFOLIO_DATA.profile.vercelPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 ml-auto"
              >
                <span>Vercel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
