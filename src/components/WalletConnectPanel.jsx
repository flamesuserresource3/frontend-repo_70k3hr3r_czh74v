import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Link2 } from 'lucide-react';

export default function WalletConnectPanel({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const addr = accounts?.[0];
      if (addr) alert(`Connected: ${addr.slice(0, 6)}...${addr.slice(-4)}`);
      onClose?.();
    } catch (e) {
      alert('Connection failed. Please try again.');
    }
  };

  const connectWalletConnect = async () => {
    // Placeholder logic for demo UI; real integration would use WalletConnect SDK.
    alert('WalletConnect: Scan the QR in your wallet app (demo).');
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="text-sm font-medium text-white/80">Connect your wallet</div>
              <button onClick={onClose} className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="space-y-3 p-5">
              <button
                onClick={connectMetaMask}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-black">
                  <Wallet className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">MetaMask</div>
                  <div className="text-xs text-white/60">Browser wallet • Popular</div>
                </div>
              </button>

              <button
                onClick={connectWalletConnect}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 text-black">
                  <Link2 className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">WalletConnect</div>
                  <div className="text-xs text-white/60">Connect mobile wallets via QR</div>
                </div>
              </button>

              <div className="pt-2 text-center text-xs text-white/60">By connecting a wallet you agree to our Terms.</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
