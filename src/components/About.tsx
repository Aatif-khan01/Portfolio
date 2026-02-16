
"use client";

import React from 'react';
import Section from './Section';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ResearchFocus = [
  {
    title: "Model Evaluation & Error Analysis",
    desc: "Developing robust frameworks for measuring AI performance beyond simple accuracy, focusing on edge-case discovery."
  },
  {
    title: "Efficient & Scalable ML Systems",
    desc: "Optimizing model throughput and latency for deployment in resource-constrained real-world environments."
  },
  {
    title: "Applied AI with Real-World Constraints",
    desc: "Bridging the gap between research-grade models and production-ready systems that solve actual business logic."
  }
];

const FocusCard = ({ focus, index }: { focus: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group border-l border-primary/20 pl-8 py-6 hover:border-primary transition-all bg-white/[0.02] rounded-r-xl backdrop-blur-sm"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <h4 className="font-headline font-bold text-xl mb-2 group-hover:text-primary transition-colors">{focus.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{focus.desc}</p>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-transparent">
      <div className="space-y-32">
        {/* Research Direction Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-headline text-sm uppercase tracking-[0.5em] mb-6">Research Direction</h2>
            <h3 className="text-4xl md:text-6xl font-headline font-bold mb-10 leading-tight">
              I’m interested in building AI systems that are <span className="text-primary text-glow italic">measurable, reliable, and scalable.</span>
            </h3>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
              Currently a B.Tech CSE student at CUK (2024–2028). My work avoids tutorial-level shallow implementation, focusing instead on the long-term depth of neural architectures.
            </p>
          </motion.div>
          
          <div className="space-y-8 perspective-1000">
            {ResearchFocus.map((focus, i) => (
              <FocusCard key={i} focus={focus} index={i} />
            ))}
          </div>
        </div>

        {/* Currently Building Indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border-y border-white/5 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
              <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full" />
            </div>
            <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary">Currently Building</span>
          </div>
          <div className="flex flex-wrap gap-8 justify-center text-[10px] md:text-xs uppercase tracking-widest font-body opacity-60">
            <span>Learning PyTorch Deeply</span>
            <span>Studying Model Evaluation Techniques</span>
            <span>Targeting GSoC 2026</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
