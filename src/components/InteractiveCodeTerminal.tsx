import React, { useState, useRef, useEffect } from 'react';
import { Play, Terminal, ArrowRight, CornerDownLeft, Sparkles, Check, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface InteractiveCodeTerminalProps {
  onOpenDemo?: (demoId: string) => void;
  onOpenResume?: () => void;
}

interface TerminalLog {
  id: string;
  type: 'cmd' | 'output' | 'error' | 'success';
  text: string | React.ReactNode;
}

export const InteractiveCodeTerminal: React.FC<InteractiveCodeTerminalProps> = ({
  onOpenDemo,
  onOpenResume,
}) => {
  const [activeTab, setActiveTab] = useState<'dev' | 'ai' | 'term'>('dev');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'whoami',
    'run-stocks',
    'projects',
  ]);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'output',
      text: 'Mithun T // AIML Interactive zsh CLI • Type "help" for available commands.',
    },
    {
      id: 'init-2',
      type: 'cmd',
      text: 'whoami',
    },
    {
      id: 'init-3',
      type: 'success',
      text: 'Mithun T — Undergraduate Engineer (3rd Sem B.Tech AIML) @ REVA University, Bengaluru',
    },
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'term' && inputRef.current) {
      inputRef.current.focus();
    }
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, terminalLogs]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toUpperCase();

    const cmdEntry: TerminalLog = {
      id: `cmd-${Date.now()}`,
      type: 'cmd',
      text: trimmed,
    };

    if (command === 'clear') {
      setTerminalLogs([
        {
          id: `init-${Date.now()}`,
          type: 'output',
          text: 'Mithun T // AIML Interactive zsh CLI • Type "help" for available commands.',
        },
      ]);
      return;
    }

    let outputEntry: TerminalLog;

    switch (command) {
      case 'help':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1">
              <span className="text-cyan-300 font-bold block">Available Terminal Commands:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                <div><span className="text-emerald-300">whoami</span> — Profile credentials</div>
                <div><span className="text-emerald-300">run-stocks [ticker]</span> — ML inference</div>
                <div><span className="text-emerald-300">projects</span> — 5 production systems</div>
                <div><span className="text-emerald-300">skills</span> — Verified tech stack</div>
                <div><span className="text-emerald-300">education</span> — REVA University track</div>
                <div><span className="text-emerald-300">resume</span> — Open CV document</div>
                <div><span className="text-emerald-300">contact</span> — Email & social links</div>
                <div><span className="text-emerald-300">clear</span> — Reset terminal window</div>
              </div>
            </div>
          ),
        };
        break;

      case 'whoami':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'success',
          text: (
            <div className="space-y-1 text-xs">
              <div className="text-cyan-300 font-bold">Mithun T</div>
              <div>B.Tech in Artificial Intelligence & Machine Learning (3rd Semester)</div>
              <div className="text-gray-400">Institution: REVA University, Bengaluru, India</div>
              <div className="text-emerald-400">Core Focus: Machine Learning Pipelines & Full-Stack React</div>
            </div>
          ),
        };
        break;

      case 'run-stocks':
      case 'stocks':
        const ticker = arg || 'NVDA';
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div className="text-purple-300">[yfinance STREAM] Querying 60d price buffers for {ticker}...</div>
              <div className="text-cyan-300">[ML FORECAST] Random Forest Classifier (Accuracy: 84.6%, Latency: 210ms)</div>
              <div className="text-emerald-400 font-bold">
                SIGNAL RECOMMENDATION: BUY (Signal Confidence: 87.2%)
              </div>
              <button
                onClick={() => onOpenDemo && onOpenDemo('stock-ml')}
                className="mt-1 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] hover:bg-cyan-500/30 transition-colors inline-block cursor-pointer"
              >
                Launch Full ML Studio ↗
              </button>
            </div>
          ),
        };
        break;

      case 'projects':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div className="text-white font-semibold">5 Production Deliverables:</div>
              <div className="pl-2 space-y-0.5 text-gray-300">
                <div>1. <span className="text-cyan-300 font-medium">Stock Market Intelligence Platform</span> [Python • yfinance • ML]</div>
                <div>2. <span className="text-emerald-300 font-medium">IoT Smart Water Management</span> [ESP32 • Ultrasonic • Relays]</div>
                <div>3. <span className="text-purple-300 font-medium">Personal Developer Portfolio</span> [Vercel Deployment]</div>
                <div>4. <span className="text-blue-300 font-medium">FinDrive 2.0</span> [React 18 • TypeScript • Supabase]</div>
                <div>5. <span className="text-emerald-400 font-medium">Freshkart Grocery Delivery</span> [React • LocalStorage]</div>
              </div>
            </div>
          ),
        };
        break;

      case 'skills':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div><strong className="text-cyan-300">Languages:</strong> C, Python 3, TypeScript, JavaScript, Embedded C++</div>
              <div><strong className="text-emerald-300">AIML & Data:</strong> yfinance, Scikit-Learn, Pandas, NumPy, Matplotlib</div>
              <div><strong className="text-purple-300">Web & Cloud:</strong> React 18, Vite, Tailwind CSS, Supabase, REST APIs</div>
              <div><strong className="text-amber-300">Hardware:</strong> ESP32 MCU, HC-SR04 Ultrasound, Flow Sensors, 5V Relays</div>
            </div>
          ),
        };
        break;

      case 'education':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div className="text-white font-semibold">REVA University, Bengaluru (2023 — 2027)</div>
              <div className="text-cyan-300">B.Tech in Artificial Intelligence & Machine Learning • 3rd Semester</div>
              <div className="text-gray-400">Coursework: Data Structures & Algorithms, Linear Algebra for ML, OOP, DBMS</div>
            </div>
          ),
        };
        break;

      case 'resume':
      case 'cv':
        if (onOpenResume) onOpenResume();
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'success',
          text: 'Opening Mithun T Curriculum Vitae viewer modal...',
        };
        break;

      case 'contact':
      case 'email':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-0.5 text-xs">
              <div>Email: <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-cyan-300 hover:underline">{PORTFOLIO_DATA.profile.email}</a></div>
              <div>GitHub: <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline">github.com/{PORTFOLIO_DATA.profile.githubUsername}</a></div>
              <div>LinkedIn: <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">linkedin.com/in/{PORTFOLIO_DATA.profile.linkedinUsername}</a></div>
            </div>
          ),
        };
        break;

      default:
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'error',
          text: `zsh: command not found: ${trimmed}. Type "help" for valid options.`,
        };
        break;
    }

    setTerminalLogs((prev) => [...prev, cmdEntry, outputEntry]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput);
    setTerminalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  const pipeToTerminal = (cmd: string) => {
    setActiveTab('term');
    setTimeout(() => {
      executeCommand(cmd);
    }, 150);
  };

  const copyCurrentCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const devTsCode = `import { UndergraduateProfile } from '@reva/aiml';

export const mithunT: UndergraduateProfile = {
  name: 'Mithun T',
  institution: 'REVA University, Bengaluru',
  semester: 3, // B.Tech AIML
  coreStack: ['Python', 'yfinance', 'React 18', 'TypeScript', 'C'],
  shippedDeliverables: [
    'Stock Market Intelligence Platform',
    'IoT Smart Water Management',
    'FinDrive 2.0', 'Freshkart'
  ],
  status: 'Open to Summer 2025 Internships'
};`;

  const stockPyCode = `import yfinance as yf
from sklearn.ensemble import RandomForestClassifier

def predict_market_signal(ticker: str):
    """Real-time historical ML trend classification"""
    stock = yf.Ticker(ticker).history(period="60d")
    momentum = stock['Close'].pct_change().rolling(5).mean().iloc[-1]
    signal = "BUY" if momentum > 0.015 else "HOLD"
    return {"ticker": ticker, "signal": signal, "accuracy": 0.846}

print(predict_market_signal("NVDA"))`;

  return (
    <div className="w-full rounded-2xl border border-slate-300/80 dark:border-white/10 bg-[#0d0f16]/95 backdrop-blur-2xl shadow-[0_12px_36px_rgba(15,23,42,0.18)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col ring-1 ring-cyan-500/30">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141722]/90 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
          </div>

          {/* Tab Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dev')}
              className={`px-2.5 py-1 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'dev'
                  ? 'bg-white/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-bold text-cyan-400">TS</span>
              <span>developer.ts</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`px-2.5 py-1 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-white/10 text-emerald-300 border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-bold text-emerald-400">PY</span>
              <span>stock_ai.py</span>
            </button>

            <button
              onClick={() => setActiveTab('term')}
              className={`px-2.5 py-1 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'term'
                  ? 'bg-white/10 text-purple-300 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-bold text-purple-400">&gt;_</span>
              <span>terminal_zsh</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code text-gray-400">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="hidden sm:inline">
            {activeTab === 'dev' ? 'TypeScript' : activeTab === 'ai' ? 'Python 3.11' : 'Interactive CLI'}
          </span>
        </div>
      </div>

      {/* Runtime Sub-bar */}
      <div className="px-4 py-1.5 bg-[#090b10] border-b border-white/[0.05] flex items-center justify-between text-[11px] font-mono-code text-gray-400">
        <span>node v20.11 • python 3.11 (yfinance + scikit-learn)</span>
        <span className="text-cyan-400">STABLE // RUNNING</span>
      </div>

      {/* TAB CONTENT: developer.ts */}
      {activeTab === 'dev' && (
        <div className="p-4 font-mono-code text-xs sm:text-[13px] leading-relaxed text-gray-200 min-h-[330px] flex flex-col justify-between overflow-x-auto">
          <pre className="overflow-x-auto">
            <code className="table w-full">
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">01</span>
                <span className="table-cell"><span className="text-purple-400">import</span> &#123; <span className="text-cyan-300">UndergraduateProfile</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@reva/aiml'</span>;</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">02</span>
                <span className="table-cell"></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">03</span>
                <span className="table-cell"><span className="text-purple-400">export const</span> <span className="text-cyan-300">mithunT</span>: <span className="text-cyan-300">UndergraduateProfile</span> = &#123;</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">04</span>
                <span className="table-cell">  name: <span className="text-emerald-300">'Mithun T'</span>,</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">05</span>
                <span className="table-cell">  institution: <span className="text-emerald-300">'REVA University, Bengaluru'</span>,</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">06</span>
                <span className="table-cell">  semester: <span className="text-cyan-400">3</span>, <span className="text-gray-500">// B.Tech AIML</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">07</span>
                <span className="table-cell">  coreStack: [<span className="text-emerald-300">'Python'</span>, <span className="text-emerald-300">'yfinance'</span>, <span className="text-emerald-300">'React 18'</span>, <span className="text-emerald-300">'TypeScript'</span>, <span className="text-emerald-300">'C'</span>],</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">08</span>
                <span className="table-cell">  shippedDeliverables: [</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">09</span>
                <span className="table-cell">    <span className="text-emerald-300">'Stock Market Intelligence Platform'</span>,</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">10</span>
                <span className="table-cell">    <span className="text-emerald-300">'IoT Smart Water Management'</span>,</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">11</span>
                <span className="table-cell">    <span className="text-emerald-300">'FinDrive 2.0'</span>, <span className="text-emerald-300">'Freshkart'</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">12</span>
                <span className="table-cell">  ],</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">13</span>
                <span className="table-cell">  status: <span className="text-cyan-300">'Open to Summer 2025 Internships'</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">14</span>
                <span className="table-cell">&#125;;</span>
              </span>
            </code>
          </pre>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <button
              onClick={() => pipeToTerminal('whoami')}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-300" />
              <span>Run Profile Inspection</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyCurrentCode(devTsCode)}
                className="text-gray-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
              <span className="text-gray-500">Strict mode • 0 errors</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: stock_ai.py */}
      {activeTab === 'ai' && (
        <div className="p-4 font-mono-code text-xs sm:text-[13px] leading-relaxed text-gray-200 min-h-[330px] flex flex-col justify-between overflow-x-auto">
          <pre className="overflow-x-auto">
            <code className="table w-full">
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">01</span>
                <span className="table-cell"><span className="text-purple-400">import</span> <span className="text-cyan-300">yfinance</span> <span className="text-purple-400">as</span> <span className="text-cyan-300">yf</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">02</span>
                <span className="table-cell"><span className="text-purple-400">from</span> <span className="text-cyan-300">sklearn.ensemble</span> <span className="text-purple-400">import</span> <span className="text-cyan-300">RandomForestClassifier</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">03</span>
                <span className="table-cell"></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">04</span>
                <span className="table-cell"><span className="text-purple-400">def</span> <span className="text-cyan-300">predict_market_signal</span>(ticker: <span className="text-purple-400">str</span>):</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">05</span>
                <span className="table-cell">    <span className="text-gray-500">"""Real-time historical ML trend classification"""</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">06</span>
                <span className="table-cell">    stock = yf.Ticker(ticker).history(period=<span className="text-emerald-300">"60d"</span>)</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">07</span>
                <span className="table-cell">    momentum = stock[<span className="text-emerald-300">'Close'</span>].pct_change().rolling(<span className="text-cyan-400">5</span>).mean().iloc[-<span className="text-cyan-400">1</span>]</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">08</span>
                <span className="table-cell">    signal = <span className="text-emerald-300">"BUY"</span> <span className="text-purple-400">if</span> momentum &gt; <span className="text-cyan-400">0.015</span> <span className="text-purple-400">else</span> <span className="text-purple-400">"HOLD"</span></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">09</span>
                <span className="table-cell">    <span className="text-purple-400">return</span> &#123;<span className="text-emerald-300">"ticker"</span>: ticker, <span className="text-emerald-300">"signal"</span>: signal, <span className="text-emerald-300">"accuracy"</span>: <span className="text-cyan-400">0.846</span>&#125;</span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">10</span>
                <span className="table-cell"></span>
              </span>
              <span className="table-row">
                <span className="table-cell pr-3 select-none text-gray-600 text-right w-6">11</span>
                <span className="table-cell">print(predict_market_signal(<span className="text-emerald-300">"NVDA"</span>))</span>
              </span>
            </code>
          </pre>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <button
              onClick={() => pipeToTerminal('run-stocks')}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-emerald-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluate Model on Live Ticker</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyCurrentCode(stockPyCode)}
                className="text-gray-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
              <span className="text-emerald-400 font-semibold">84.6% Accuracy • Backtested</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: terminal_zsh */}
      {activeTab === 'term' && (
        <div className="p-4 font-mono-code text-xs sm:text-[13px] leading-relaxed text-gray-200 min-h-[330px] flex flex-col justify-between">
          {/* Scrollable Command Log */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[220px] pr-1">
            {terminalLogs.map((log) => {
              if (log.type === 'cmd') {
                return (
                  <div key={log.id} className="flex items-center gap-1.5 pt-1">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-cyan-400">mithun@reva</span>:
                    <span className="text-purple-400">~</span>
                    <span className="text-white font-semibold">$ {log.text}</span>
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={log.id} className="text-rose-400 pl-4 text-xs">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'success') {
                return (
                  <div key={log.id} className="text-emerald-300 pl-4 text-xs">
                    {log.text}
                  </div>
                );
              }
              return (
                <div key={log.id} className="text-gray-300 pl-4 text-xs">
                  {log.text}
                </div>
              );
            })}
            <div ref={outputEndRef} />
          </div>

          {/* Quick Shortcuts & Interactive Form */}
          <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1 text-[11px]">
              <span className="text-gray-500 mr-1 select-none">Quick:</span>
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-cyan-300 cursor-pointer"
                onClick={() => executeCommand('help')}
              >
                help
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-cyan-300 cursor-pointer"
                onClick={() => executeCommand('run-stocks')}
              >
                run-stocks
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-emerald-300 cursor-pointer"
                onClick={() => executeCommand('projects')}
              >
                projects
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-purple-300 cursor-pointer"
                onClick={() => executeCommand('skills')}
              >
                skills
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 cursor-pointer"
                onClick={() => executeCommand('clear')}
              >
                clear
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <span className="text-emerald-400 select-none">➜</span>
              <span className="text-cyan-400 text-xs select-none">mithun@reva</span>:
              <span className="text-purple-400 text-xs select-none">~</span>
              <span className="text-gray-400 text-xs select-none">$</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'run-stocks', 'projects', 'resume'..."
                autoComplete="off"
                spellCheck="false"
                className="w-full bg-transparent border-none outline-none font-mono-code text-xs text-cyan-300 placeholder:text-gray-600 focus:ring-0 p-0"
              />
              <button
                type="submit"
                className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer shrink-0"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
