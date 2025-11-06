import React from 'react';
import { motion } from 'framer-motion';

const posts = [
  {
    title: 'Introducing NovaChain Mainnet',
    excerpt: 'A deep dive into our architecture, validator set and security model.',
    img: 'https://images.unsplash.com/photo-1644329881405-cd7dfb61a821?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Liquidity Mining 2.0',
    excerpt: 'How we rethink incentives to reduce mercenary capital and increase longevity.',
    img: 'https://images.unsplash.com/photo-1555679427-9fe5ab9a3b5f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Designing for Trust',
    excerpt: 'Principles we use to create clear, accessible crypto UX.',
    img: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">From the Blog</h2>
        <p className="mt-3 text-white/70">Insights, updates and learnings from the team.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <div className="text-lg font-medium text-white">{p.title}</div>
              <p className="mt-1 text-sm text-white/70">{p.excerpt}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
