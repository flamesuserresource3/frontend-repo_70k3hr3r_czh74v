import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Wallet } from 'lucide-react';
import WalletConnectPanel from './WalletConnectPanel.jsx';

const WORDS = ['Secure', 'Fast', 'Decentralized'];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[95vh] w-full overflow-hidden">
      {/* 3D holographic background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* gradient sheen overlay that does not block pointer events */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Mainnet ready • Audited smart contracts
          </div>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            The future of crypto is
            <span className="relative ml-3 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block min-w-[9ch]"
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg">
            A next‑gen platform for staking, liquidity and lightning‑fast token swaps. Built for scale, security and a seamless UX.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setShowWallet(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-600/20 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            >
              <Wallet className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Connect Wallet
            </button>
            <a
              href="#features"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>

      <WalletConnectPanel open={showWallet} onClose={() => setShowWallet(false)} />
    </section>
  );
}
