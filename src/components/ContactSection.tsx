import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Send, CheckCircle2, Copy, Check, ExternalLink, MapPin, Loader2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Summer 2025 Internship Opportunity',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Summer 2025 Internship Opportunity',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }, 750);
  };

  return (
    <section className="flex flex-col gap-6" id="contact">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono-code text-xs text-cyan-600 dark:text-cyan-400 font-bold">05 // TRANSMISSION</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display-hero">Get in Touch</h2>
        </div>
        <span className="text-xs font-mono-code text-cyan-700 dark:text-cyan-400 font-semibold">DIRECT ENCRYPTED CHANNEL</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-5 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display-hero">
                Let's build something intelligent.
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 pt-1 leading-relaxed font-body-md">
                Open for Summer 2025 internship offers, collaborative machine learning research, and engineering initiatives.
              </p>
            </div>

            {/* Direct Email Copy Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090b10] border border-slate-200 dark:border-white/[0.06] flex flex-col gap-1.5">
              <span className="text-[10px] font-mono-code text-slate-500 dark:text-gray-400 uppercase">DIRECT EMAIL</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-cyan-700 dark:text-cyan-300 font-medium select-all">
                  {PORTFOLIO_DATA.profile.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-mono-code text-slate-800 dark:text-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Quick Links */}
            <div className="flex flex-col gap-2">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs transition-colors group"
              >
                <span className="text-slate-800 dark:text-gray-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 font-mono-code">
                  GitHub: @{PORTFOLIO_DATA.profile.githubUsername}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs transition-colors group"
              >
                <span className="text-slate-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 font-mono-code">
                  LinkedIn: /in/{PORTFOLIO_DATA.profile.linkedinUsername}/
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-300" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.vercelPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs transition-colors group"
              >
                <span className="text-slate-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 font-mono-code">
                  Live Portfolio: vercel.app
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
              </a>
            </div>

            <div className="text-xs font-mono-code text-slate-500 dark:text-gray-500 flex items-center gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Bengaluru, Karnataka, India · REVA Campus</span>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-white dark:bg-[#11141d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-sm">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono-code text-slate-600 dark:text-gray-400 font-medium">YOUR NAME *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090b10] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-cyan-500 transition-colors shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono-code text-slate-600 dark:text-gray-400 font-medium">EMAIL ADDRESS *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090b10] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-cyan-500 transition-colors shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono-code text-slate-600 dark:text-gray-400 font-medium">INQUIRY SUBJECT</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090b10] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-sm outline-none focus:border-cyan-500 transition-colors cursor-pointer shadow-inner"
              >
                <option value="Summer 2025 Internship Opportunity">Summer 2025 Internship Opportunity</option>
                <option value="Collaborative AI/ML Project">Collaborative AI/ML Project</option>
                <option value="Technical Discussion">Technical Discussion</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono-code text-slate-600 dark:text-gray-400 font-medium">MESSAGE *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share project scope or requirements..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090b10] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-cyan-500 transition-colors resize-none shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono-code text-slate-500">Transmissions encrypted</span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,173,184,0.3)] dark:shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Success Banner */}
          {isSubmitted && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono-code flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Message logged successfully. Mithun T will follow up promptly.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
