import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { MilestonesSection } from './components/MilestonesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDemoModal } from './components/ProjectDemoModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [selectedDemoProject, setSelectedDemoProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  
  // Default to light theme as explicitly requested
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('mithun_portfolio_theme');
    if (saved) return saved === 'dark';
    return false; // default light theme
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mithun_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mithun_portfolio_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenDemo = (projectId: string) => {
    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (proj) {
      setSelectedDemoProject(proj);
    }
  };

  const handleCloseDemo = () => {
    setSelectedDemoProject(null);
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-[#090a0f] text-[#0f172a] dark:text-[#e6edf3] font-body-md antialiased selection:bg-cyan-500 selection:text-black relative overflow-x-hidden min-h-screen transition-colors duration-200">
      {/* ================= DYNAMIC HIGH-TECH AMBIENT BACKGROUND THEME ================= */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Cybernetic Ambient Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.35]"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(0, 240, 255, 0.18) 1.2px, transparent 1.2px)'
              : 'radial-gradient(rgba(0, 150, 180, 0.22) 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Linear Tech Grid Lines (Ultra subtle) */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />

        {/* Glowing Luminous Color Orbs (Mesh Gradient) */}
        {/* Top Cyan Halo behind Hero */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-b from-cyan-500/15 via-blue-500/10 to-transparent dark:from-cyan-500/20 dark:via-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
        {/* Mid Purple Glow behind Projects */}
        <div className="absolute top-[36rem] -right-32 w-[650px] h-[650px] bg-purple-500/10 dark:bg-purple-600/15 blur-[160px] rounded-full pointer-events-none" />
        {/* Mid Cyan Accent behind Skills */}
        <div className="absolute top-[85rem] -left-32 w-[600px] h-[600px] bg-cyan-400/10 dark:bg-cyan-400/12 blur-[150px] rounded-full pointer-events-none" />
        {/* Emerald Glow behind Experience & Contact */}
        <div className="absolute bottom-24 right-1/4 w-[700px] h-[450px] bg-emerald-500/8 dark:bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="w-full pt-20 relative">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-10 flex flex-col gap-28">
          <HeroSection
            onOpenDemo={handleOpenDemo}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          <AboutSection />

          <SkillsSection />

          <ProjectsSection onOpenDemo={handleOpenDemo} />

          <MilestonesSection />

          <ContactSection />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* INTERACTIVE DEMOS MODAL */}
      <ProjectDemoModal project={selectedDemoProject} onClose={handleCloseDemo} />

      {/* RESUME / CV MODAL */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
