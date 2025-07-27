import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShoppingCart, GitPullRequest, BarChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ServicesSection({ handleFeatureClick }) {
  const { t } = useTranslation('home');

  const services = [
    {
      icon: Layers,
      title: t('service1Title'),
      description: t('service1Desc'),
    },
    {
      icon: ShoppingCart,
      title: t('service2Title'),
      description: t('service2Desc'),
    },
    {
      icon: GitPullRequest,
      title: t('service3Title'),
      description: t('service3Desc'),
    },
    {
      icon: BarChart,
      title: t('service4Title'),
      description: t('service4Desc'),
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">{t('servicesTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-soft-md text-center border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-lg shadow-accent/30">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}