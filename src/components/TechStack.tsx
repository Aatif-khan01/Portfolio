"use client";

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { 
  SiMysql, 
  SiGithub, 
  SiTypescript, 
  SiReact, 
  SiTailwindcss,
  SiNextdotjs,
  SiPython,
  SiFirebase,
  SiScikitlearn,
  SiNumpy,
  SiPandas
} from 'react-icons/si';
import { Brain, Cpu, LineChart } from 'lucide-react';

const technologies = [
  { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
  { icon: SiGithub, name: 'Git & GitHub', color: '#ffffff' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
  { icon: SiPython, name: 'Python', color: '#3776AB' },
  { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
  { icon: SiScikitlearn, name: 'Scikit-learn', color: '#F7931E' },
  { icon: SiNumpy, name: 'NumPy', color: '#013243' },
  { icon: SiPandas, name: 'Pandas', color: '#150458' },
  { icon: LineChart, name: 'Matplotlib', color: '#11557c' },
  { icon: Brain, name: 'Deep Learning', color: '#FF6F61' },
  { icon: Cpu, name: 'Machine Learning', color: '#4ADE80' },
];

const TechStack: React.FC = () => {
  return (
    <Section id="tech-stack" className="bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Core Technologies</h2>
        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
          Tools and technologies I use to design, build, and maintain scalable and production-ready applications.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {/* Double the list to create seamless loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group"
            >
              <tech.icon 
                size={40} 
                className="mb-3 transition-colors duration-300 group-hover:scale-110" 
                color={tech.color}
                style={{ filter: "grayscale(100%) brightness(1.2)" }} // Initially grayscale
                onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.color = tech.color;
                }}
                onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
                    e.currentTarget.style.filter = "grayscale(100%) brightness(1.2)";
                    e.currentTarget.style.color = ""; // Revert to inherited or default
                }}

              />
              <span className="text-xs font-headline uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TechStack;
