import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Waves, RefreshCw } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Staking',
    desc: 'Secure your assets and earn yield with validator-backed staking pools and slashing protection.',
    color: 'from-emerald-400/20 to-emerald-500/10',
  },
  {
    icon: Waves,
    title: 'Liquidity Pools',
    desc: 'Provide liquidity to deep pools with concentrated ranges, low fees, and minimized impermanent loss.',
    color: 'from-cyan-400/20 to-sky-500/10',
  },
  {
    icon: RefreshCw,
    title: 'Token Swaps',
    desc: 'Execute lightning-fast swaps with best-route aggregation and MEV-resistant transactions.',
    color: 'from-indigo-400/20 to-blue-500/10',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Powerful DeFi, beautifully packaged</h2>
        <p className="mt-3 text-white/70">Explore a suite of products engineered for performance, security, and delightful UX.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className={`pointer-events-none absolute -inset-20 rounded-full bg-gradient-to-br ${color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
