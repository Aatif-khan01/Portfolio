
"use client";

import React from 'react';
import Section from './Section';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SystemSteps = [
  { label: "Data", desc: "Curation & Versioning" },
  { label: "Model", desc: "Architecture Selection" },
  { label: "Evaluation", desc: "Robust Stress Testing" },
  { label: "Deployment", desc: "Scalable Infrastructure" },
  { label: "Monitoring", desc: "Drift & Performance" }
];

const StepCard = ({ step, index }: { step: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group"
    >
      <div className="bg-card/30 border border-white/5 p-6 rounded-lg backdrop-blur-md group-hover:border-primary/40 transition-all">
        <div style={{ transform: "translateZ(20px)" }}>
          <span className="block text-[10px] text-primary mb-2 opacity-50 font-code">0{index + 1}</span>
          <h4 className="font-headline font-bold text-lg mb-1">{step.label}</h4>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{step.desc}</p>
        </div>
      </div>
      {index < 4 && (
        <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[1px] bg-primary/20 -translate-y-1/2" />
      )}
    </motion.div>
  );
};

const SystemThinking: React.FC = () => {
  return (
    <Section id="system-thinking" className="bg-transparent">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-primary font-headline text-sm uppercase tracking-[0.5em] mb-6">System Architecture</h2>
        <h3 className="text-4xl md:text-6xl font-headline font-bold mb-16">How I Think About <br/><span className="text-primary/60">AI Systems.</span></h3>
        
        <div className="grid md:grid-cols-5 gap-4 mb-20 perspective-1000">
          {SystemSteps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h4 className="text-2xl font-headline font-bold">The Engineering Philosophy</h4>
            <div className="space-y-6">
              <div className="flex gap-6 group">
                <span className="text-primary font-code text-xl group-hover:scale-110 transition-transform">01</span>
                <div>
                  <h5 className="font-headline font-bold uppercase text-xs tracking-widest mb-1 group-hover:text-primary transition-colors">Tradeoffs &gt; Accuracy</h5>
                  <p className="text-sm text-muted-foreground">Highest accuracy isn't always the goal. I optimize for cost, latency, and maintainability.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <span className="text-primary font-code text-xl group-hover:scale-110 transition-transform">02</span>
                <div>
                  <h5 className="font-headline font-bold uppercase text-xs tracking-widest mb-1 group-hover:text-primary transition-colors">Reproducibility Matters</h5>
                  <p className="text-sm text-muted-foreground">Research is useless if it can't be replicated. Versioned data and seeds are non-negotiable.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary/5 p-8 border border-primary/10 rounded-xl flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-center relative z-10">
              <p className="text-primary font-headline text-lg italic mb-2">"Complexity is the enemy of reliability."</p>
              <p className="text-[10px] uppercase tracking-widest opacity-40">— Engineering Principle</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default SystemThinking;
