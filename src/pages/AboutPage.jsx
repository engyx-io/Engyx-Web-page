import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Rocket, Leaf, Shield, Users, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Rocket,
      title: t('aboutPage.values.innovation.title'),
      description: t('aboutPage.values.innovation.description')
    },
    {
      icon: Leaf,
      title: t('aboutPage.values.sustainability.title'),
      description: t('aboutPage.values.sustainability.description')
    },
    {
      icon: Shield,
      title: t('aboutPage.values.transparency.title'),
      description: t('aboutPage.values.transparency.description')
    },
    {
      icon: Users,
      title: t('aboutPage.values.community.title'),
      description: t('aboutPage.values.community.description')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('aboutPage.metaTitle')}</title>
        <meta name="description" content={t('aboutPage.metaDescription')} />
      </Helmet>
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground title-glow">{t('aboutPage.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('aboutPage.subtitle')}
            </p>
          </motion.div>

          <Card className="mb-20 p-8 md:p-12 shadow-soft-lg">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                <Rocket className="w-8 h-8 mr-3 text-primary" />
                {t('aboutPage.mission.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                {t('aboutPage.mission.description')}
              </p>
              <h2 className="text-3xl font-bold text-foreground mb-6 mt-10 flex items-center">
                <Eye className="w-8 h-8 mr-3 text-primary" />
                {t('aboutPage.vision.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('aboutPage.vision.description')}
              </p>
            </motion.div>
          </Card>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">{t('aboutPage.values.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-card p-6 rounded-2xl text-center border hover:-translate-y-2 transition-transform duration-300 shadow-soft-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}