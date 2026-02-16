"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, className, children, fullWidth = false }) => {
  return (
    <section
      id={id}
      className={cn(
        "section-wrapper py-32 md:py-40 justify-center",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "w-full mx-auto flex flex-col justify-center",
          !fullWidth && "max-w-7xl px-6 md:px-12"
        )}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
