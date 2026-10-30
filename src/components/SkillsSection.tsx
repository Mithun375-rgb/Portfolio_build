import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code2, Globe, Cpu, Server, Search } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (index: string) => {
    switch (index) {
      case '01':
        return <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case '02':
        return <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case '03':
        return <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case '04':
        return <Server className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  const filteredCategories = PORTFOLIO_DATA.skillCategories.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const lower = searchQuery.toLowerCase();
    const matchingSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(lower) ||
        s.detail.toLowerCase().includes(lower)
    );
    return {
      ...cat,
      skills: matchingSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section className="flex flex-col gap-6" id="skills">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono-code text-xs text-cyan-600 dark:text-cyan-400 font-bold">02 // CAPABILITIES</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display-hero">
            Technical Skills Matrix
          </h2>
        </div>

        {/* Search Skill Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. Python, React)..."
              className="pl-8 pr-3 py-1.5 text-xs font-mono-code bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 w-56 shadow-xs"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono-code text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCategories.map((category) => (
          <div
            key={category.index}
            className="p-5 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category.index)}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display-hero">
                    {category.title}
                  </h3>
                </div>
                <span className="font-mono-code text-xs text-slate-400 dark:text-gray-500">{category.index}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-body-md min-h-[32px]">
                {category.description}
              </p>
            </div>

            {/* Skill Items */}
            <div className="space-y-2 pt-2">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.05] transition-colors flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-900 dark:text-white">{skill.name}</span>
                    <span className="text-[11px] font-mono-code text-cyan-700 dark:text-cyan-300 font-semibold">
                      {skill.proficiency}%
                    </span>
                  </div>
                  {/* Proficiency Bar */}
                  <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${skill.proficiency}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        category.index === '01'
                          ? 'bg-cyan-500'
                          : category.index === '02'
                          ? 'bg-purple-500'
                          : category.index === '03'
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                    />
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-500 dark:text-gray-400 truncate">
                    {skill.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
