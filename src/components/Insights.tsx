"use client";

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';

const Writing = [
  {
    title: "Why Evaluation Matters More Than Accuracy",
    date: "Feb 2025",
    read: "4 min",
    excerpt: "Exploring the nuances of model error analysis in production systems."
  },
  {
    title: "What I Learned Training My First Neural Network",
    date: "Jan 2025",
    read: "6 min",
    excerpt: "Backpropagation is more than just math—it's a lesson in patience."
  }
];

const Insights: React.FC = () => {
  return (
    <Section id="research" className="bg-transparent">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-primary font-headline text-sm uppercase tracking-[0.5em] mb-6">Technical Writing</h2>
        <h3 className="text-4xl md:text-6xl font-headline font-bold mb-12">Notes & Research</h3>
        
        <div className="space-y-0">
          {Writing.map((post, idx) => (
            <div key={idx} className="group border-t border-white/5 py-10 hover:bg-white/5 transition-colors px-6 -mx-6">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen size={10}/> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10}/> {post.read} read</span>
                  </div>
                  <h4 className="text-2xl font-headline group-hover:text-primary transition-colors mb-2">{post.title}</h4>
                  <p className="text-sm text-muted-foreground font-light">{post.excerpt}</p>
                </div>
                <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all"/>
              </div>
            </div>
          ))}
          <div className="border-t border-white/5" />
        </div>
      </div>
    </Section>
  );
};

export default Insights;
