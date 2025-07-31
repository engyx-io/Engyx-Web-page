import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Globe, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TokenizedAssetsSection() {
  const { t } = useTranslation('home');

  const assetTypes = [
    {
      icon: Zap,
      title: t('renewableEnergiesTitle'),
      description: t('renewableEnergiesDesc'),
    },
    {
      icon: Leaf,
      title: t('carbonCreditsTitle'),
      description: t('carbonCreditsDesc'),
    },
    {
      icon: Globe,
      title: t('sustainableInfrastructureTitle'),
      description: t('sustainableInfrastructureDesc'),
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
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
            {t('tokenizedAssetsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('tokenizedAssetsSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assetTypes.map((asset, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-soft-md text-center border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft-lg shadow-accent/30">
                <asset.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{asset.title}</h3>
              <p className="text-muted-foreground text-sm">{asset.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}