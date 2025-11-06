import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple live ticker pulling from CoinGecko public API (no key). 
// Animated marquee with smooth value transitions.
const COINS = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'ripple', symbol: 'XRP' },
];

export default function PriceTicker() {
  const [prices, setPrices] = useState({});
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    let active = true;
    const fetchPrices = async () => {
      try {
        const ids = COINS.map((c) => c.id).join(',');
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (active) {
          setPrices(data);
          setLastUpdated(Date.now());
        }
      } catch (_) {}
    };
    fetchPrices();
    const id = setInterval(fetchPrices, 15000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="text-xs text-white/60">Live prices • Updated {new Date(lastUpdated).toLocaleTimeString()}</div>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-[marquee_30s_linear_infinite] gap-8 whitespace-nowrap pr-8">
            {COINS.concat(COINS).map((coin, i) => {
              const p = prices[coin.id];
              const change = p?.usd_24h_change ?? 0;
              const up = change >= 0;
              return (
                <div key={`${coin.id}-${i}`} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-white/90">{coin.symbol}</span>
                  <AnimatePresence mode="popLayout"> 
                    <motion.span
                      key={p?.usd ?? 'loading'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="tabular-nums text-white"
                    >
                      {p ? `$${p.usd.toLocaleString()}` : '...'}
                    </motion.span>
                  </AnimatePresence>
                  <span className={up ? 'text-emerald-400' : 'text-rose-400'}>
                    {p ? `${up ? '+' : ''}${change.toFixed(2)}%` : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
