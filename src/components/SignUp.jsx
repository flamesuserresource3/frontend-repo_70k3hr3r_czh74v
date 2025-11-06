import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignUp() {
  const [form, setForm] = useState({ email: '', password: '', agree: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!form.agree) e.agree = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-lg px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-white"
        >
          <div className="text-xl font-semibold">Welcome aboard!</div>
          <p className="mt-2 text-white/70">Your account request has been received. Check your inbox to verify your email.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section aria-labelledby="signup-heading" className="mx-auto max-w-3xl px-6 pb-24">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h2 id="signup-heading" className="text-3xl font-semibold text-white sm:text-4xl">Get early access</h2>
        <p className="mt-3 text-white/70">Sign up to join the beta and receive launch updates.</p>
      </div>

      <form onSubmit={submit} noValidate className="mx-auto grid max-w-xl gap-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-white/80">Email</label>
          <motion.input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            whileFocus={{ scale: 1.01 }}
            className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-cyan-400/60 ${errors.email ? 'border-rose-500/50' : 'border-white/15'}`}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <div id="email-error" className="mt-1 text-xs text-rose-400">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-white/80">Password</label>
          <motion.input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            whileFocus={{ scale: 1.01 }}
            className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-cyan-400/60 ${errors.password ? 'border-rose-500/50' : 'border-white/15'}`}
            placeholder="At least 8 characters"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && <div id="password-error" className="mt-1 text-xs text-rose-400">{errors.password}</div>}
        </div>
        <div className="flex items-center gap-3">
          <input
            id="agree"
            type="checkbox"
            checked={form.agree}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-400"
            aria-invalid={!!errors.agree}
            aria-describedby={errors.agree ? 'agree-error' : undefined}
          />
          <label htmlFor="agree" className="text-sm text-white/80">I agree to the Terms and Privacy Policy</label>
        </div>
        {errors.agree && <div id="agree-error" className="-mt-2 text-xs text-rose-400">{errors.agree}</div>}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-600/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          type="submit"
        >
          Create account
        </motion.button>
      </form>
    </section>
  );
}
