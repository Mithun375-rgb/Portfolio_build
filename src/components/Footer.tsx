import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/[0.08] py-8 bg-white dark:bg-[#07080c] relative z-10 mt-16 transition-colors duration-200">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
          <span className="text-slate-900 dark:text-white font-semibold">{PORTFOLIO_DATA.profile.name.toUpperCase()}</span>
          <span>· B.Tech AIML ({PORTFOLIO_DATA.profile.university})</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
          >
            github.com/{PORTFOLIO_DATA.profile.githubUsername}
          </a>
          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PORTFOLIO_DATA.profile.vercelPortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
          >
            vercel.app
          </a>
        </div>

        <div>© 2025 {PORTFOLIO_DATA.profile.name}. All rights reserved.</div>
      </div>
    </footer>
  );
};
