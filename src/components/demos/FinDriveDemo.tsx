import React, { useState } from 'react';
import { DollarSign, PieChart, Award, Plus, Check } from 'lucide-react';

interface GrantItem {
  id: string;
  name: string;
  amount: string;
  deadline: string;
  status: 'Targeting' | 'Applied' | 'Awarded';
}

export const FinDriveDemo: React.FC = () => {
  const [monthlyStipend, setMonthlyStipend] = useState<number>(24000); // ₹ or $
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [grants, setGrants] = useState<GrantItem[]>([
    {
      id: '1',
      name: 'Karnataka State Post-Matric Tech Scholarship',
      amount: '₹35,000',
      deadline: 'Nov 20',
      status: 'Awarded',
    },
    {
      id: '2',
      name: 'Google AI Studio Research Grant',
      amount: '₹75,000',
      deadline: 'Dec 15',
      status: 'Applied',
    },
    {
      id: '3',
      name: 'REVA University Merit Fellowship',
      amount: '₹50,000',
      deadline: 'Jan 10',
      status: 'Targeting',
    },
  ]);

  const [newGrantName, setNewGrantName] = useState<string>('');

  // 50/30/20 breakdown
  const needs = Math.round(monthlyStipend * 0.5);
  const wants = Math.round(monthlyStipend * 0.3);
  const savings = Math.round(monthlyStipend * 0.2);

  const formatCurr = (val: number) => {
    return currency === 'INR' ? `₹${val.toLocaleString('en-IN')}` : `$${val.toLocaleString()}`;
  };

  const moveGrantStatus = (id: string) => {
    setGrants((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const nextStatus =
          g.status === 'Targeting' ? 'Applied' : g.status === 'Applied' ? 'Awarded' : 'Targeting';
        return { ...g, status: nextStatus };
      })
    );
  };

  const addGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrantName.trim()) return;
    setGrants((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newGrantName.trim(),
        amount: currency === 'INR' ? '₹40,000' : '$1,000',
        deadline: 'Upcoming',
        status: 'Targeting',
      },
    ]);
    setNewGrantName('');
  };

  return (
    <div className="flex flex-col gap-5 text-gray-200">
      {/* Header and Currency Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-purple-950/70 border border-purple-500/30 text-purple-400">
            <PieChart className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-code">
              FinDrive 2.0 Student Financial Engine
            </h4>
            <p className="text-xs text-gray-400">
              Automated 50/30/20 Budget Allocations • Grant Opportunity Kanban Radar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0a0d14] p-1 rounded-lg border border-white/10 text-xs font-mono-code">
          <button
            onClick={() => {
              setCurrency('INR');
              setMonthlyStipend(24000);
            }}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              currency === 'INR' ? 'bg-purple-500/30 text-purple-200 font-bold' : 'text-gray-400'
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => {
              setCurrency('USD');
              setMonthlyStipend(1800);
            }}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              currency === 'USD' ? 'bg-purple-500/30 text-purple-200 font-bold' : 'text-gray-400'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* 50/30/20 Engine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Interactive Budget Slider */}
        <div className="md:col-span-5 p-4 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono-code text-gray-400 uppercase">Monthly Income / Allowance</span>
            <div className="text-2xl font-bold font-mono-code text-white">
              {formatCurr(monthlyStipend)}
            </div>
            <p className="text-[11px] text-gray-500">Student stipends, internships, or campus allowances</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code text-gray-400">
              <span>Adjust Budget Basis:</span>
              <span className="text-purple-300 font-semibold">{formatCurr(monthlyStipend)}</span>
            </div>
            <input
              type="range"
              min={currency === 'INR' ? 8000 : 500}
              max={currency === 'INR' ? 100000 : 6000}
              step={currency === 'INR' ? 1000 : 50}
              value={monthlyStipend}
              onChange={(e) => setMonthlyStipend(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>

          {/* 3 Categories Breakdown */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs font-mono-code">
            {/* Needs 50% */}
            <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-cyan-400 font-semibold block">50% Needs</span>
                <span className="text-[10px] text-gray-400">Tuition, Hostel, Food, Commute</span>
              </div>
              <span className="text-sm font-bold text-white">{formatCurr(needs)}</span>
            </div>

            {/* Wants 30% */}
            <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 flex items-center justify-between">
              <div>
                <span className="text-purple-300 font-semibold block">30% Wants & R&D</span>
                <span className="text-[10px] text-gray-400">Tech gear, cloud servers, leisure</span>
              </div>
              <span className="text-sm font-bold text-white">{formatCurr(wants)}</span>
            </div>

            {/* Savings 20% */}
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <span className="text-emerald-400 font-semibold block">20% Emergency & Investments</span>
                <span className="text-[10px] text-gray-400">High-yield funds, emergency float</span>
              </div>
              <span className="text-sm font-bold text-white">{formatCurr(savings)}</span>
            </div>
          </div>
        </div>

        {/* Right: Scholarship & Grant Radar Kanban */}
        <div className="md:col-span-7 p-4 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono-code text-gray-300 font-bold uppercase">
                Grant & Scholarship Pipeline (Click card to advance)
              </span>
            </div>
            <span className="text-[11px] font-mono-code text-emerald-400">3 Tracked</span>
          </div>

          {/* Interactive Grant List */}
          <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1">
            {grants.map((grant) => (
              <div
                key={grant.id}
                onClick={() => moveGrantStatus(grant.id)}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between cursor-pointer transition-all hover:border-purple-500/30 group"
              >
                <div className="flex flex-col gap-0.5 max-w-[70%]">
                  <span className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {grant.name}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono-code text-gray-400">
                    <span className="text-cyan-300 font-medium">{grant.amount}</span>
                    <span>·</span>
                    <span>Deadline: {grant.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono-code font-bold ${
                      grant.status === 'Awarded'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : grant.status === 'Applied'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}
                  >
                    {grant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Form */}
          <form onSubmit={addGrant} className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
            <input
              type="text"
              value={newGrantName}
              onChange={(e) => setNewGrantName(e.target.value)}
              placeholder="Track new scholarship or hackathon grant..."
              className="flex-1 px-3 py-1.5 text-xs font-mono-code bg-[#06080e] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-mono-code flex items-center gap-1 cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
