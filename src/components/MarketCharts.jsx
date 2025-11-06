import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import WalletConnectPanel from './WalletConnectPanel.jsx';

// Fetch simple market charts from CoinGecko and render light SVG sparklines.
// No external chart libs to keep bundle small and fast.
const COINS = [
  { id: 'bitcoin', symbol: 'BTC', color: '#22d3ee' },
  { id: 'ethereum', symbol: 'ETH', color: '#60a5fa' },
];

function Sparkline({ points, color }) {
  const width = 220;
  const height = 64;
  const pad = 6;
  const path = useMemo(() => {
    if (!points || points.length === 0) return '';
    const xs = points.map((_, i) => i);
    const ys = points;
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const spanY = maxY - minY || 1;
    const scaleX = (width - pad * 2) / (xs.length - 1);
    const scaleY = (height - pad * 2) / spanY;
    const toX = (i) => pad + i * scaleX;
    const toY = (y) => height - pad - (y - minY) * scaleY;
    return xs.map((i) => `${i === 0 ? 'M' : 'L'} ${toX(i)},${toY(ys[i])}`).join(' ');
  }, [points]);

  const gradientId = useMemo(
    () => `grad-${color.replace('#', '')}-${Math.round(Math.random() * 1e6)}`,
    [color]
  );

  const min = Math.min(...(points || [0]));
  const max = Math.max(...(points || [0]));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* subtle area fill */}
      <path d={`${path} L ${width - 6},${height - 6} L 6,${height - 6} Z`} fill={`url(#${gradientId})`} opacity="0.25" />
      <text x={width - 4} y={12} textAnchor="end" className="fill-white/60 text-[10px]">{`24h: ${((points?.[points.length-1] - points?.[0]) / (points?.[0] || 1) * 100).toFixed(2)}%`}</text>
      <text x={6} y={12} className="fill-white/60 text-[10px]">{`min ${min.toFixed(0)}`}</text>
      <text x={6} y={24} className="fill-white/60 text-[10px]">{`max ${max.toFixed(0)}`}</text>
    </svg>
  );
}

export default function MarketCharts() {
  const [series, setSeries] = useState({});
  const [loading, setLoading] = useState(true);
  const [openWallet, setOpenWallet] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const promises = COINS.map(async (c) => {
          const url = `https://api.coingecko.com/api/v3/coins/${c.id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('network');
          const data = await res.json();
          // prices: [ [timestamp, price], ... ]
          return { id: c.id, values: data.prices.map((p) => p[1]) };
        });
        const results = await Promise.all(promises);
        if (active) {
          const s = {};
          results.forEach((r) => (s[r.id] = r.values));
          setSeries(s);
        }
      } catch (e) {
        // graceful degradation: keep whatever we have
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 60000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Live Markets</h2>
          <p className="mt-2 text-white/70">Real-time prices with lightweight charts. Updated every minute.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpenWallet(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-600/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
        >
          <Wallet className="h-4 w-4" /> Connect Wallet
        </motion.button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {COINS.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium text-white/90">{c.symbol}</div>
              <div className="text-xs text-white/60">24h</div>
            </div>
            <div className="min-h-[80px]">
              {loading && !series[c.id] ? (
                <div className="py-6 text-center text-white/50">Loading chart…</div>
              ) : (
                <Sparkline points={series[c.id]} color={c.color} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <WalletConnectPanel open={openWallet} onClose={() => setOpenWallet(false)} />
    </section>
  );
}
