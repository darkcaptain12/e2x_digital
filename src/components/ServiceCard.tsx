"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-card border border-muted p-8 rounded-3xl hover:border-primary/50 transition-all group relative overflow-hidden glow-hover"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />

      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-primary/30">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-foreground/60 leading-relaxed text-lg group-hover:text-foreground/80 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}
