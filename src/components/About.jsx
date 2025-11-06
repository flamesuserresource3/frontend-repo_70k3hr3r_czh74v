import React from 'react';
import { motion } from 'framer-motion';

const team = [
  { name: 'Ava Chen', role: 'CEO & Co‑Founder', bio: 'Product strategist with a decade in fintech and Web3.', img: 'https://i.pravatar.cc/160?img=1' },
  { name: 'Marcus Lee', role: 'CTO & Co‑Founder', bio: 'Distributed systems, cryptography, and security engineering.', img: 'https://i.pravatar.cc/160?img=2' },
  { name: 'Sofia Patel', role: 'Head of Design', bio: 'Designing delightful crypto UX with accessibility at the core.', img: 'https://i.pravatar.cc/160?img=3' },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">About Us</h2>
        <p className="mt-3 text-white/70">A mission-driven team building transparent, performant and secure DeFi infrastructure.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: 'easeOut' }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
          >
            <img src={m.img} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <div className="mt-4 text-lg font-medium text-white">{m.name}</div>
            <div className="text-sm text-white/70">{m.role}</div>
            <p className="mt-3 text-sm text-white/70">{m.bio}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h3 className="text-xl font-semibold text-white">Our Mission</h3>
          <p className="mt-2 text-white/70">
            We are on a mission to make crypto finance accessible and secure for everyone. We believe in open-source,
            transparent economics and a user experience that feels effortless.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
