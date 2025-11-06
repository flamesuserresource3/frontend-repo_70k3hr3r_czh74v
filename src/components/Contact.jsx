import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message) return;
    setSent(true);
  };

  if (sent) {
    return (
      <section id="contact" className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-white">Thanks! We'll be in touch shortly.</div>
      </section>
    );
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Contact Us</h2>
        <p className="mt-3 text-white/70">Questions, partnerships, press? Reach out any time.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm text-white/80">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/60" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/60" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Message</label>
            <textarea rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/60" />
          </div>
          <motion.button whileTap={{ scale: 0.98 }} className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white">Send</motion.button>
        </form>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Our Location</h3>
          <p className="mt-2 text-white/70">Remote-first with hubs in San Francisco, Singapore, and Berlin.</p>
          <div className="mt-4 aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
          <div className="mt-4 text-sm text-white/60">Live chat: available 24/7 via the chat widget.</div>
        </div>
      </div>
    </section>
  );
}
