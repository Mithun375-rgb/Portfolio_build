import React, { useState, useEffect } from 'react';
import { Activity, Power, Waves, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const IotWaterDemo: React.FC = () => {
  const [waterLevel, setWaterLevel] = useState<number>(68); // 0 to 100 percent
  const [isPumpActive, setIsPumpActive] = useState<boolean>(true);
  const [isAutoControl, setIsAutoControl] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Derived sensor telemetry
  const tankHeightCm = 100;
  const currentDepthCm = +(tankHeightCm * (waterLevel / 100)).toFixed(1);
  const ultrasonicDistance = +(tankHeightCm - currentDepthCm).toFixed(1); // distance from sensor to surface
  const echoTimeUs = +(ultrasonicDistance * 58.2).toFixed(0); // HC-SR04 sound speed conversion (µs)
  
  // Dynamic flow rate based on pump
  const flowRate = isPumpActive ? +(12.5 + (waterLevel / 20) + (Math.random() * 0.8)).toFixed(1) : 0.0;
  const turbidityNtu = +(2.4 + (waterLevel > 85 ? 0.9 : 0)).toFixed(1);

  // Automated Fail-Safe relay rules
  // If water level < 15%: Dry-run hazard! Relay forces cutoff
  // If water level > 92%: Overflow hazard! Relay forces cutoff
  const isDryRunRisk = waterLevel < 15;
  const isOverflowRisk = waterLevel > 90;
  const isRelayTripped = isDryRunRisk || isOverflowRisk;

  useEffect(() => {
    if (isAutoControl) {
      if (isRelayTripped) {
        setIsPumpActive(false);
      } else {
        setIsPumpActive(true);
      }
    }
  }, [waterLevel, isRelayTripped, isAutoControl]);

  // Simulation interval for fill or drain
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setWaterLevel((prev) => {
        if (prev >= 95) {
          setIsSimulating(false);
          return 95;
        }
        return prev + 3;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const simulateDrain = () => {
    setIsSimulating(false);
    setWaterLevel((prev) => Math.max(10, prev - 25));
  };

  const simulateFill = () => {
    setIsSimulating(true);
  };

  return (
    <div className="flex flex-col gap-5 text-gray-200">
      {/* Header and Telemetry Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
            <Activity className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-code">
              IoT Smart Water Management Telemetry
            </h4>
            <p className="text-xs text-gray-400">
              ESP32 MCU • Ultrasonic HC-SR04 • YF-S201 Flow Sensor • 5V Fail-Safe Relay
            </p>
          </div>
        </div>

        {/* Auto Control Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoControl(!isAutoControl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
              isAutoControl
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Auto Fail-Safe: {isAutoControl ? 'ON' : 'MANUAL'}</span>
          </button>
        </div>
      </div>

      {/* Tank Graphic & Hardware Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Interactive Visual Tank */}
        <div className="md:col-span-5 p-4 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col items-center justify-between gap-4">
          <div className="w-full flex items-center justify-between text-xs font-mono-code text-gray-400">
            <span>RESERVOIR TANK A</span>
            <span className="text-cyan-400">{waterLevel}% CAPACITY</span>
          </div>

          {/* Visual Tank Cylinder */}
          <div className="relative w-44 h-56 rounded-2xl border-2 border-white/20 bg-[#06080e] overflow-hidden flex flex-col justify-end p-1 shadow-inner">
            {/* Top Ultrasonic Sensor Node */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-[#161a26] border border-cyan-500/40 text-[10px] font-mono-code text-cyan-300 flex items-center gap-1 z-10 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>HC-SR04 Node</span>
            </div>

            {/* Ultrasonic Pulse Waves */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 text-center pointer-events-none opacity-40">
              <Waves className="w-8 h-8 text-cyan-400 animate-pulse mx-auto" />
            </div>

            {/* Liquid Fill */}
            <div
              style={{ height: `${waterLevel}%` }}
              className={`w-full rounded-b-xl transition-all duration-300 relative ${
                isRelayTripped
                  ? 'bg-gradient-to-t from-rose-600/70 to-rose-400/50'
                  : 'bg-gradient-to-t from-cyan-600/80 via-cyan-500/60 to-emerald-400/60'
              }`}
            >
              {/* Liquid Surface Ripple */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              <div className="absolute inset-0 flex items-center justify-center font-mono-code text-sm font-bold text-white drop-shadow">
                {currentDepthCm} cm
              </div>
            </div>
          </div>

          {/* Water Slider Controller */}
          <div className="w-full space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono-code text-gray-400">
              <span>Adjust Depth Simulation:</span>
              <span className="text-white">{waterLevel}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="98"
              value={waterLevel}
              onChange={(e) => setWaterLevel(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Quick Simulation Buttons */}
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={simulateFill}
              disabled={isSimulating}
              className="flex-1 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono-code transition-all cursor-pointer"
            >
              {isSimulating ? 'Filling...' : 'Simulate Fill'}
            </button>
            <button
              onClick={simulateDrain}
              className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-mono-code transition-all cursor-pointer"
            >
              Drain 25%
            </button>
          </div>
        </div>

        {/* Right: Telemetry Readouts & Relay State */}
        <div className="md:col-span-7 flex flex-col justify-between gap-4">
          {/* Fail-Safe Alarm Banner if triggered */}
          {isRelayTripped ? (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 flex items-center gap-3 text-xs font-mono-code">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <strong className="text-white font-bold block">
                  {isDryRunRisk ? 'FAIL-SAFE TRIP: DRY-RUN PROTECTION' : 'FAIL-SAFE TRIP: OVERFLOW HAZARD'}
                </strong>
                <span>
                  {isDryRunRisk
                    ? 'Water level < 15%. Automated 5V Relay opened to prevent pump motor burn-out.'
                    : 'Water level > 90%. Automated 5V Relay cut pump to prevent municipal reservoir overflow.'}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-xs font-mono-code">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white font-bold block">RELAY STATUS: NORMAL (SAFE REGIME)</strong>
                <span>Depth within safe operating parameters (15% — 90%). System running optimal telemetry.</span>
              </div>
            </div>
          )}

          {/* Hardware Sensor Readout Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* HC-SR04 Ultrasonic Distance */}
            <div className="p-3.5 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col gap-1">
              <span className="text-[11px] font-mono-code text-gray-400">HC-SR04 ECHO AIR GAP</span>
              <span className="text-xl font-bold font-mono-code text-cyan-300">{ultrasonicDistance} cm</span>
              <span className="text-[10px] font-mono-code text-gray-500">Pulse Echo: ~{echoTimeUs} µs</span>
            </div>

            {/* YF-S201 Flow Sensor */}
            <div className="p-3.5 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col gap-1">
              <span className="text-[11px] font-mono-code text-gray-400">YF-S201 FLOW RATE</span>
              <span className="text-xl font-bold font-mono-code text-emerald-400">{flowRate} L/min</span>
              <span className="text-[10px] font-mono-code text-gray-500">
                {isPumpActive ? 'Active Circulation' : 'Zero Flow (Idle)'}
              </span>
            </div>

            {/* Turbidity Sensor */}
            <div className="p-3.5 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col gap-1">
              <span className="text-[11px] font-mono-code text-gray-400">WATER TURBIDITY</span>
              <span className="text-xl font-bold font-mono-code text-purple-300">{turbidityNtu} NTU</span>
              <span className="text-[10px] font-mono-code text-gray-500">Purity Standard: Compliant (&lt;5)</span>
            </div>

            {/* 5V Relay Actuator */}
            <div className="p-3.5 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col gap-1">
              <span className="text-[11px] font-mono-code text-gray-400">5V RELAY ACTUATOR</span>
              <div className="flex items-center gap-2">
                <Power className={`w-4 h-4 ${isPumpActive ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span className={`text-sm font-bold font-mono-code ${isPumpActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPumpActive ? 'CIRCUIT ENERGIZED' : 'CIRCUIT OPEN (TRIPPED)'}
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-gray-500">Switching latency: &lt; 15ms</span>
            </div>
          </div>

          {/* Microcontroller Code Architecture */}
          <div className="p-3 rounded-xl bg-[#06080d] border border-white/[0.06] text-xs font-mono-code text-gray-400 space-y-1">
            <span className="text-cyan-400 font-semibold block text-[11px]">// ESP32 EMBEDDED LOGIC SNIPPET</span>
            <div className="text-gray-300">
              <code>if (depth &lt; 15.0 || depth &gt; 90.0) digitalWrite(RELAY_PIN, LOW); // Fail-safe cut</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
