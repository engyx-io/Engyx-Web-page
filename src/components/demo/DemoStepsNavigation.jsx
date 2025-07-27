import React from 'react';
import { motion } from 'framer-motion';

export default function DemoStepsNavigation({ demoSteps, currentStep, handleStepClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
    >
      {demoSteps.map((step, index) => (
        <button
          key={index}
          onClick={() => handleStepClick(index)}
          className={`p-4 rounded-lg text-left transition-all duration-300 ${
            currentStep === index
              ? 'glass-card tech-border bg-primary/10 border-primary/50'
              : 'glass hover:bg-primary/5'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === index
                ? 'bg-primary text-white'
                : 'bg-primary/20 text-primary'
            }`}>
              {index + 1}
            </div>
            <h3 className="text-foreground font-semibold">{step.title}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{step.description}</p>
        </button>
      ))}
    </motion.div>
  );
}