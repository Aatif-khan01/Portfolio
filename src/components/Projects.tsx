
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Section from './Section';
import { getProjects } from '@/lib/firebase';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }: { project: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative flex-shrink-0 w-[300px] md:w-[450px] aspect-[4/5] snap-center rounded-2xl bg-card/20 border border-white/5 p-8 backdrop-blur-xl group overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-black">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
      </div>

      <div style={{ transform: "translateZ(60px)" }} className="h-full flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 2).map((tag: string) => (
              <span key={tag} className="text-[9px] font-headline uppercase tracking-widest text-primary/80 border border-primary/20 px-2 py-0.5 rounded backdrop-blur-md">
                {tag}
              </span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" className="text-primary opacity-60 hover:opacity-100 transition-opacity"><ExternalLink size={16}/></a>
          )}
        </div>

        <h4 className="text-2xl font-headline font-bold mb-4 text-white group-hover:text-primary transition-colors">{project.title}</h4>
        <p className="text-sm text-gray-200 mb-8 leading-relaxed font-light">
          {project.description}
        </p>

        <div style={{ transform: "translateZ(40px)" }} className="mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
          <div>
            <span className="block text-[8px] uppercase tracking-widest text-gray-400 mb-1">Architecture</span>
            <span className="text-[10px] font-bold text-white uppercase">{project.metrics?.architecture || 'Responsive Grid'}</span>
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-widest text-gray-400 mb-1">Performance</span>
            <span className="text-[10px] font-bold text-white uppercase">{project.metrics?.performance || '90+ Lighthouse'}</span>
          </div>
        </div>
      </div>
      
      {/* Dynamic Shine Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ 
          transform: "translateZ(100px)",
          background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 80%)"
        }}
      />
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then(data => {
      const enriched = data.map((p, i) => ({
        ...p,
        metrics: {
          architecture: i === 1 ? 'Event-Driven' : 'Modular SSR',
          performance: i === 1 ? '1.2s TTI' : '0ms CLS'
        }
      }));
      setProjects(enriched);
    });
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const width = containerRef.current.offsetWidth;
      const cardWidth = 300; // Mobile card width approx
      const gap = 24; // gap-6 is 24px
      
      // Calculate index based on scroll center
      const center = scrollLeft + (width / 2);
      const itemWidth = cardWidth + gap;
      // Offset by padding-left (px-6 = 24px)
      const index = Math.round((scrollLeft) / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), projects.length - 1));
    }
  };

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      const cardWidth = 300; // Mobile card width
      const gap = 24; // gap-6
      const itemWidth = cardWidth + gap;
      
      containerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <Section id="projects" fullWidth className="bg-transparent">
      <div className="px-6 md:px-12 mb-16">
        <h2 className="text-primary font-headline text-sm uppercase tracking-[0.5em] mb-4">Implementation</h2>
        <h3 className="text-4xl md:text-7xl font-headline font-bold">Project <span className="text-primary/40">Infrastructure.</span></h3>
      </div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto pb-12 gap-6 md:gap-12 px-6 md:px-12 no-scrollbar snap-x snap-mandatory items-center perspective-1000"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Mobile Scroll Indicators */}
      <div className="flex justify-center gap-3 mt-4 md:hidden">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'w-8 bg-primary' 
                : 'w-1.5 bg-primary/20 hover:bg-primary/40'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
