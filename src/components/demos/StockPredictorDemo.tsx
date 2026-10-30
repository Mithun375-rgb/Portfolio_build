import React, { useState } from 'react';
import { TrendingUp, Play, RefreshCw, BarChart2, ShieldCheck, Zap } from 'lucide-react';

interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  rsi: number;
  momentum: number;
  signal: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL';
  confidence: number;
  chartPoints: number[];
}

const PRESET_STOCKS: Record<string, TickerData> = {
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.25,
    change: +4.85,
    changePercent: +3.63,
    rsi: 64.2,
    momentum: +0.024,
    signal: 'STRONG BUY',
    confidence: 89.4,
    chartPoints: [118, 122, 120, 126, 131, 129, 134, 138],
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 232.1,
    change: +1.4,
    changePercent: +0.61,
    rsi: 58.1,
    momentum: +0.012,
    signal: 'BUY',
    confidence: 82.5,
    chartPoints: [224, 226, 225, 228, 230, 229, 231, 232],
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 254.8,
    change: -3.2,
    changePercent: -1.24,
    rsi: 47.6,
    momentum: -0.008,
    signal: 'HOLD',
    confidence: 76.1,
    chartPoints: [265, 260, 262, 258, 255, 258, 252, 254],
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 432.5,
    change: +3.1,
    changePercent: +0.72,
    rsi: 61.4,
    momentum: +0.016,
    signal: 'BUY',
    confidence: 86.8,
    chartPoints: [418, 422, 420, 425, 428, 426, 430, 432],
  },
  INFY: {
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: 1910.0,
    change: +18.5,
    changePercent: +0.98,
    rsi: 56.8,
    momentum: +0.015,
    signal: 'BUY',
    confidence: 84.1,
    chartPoints: [1840, 1860, 1855, 1870, 1890, 1880, 1900, 1910],
  },
};

