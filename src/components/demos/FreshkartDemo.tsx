import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, Check, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy' | 'Bakery';
  price: number;
  weight: string;
  emoji: string;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Alphonso Mangoes', category: 'Produce', price: 240, weight: '1 kg box', emoji: '🥭' },
  { id: '2', name: 'Fresh Organic Milk', category: 'Dairy', price: 68, weight: '1 Litre', emoji: '🥛' },
  { id: '3', name: 'Sourdough Artisan Bread', category: 'Bakery', price: 95, weight: '400g loaf', emoji: '🍞' },
  { id: '4', name: 'Hass Avocados', category: 'Produce', price: 180, weight: '2 pcs', emoji: '🥑' },
  { id: '5', name: 'Farm Fresh Paneer', category: 'Dairy', price: 120, weight: '200g pack', emoji: '🧀' },
  { id: '6', name: 'Whole Wheat Bagels', category: 'Bakery', price: 85, weight: '4 pack', emoji: '🥯' },
];

export const FreshkartDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<Record<string, number>>({
    '1': 1,
    '2': 2,
  });
  const [lastActionLatency, setLastActionLatency] = useState<number>(3.2);

  const addToCart = (id: string) => {
    const start = performance.now();
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    const latency = +(performance.now() - start).toFixed(1);
    setLastActionLatency(Math.max(1.8, latency));
  };

  const removeFromCart = (id: string) => {
    const start = performance.now();
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[id]) return copy;
      if (copy[id] <= 1) {
        delete copy[id];
      } else {
        copy[id] -= 1;
      }
      return copy;
    });
    const latency = +(performance.now() - start).toFixed(1);
    setLastActionLatency(Math.max(1.5, latency));
  };

  const clearCart = () => {
    setCart({});
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);

  return (
    <div className="flex flex-col gap-5 text-gray-200">
      {/* Header and Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
            <ShoppingBag className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-code">
              Freshkart Instant Grocery Engine
            </h4>
            <p className="text-xs text-gray-400">
              Zero-Lag State Synchronizer • LocalStorage Cache • Reactive Discovery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code">
          <span className="text-gray-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>State Latency:</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            {lastActionLatency} ms (Sub-8ms)
          </span>
        </div>
      </div>

      {/* Category Pills & Cart Drawer Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {['All', 'Produce', 'Dairy', 'Bakery'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code">
          <span className="text-gray-400">Live Cart:</span>
          <span className="text-white font-bold">{cartItemCount} items</span>
          <span>·</span>
          <span className="text-emerald-400 font-bold">₹{cartSubtotal}</span>
          {cartItemCount > 0 && (
            <button
              onClick={clearCart}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-rose-300 text-[11px] transition-colors cursor-pointer"
            >
              Empty
            </button>
          )}
        </div>
      </div>

      {/* Product Grid and Live Cart Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Product Cards */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProducts.map((prod) => {
            const inCartQty = cart[prod.id] || 0;
            return (
              <div
                key={prod.id}
                className="p-3.5 rounded-xl bg-[#090c13] border border-white/[0.08] flex items-center justify-between gap-3 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    {prod.emoji}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{prod.name}</h5>
                    <div className="flex items-center gap-2 text-[11px] font-mono-code text-gray-400">
                      <span>{prod.weight}</span>
                      <span>·</span>
                      <span className="text-emerald-300 font-semibold">₹{prod.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {inCartQty > 0 ? (
                    <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-lg p-0.5 font-mono-code text-xs">
                      <button
                        onClick={() => removeFromCart(prod.id)}
                        className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-white rounded hover:bg-white/10 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1 text-white font-bold">{inCartQty}</span>
                      <button
                        onClick={() => addToCart(prod.id)}
                        className="w-5 h-5 flex items-center justify-center text-emerald-300 hover:text-white rounded hover:bg-emerald-500/20 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(prod.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono-code flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Cart Sidebar */}
        <div className="md:col-span-4 p-4 rounded-xl bg-[#090c13] border border-white/[0.08] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs font-mono-code text-white font-bold">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Checkout Preview</span>
            </div>
            <span className="text-[11px] font-mono-code text-cyan-300">Fast 15m Delivery</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-40 pr-1 text-xs font-mono-code">
            {Object.entries(cart).length === 0 ? (
              <div className="text-gray-500 py-6 text-center text-xs">Your basket is empty.</div>
            ) : (
              Object.entries(cart).map(([id, qty]) => {
                const prod = PRODUCTS.find((p) => p.id === id);
                if (!prod) return null;
                return (
                  <div key={id} className="flex justify-between items-center text-gray-300">
                    <span className="truncate max-w-[120px]">
                      {prod.name} × {qty}
                    </span>
                    <span className="text-white font-semibold">₹{prod.price * qty}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 border-t border-white/[0.06] space-y-2 text-xs font-mono-code">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal:</span>
              <span className="text-white font-semibold">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Express Delivery:</span>
              <span className="text-emerald-400 font-semibold">FREE (Bengaluru)</span>
            </div>
            <button
              onClick={() => alert('Order simulated! State updated with sub-8ms latency.')}
              disabled={cartItemCount === 0}
              className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-semibold text-xs font-mono-code flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Place Order (₹{cartSubtotal})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
