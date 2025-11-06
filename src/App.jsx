import React from 'react';
import Navbar from './components/Navbar.jsx';
import PriceTicker from './components/PriceTicker.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import MarketCharts from './components/MarketCharts.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog.jsx';
import Community from './components/Community.jsx';
import Contact from './components/Contact.jsx';
import Roadmap from './components/Roadmap.jsx';
import SignUp from './components/SignUp.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Navbar />
      <div id="home" />
      <PriceTicker />
      <Hero />
      <Features />
      <MarketCharts />
      <About />
      <Roadmap />
      <Blog />
      <Community />
      <SignUp />
      <Contact />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} NovaChain Labs. All rights reserved.
      </footer>
    </div>
  );
}
