"use client";

import React from 'react';
import Section from './Section';
import { ArrowUpRight, Trophy, Briefcase, Medal } from 'lucide-react';

const milestones = [
  {
    title: "Python Developer Intern",
    subtitle: "Oasis Infobyte",
    date: "Dec 2024 – Jan 2025",
    type: "Experience",
    icon: Briefcase,
    description: "Developed automation programs and improved code optimization skills."
  },
  {
    title: "National Level Taekwondo Player",
    subtitle: "Sports Authority",
    date: "Active",
    type: "Achievement",
    icon: Trophy,
    description: "Competed at the highest national tier in martial arts."
  },
  {
    title: "State Medalist in Taekwondo",
    subtitle: "Jammu & Kashmir",
    date: "Award",
    type: "Achievement",
    icon: Medal,
    description: "Recognized for excellence in competitive sports at state level."
  }
];

const Research: React.FC = () => {
  return (
    <Section id="research" className="bg-background/80">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-primary font-headline text-lg uppercase tracking-widest mb-4">Milestones</h2>
        <h3 className="text-4xl md:text-6xl font-headline font-bold mb-16">Experience & Achievements</h3>
        
        <div className="space-y-1">
          {milestones.map((milestone, idx) => (
            <div 
              key={idx} 
              className="group border-t border-border py-8 hover:bg-white/5 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <milestone.icon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{milestone.type} • {milestone.date}</span>
                  </div>
                  <h4 className="text-2xl font-headline group-hover:text-primary transition-colors">{milestone.title}</h4>
                  <p className="text-muted-foreground mt-1">{milestone.subtitle}</p>
                  <p className="text-sm text-muted-foreground/60 mt-2">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </Section>
  );
};

export default Research;
