import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';

export default function WelcomeStep() {
  const { t } = useTranslation('demo');
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-24 h-24 bg-gradient-to-r from-primary to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t('welcome.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('welcome.description')}
        </p>
      </motion.div>
    </div>
  );
}