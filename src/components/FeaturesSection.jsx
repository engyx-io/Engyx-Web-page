import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Leaf, TrendingUp, Cpu, Globe, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FeaturesSection({ handleFeatureClick }) {
  const { t } = useTranslation('home');

  const mainFeature = {
    icon: Cpu,
    title: t('mainFeatureTitle'),
    description: t('mainFeatureDesc')
  };

  const sideFeatures = [
    {
      icon: Shield,
      title: t('feature1Title'),
      description: t('feature1Desc')
    },
    {
      icon: Leaf,
      title: t('feature2Title'),
      description: t('feature2Desc')
    },
    {
      icon: TrendingUp,
      title: t('feature3Title'),
      description: t('feature3Desc')
    },
    {
      icon: Layers,
      title: t('feature4Title'),
      description: t('feature4Desc')
    }
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
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-soft-md flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-primary to-teal-500 rounded-2xl flex items-center justify-center shadow-soft-lg shadow-primary/30">
              <mainFeature.icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {mainFeature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {mainFeature.description}
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            {sideFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-soft-md text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}