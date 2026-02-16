
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Section from './Section';

const DeploymentNodes = [
  {
    label: "Academic Node",
    desc: "B.Tech CSE, CUK (2024–2028). Researching scalable systems."
  },
  {
    label: "Industrial Layer",
    desc: "Python Developer Intern @ Oasis Infobyte. Automation & Logic."
  },
  {
    label: "Physical Layer",
    desc: "National Level Taekwondo. High-performance mindset."
  }
];

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Card 3D Animation Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeaveCard = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, []);

  return (
    <Section id="hero" className="relative bg-transparent overflow-visible min-h-screen flex items-center pt-24 md:pt-0">
      <div className="z-10 relative grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column: Name & Bio */}
        <div className="perspective-1000 order-1">
          <motion.div
            animate={{ 
              x: mousePos.x * 0.1, 
              y: mousePos.y * 0.1 
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="text-5xl md:text-8xl xl:text-9xl font-headline font-bold leading-[0.85] tracking-tighter mb-4"
            >
              AATIF MUNEEB <br />
              <span className="text-transparent stroke-text opacity-40">KHAN</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-[1px] bg-primary/60" />
              <span className="text-primary font-headline text-[11px] md:text-sm uppercase tracking-[0.8em] whitespace-nowrap">
                AI / ML Engineer
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="max-w-xl text-lg text-muted-foreground font-body leading-relaxed border-l border-primary/20 pl-8"
            >
              <p className="mb-8 font-light tracking-tight">
                Building intelligent systems with <span className="text-white font-medium">discipline and depth</span>.
              </p>
              <div className="flex gap-12 text-[9px] uppercase tracking-[0.4em] font-headline opacity-60">
                <div className="flex flex-col gap-1">
                  <span className="text-primary">Focus</span>
                  <span className="text-white">Neural Reliability</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary">Status</span>
                  <span className="text-white">Research Active</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Deployment Profile Card */}
        <div className="flex justify-center lg:justify-end order-2">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: isHovered ? 0 : [0, -10, 0] 
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMoveCard}
            onMouseLeave={handleMouseLeaveCard}
            style={{ 
              rotateY, 
              rotateX, 
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden"
            }}
            transition={{ 
              duration: isHovered ? 0.3 : 4,
              repeat: isHovered ? 0 : Infinity,
              ease: "easeInOut",
              opacity: { duration: 1.2, delay: 0.5 }
            }}
            className="relative perspective-1000 w-full max-w-[340px] will-change-transform"
          >
            <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl group overflow-hidden antialiased">
              <h2 className="text-primary font-headline text-[10px] uppercase tracking-[0.5em] mb-8 opacity-80" style={{ transform: "translateZ(30px)" }}>
                Deployment Profile
              </h2>
              
              <div className="space-y-8" style={{ transform: "translateZ(40px)" }}>
                {DeploymentNodes.map((node, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/5 group/node">
                    <div className="absolute left-0 top-0 w-[1px] h-0 bg-primary group-hover/node:h-full transition-all duration-500" />
                    <h4 className="font-headline font-bold text-sm text-white mb-1">{node.label}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                      {node.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5" style={{ transform: "translateZ(30px)" }}>
                <h5 className="font-headline text-[8px] uppercase tracking-widest text-primary mb-3 opacity-40">System Inventory</h5>
                <div className="flex flex-wrap gap-2">
                  {['Teamwork', 'Adaptability', 'Boxing', 'Film Making'].map(s => (
                    <span key={s} className="text-[7px] uppercase tracking-widest opacity-30 px-2 py-1 bg-white/5 rounded border border-white/5">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Subtle Shine - Fixed 'whitish' issue by reducing opacity significantly */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ transform: "translateZ(100px)" }}
              />
            </div>
            
            {/* Decorative Side Accents */}
            <div className="absolute -right-4 top-1/4 hidden md:flex flex-col gap-4 opacity-20" style={{ transform: "translateZ(-20px)" }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
