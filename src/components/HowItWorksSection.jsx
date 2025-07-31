import React from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, Download, Repeat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HowItWorksSection() {
  const { t } = useTranslation('home');

  const steps = [
    {
      icon: Search,
      title: t('step1Title'),
      description: t('step1Desc'),
    },
    {
      icon: DollarSign,
      title: t('step2Title'),
      description: t('step2Desc'),
    },
    {
      icon: Download,
      title: t('step3Title'),
      description: t('step3Desc'),
    },
    {
      icon: Repeat,
      title: t('step4Title'),
      description: t('step4Desc'),
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(135deg, #30d3a2 0%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {t('howItWorksTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('howItWorksSubtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-soft-md text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-lg shadow-accent/30">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}