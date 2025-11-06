import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { q: 'Q1', title: 'Protocol Launch', desc: 'Core AMM, staking contracts, and validator set go live.' },
  { q: 'Q2', title: 'Wallet Integrations', desc: 'Deep integrations with MetaMask, WalletConnect and Ledger.' },
  { q: 'Q3', title: 'Cross-Chain Bridges', desc: 'Seamless asset movement across major L1s and L2s.' },
  { q: 'Q4', title: 'DAO Governance', desc: 'On-chain proposals, voting, and treasury management.' },
];

export default function Roadmap() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-28">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Roadmap</h2>
        <p className="mt-3 text-white/70">A transparent path to full decentralization and multi-chain presence.</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/10 via-white/20 to-transparent sm:left-1/2" />
        <div className="space-y-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`relative grid grid-cols-1 items-center gap-6 sm:grid-cols-2 ${i % 2 ? 'sm:text-left' : 'sm:text-right'}`}
            >
              <div className={`${i % 2 ? 'sm:order-2' : ''}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  {s.q}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.desc}</p>
              </div>
              <div className="hidden sm:flex sm:justify-center">
                <div className="relative h-4 w-4 rounded-full border border-white/20 bg-white/10">
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