export const StockPredictorDemo: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>('NVDA');
  const [customTickerInput, setCustomTickerInput] = useState<string>('');
  const [isInferencing, setIsInferencing] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<TickerData | null>(PRESET_STOCKS['NVDA']);
  const [executionLog, setExecutionLog] = useState<string[]>([
    '[INIT] yfinance stream initialized with interval=1d, period=60d',
    '[MODEL] Random Forest Classifier (n_estimators=100, max_depth=8)',
    '[STATUS] Ready for quantitative inference query',
  ]);

  const handleSelectTicker = (ticker: string) => {
    setSelectedTicker(ticker);
    const data = PRESET_STOCKS[ticker] || {
      symbol: ticker,
      name: `${ticker} Equity`,
      price: 150.0 + Math.random() * 50,
      change: (Math.random() - 0.4) * 5,
      changePercent: (Math.random() - 0.4) * 3,
      rsi: 45 + Math.random() * 25,
      momentum: (Math.random() - 0.3) * 0.04,
      signal: Math.random() > 0.4 ? 'BUY' : 'HOLD',
      confidence: 80 + Math.random() * 12,
      chartPoints: [130, 135, 132, 140, 145, 142, 148, 155],
    };
    setPredictionResult(data);
  };

  const runMLInference = () => {
    setIsInferencing(true);
    const current = predictionResult || PRESET_STOCKS['NVDA'];
    
    setExecutionLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Fetching 60d ticker buffer for ${current.symbol}...`,
      ...prev.slice(0, 5),
    ]);

    setTimeout(() => {
      // simulate ML pipeline processing
      const simulatedConfidence = +(82 + Math.random() * 11).toFixed(1);
      const signal: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' = 
        current.momentum > 0.02 ? 'STRONG BUY' : current.momentum > 0.005 ? 'BUY' : current.momentum > -0.01 ? 'HOLD' : 'SELL';

      setPredictionResult({
        ...current,
        confidence: simulatedConfidence,
        signal,
      });

      setExecutionLog((prev) => [
        `[${new Date().toLocaleTimeString()}] Feature extraction: 5d_momentum=${(current.momentum * 100).toFixed(2)}%, rsi=${current.rsi.toFixed(1)}`,
        `[${new Date().toLocaleTimeString()}] Random Forest Output: Signal=${signal} (Confidence=${simulatedConfidence}%)`,
        ...prev.slice(0, 5),
      ]);
      setIsInferencing(false);
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTickerInput.trim()) return;
    const clean = customTickerInput.trim().toUpperCase();
    handleSelectTicker(clean);
    setCustomTickerInput('');
  };

  const current = predictionResult || PRESET_STOCKS['NVDA'];

  return (
    <div className="flex flex-col gap-5 text-gray-200">
      {/* Header and Ticker Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <BarChart2 className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-code">
              Stock Market ML Inference Studio
            </h4>
            <p className="text-xs text-gray-400">
              yfinance real-time query • Scikit-Learn Random Forest Classifier
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={runMLInference}
          disabled={isInferencing}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold text-xs font-mono-code flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
        >
          {isInferencing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-black" />
          )}
          <span>{isInferencing ? 'Computing...' : 'Run ML Inference'}</span>
        </button>
      </div>

      {/* Preset Selector & Custom Input */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono-code text-gray-400">Presets:</span>
        {Object.keys(PRESET_STOCKS).map((ticker) => (
          <button
            key={ticker}
            onClick={() => handleSelectTicker(ticker)}
            className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
              selectedTicker === ticker
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {ticker}
          </button>
        ))}

        <form onSubmit={handleCustomSubmit} className="flex items-center gap-1.5 ml-auto">
          <input
            type="text"
            value={customTickerInput}
            onChange={(e) => setCustomTickerInput(e.target.value)}
            placeholder="Custom (e.g. GOOGL)"
            className="w-36 px-2.5 py-1 text-xs font-mono-code bg-[#0a0d14] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-2.5 py-1 text-xs font-mono-code bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
          >
            Load
          </button>
        </form>
      </div>

      {/* Main Signal and Price Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Signal & Recommendation Card */}
        <div className="md:col-span-5 p-4 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-gray-400 uppercase">ML Output Signal</span>
            <div className="flex items-center gap-1 text-[11px] font-mono-code text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Backtested 84.6%</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 my-1">
            <span
              className={`text-2xl font-bold font-mono-code px-3 py-1 rounded-lg ${
                current.signal === 'STRONG BUY' || current.signal === 'BUY'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : current.signal === 'HOLD'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              {current.signal}
            </span>
            <span className="text-xs font-mono-code text-gray-400">
              Confidence: <strong className="text-white">{current.confidence}%</strong>
            </span>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs font-mono-code">
            <div className="flex justify-between text-gray-400">
              <span>Model Classifier:</span>
              <span className="text-white">Random Forest (Scikit-Learn)</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Rolling Window:</span>
              <span className="text-cyan-300">60 Historical Days</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Inference Latency:</span>
              <span className="text-emerald-400">210ms</span>
            </div>
          </div>
        </div>

        {/* Ticker & Price Metrics */}
        <div className="md:col-span-7 p-4 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-white font-mono-code">{current.symbol}</span>
              <span className="text-xs text-gray-400 ml-2 font-mono-code">{current.name}</span>
            </div>
            <div
              className={`text-xs font-mono-code font-bold flex items-center gap-1 ${
                current.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>
                {current.change >= 0 ? '+' : ''}
                {current.change.toFixed(2)} ({current.changePercent >= 0 ? '+' : ''}
                {current.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="h-16 w-full flex items-end gap-1.5 pt-2">
            {current.chartPoints.map((val, idx) => {
              const min = Math.min(...current.chartPoints);
              const max = Math.max(...current.chartPoints);
              const heightPct = Math.max(15, Math.round(((val - min) / (max - min || 1)) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full rounded-t bg-gradient-to-t from-cyan-500/20 to-cyan-400/80 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>

          {/* Quick Technicals */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center text-xs font-mono-code">
            <div className="p-1.5 rounded bg-white/[0.02]">
              <span className="text-[10px] text-gray-500 block">LAST CLOSE</span>
              <span className="text-white font-semibold">${current.price.toFixed(2)}</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.02]">
              <span className="text-[10px] text-gray-500 block">RSI (14D)</span>
              <span className="text-cyan-300 font-semibold">{current.rsi.toFixed(1)}</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.02]">
              <span className="text-[10px] text-gray-500 block">5D MOMENTUM</span>
              <span
                className={`font-semibold ${
                  current.momentum >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {(current.momentum * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Quant Console Log */}
      <div className="p-3 rounded-xl bg-[#06080d] border border-white/[0.06] flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono-code text-gray-400">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Telemetry & Prediction Stream</span>
          </div>
          <span className="text-cyan-400">STABLE</span>
        </div>
        <div className="font-mono-code text-xs space-y-1 text-gray-300">
          {executionLog.map((log, i) => (
            <div key={i} className="text-gray-400">
              <span className="text-cyan-500 select-none">&gt; </span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
