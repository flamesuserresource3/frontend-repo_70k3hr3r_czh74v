import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, MessageSquare } from 'lucide-react';

export default function Community() {
  const socials = [
    { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
    { href: 'https://github.com', label: 'GitHub', Icon: Github },
    { href: '#discord', label: 'Community Chat', Icon: MessageSquare },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Join the Community</h2>
        <p className="mt-3 text-white/70">Connect with us, contribute, and stay in the loop.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {socials.map(({ href, label, Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: 'easeOut' }}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/80">
              <Icon className="h-5 w-5" />
            </span>
            <div className="text-white/90">{label}</div>
          </motion.a>
        ))}
      </div>

      <form className="mx-auto mt-12 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto]">
        <input type="email" placeholder="Email for newsletter" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-cyan-400/60 focus:outline-none" />
        <motion.button whileTap={{ scale: 0.98 }} className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white">Subscribe</motion.button>
      </form>
    </section>
  );
}
