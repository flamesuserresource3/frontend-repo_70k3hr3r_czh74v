import React from 'react';
import PriceTicker from './components/PriceTicker.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Roadmap from './components/Roadmap.jsx';
import SignUp from './components/SignUp.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <PriceTicker />
      <Hero />
      <Features />
      <Roadmap />
      <SignUp />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} NovaChain Labs. All rights reserved.
      </footer>
    </div>
  );
}
