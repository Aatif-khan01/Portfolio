"use client";

import React, { useEffect, useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SystemThinking from '@/components/SystemThinking';
import Projects from '@/components/Projects';
import Insights from '@/components/Insights';
import Contact from '@/components/Contact';
import TechStack from '@/components/TechStack';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-[1px] bg-primary mb-4"
            />
            <span className="text-[9px] font-headline uppercase tracking-[1em] text-primary opacity-60">Architecting Neural Nodes</span>
          </motion.div>
        )}
      </AnimatePresence>

      <NeuralBackground />

      <div className="main-container">
        <Hero />
        <About />
        <SystemThinking />
        <TechStack />
        <Projects />
        <Insights />
        <Contact />
      </div>

      <nav className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
        {['hero', 'about', 'system-thinking', 'projects', 'research', 'contact'].map((id) => (
          <a 
            key={id} 
            href={`#${id}`} 
            className="group flex items-center gap-4 justify-end"
          >
            <span className="text-[8px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {id.replace('-', ' ')}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
          </a>
        ))}
      </nav>

      <div className="fixed left-8 bottom-12 z-50 pointer-events-none hidden md:block">
        <div className="text-[9px] font-headline text-primary uppercase tracking-[0.5em] origin-left rotate-[-90deg] translate-y-[-100%] opacity-20">
          Neural Architecture v2.0 // AATIF KHAN
        </div>
      </div>
    </main>
  );
}
