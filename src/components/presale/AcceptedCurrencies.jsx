import React from 'react';
    import { motion } from 'framer-motion';
    import { useTranslation } from 'react-i18next';

    const currencies = [
      { name: 'Bitcoin', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/4a29a5c8846c9c614b8f395f1c50401b.svg' },
      { name: 'Ethereum', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/f2597f54c2a4af3624e75d496e57cb76.svg' },
      { name: 'USDC', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/2908f4306478988a0429715ac905476a.svg' },
      { name: 'USDT', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/f8e4e976f6b71f97305373a69766b19a.svg' },
      { name: 'Solana', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/b3781e5564f81c9641770b77c5c165d7.svg' },
      { name: 'BNB', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/9c8928b9a18484f277f3608154e288e0.svg' },
      { name: 'Cardano', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/8e7a02c525f0e9b6a1e3e7b1a20e2d5f.svg' },
      { name: 'DAI', icon: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/6c8a3c861e6f4f2c5e5b3c5a5e3a7f8b.svg' },
    ];

    export default function AcceptedCurrencies() {
      const { t } = useTranslation();
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

      return (
        <div className="glass-card p-6 rounded-xl presale-highlight">
          <h3 className="text-xl font-bold text-emerald-100 mb-4 text-center">{t('presale.acceptedCurrencies')}</h3>
          <motion.div 
            className="grid grid-cols-4 md:grid-cols-8 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currencies.map((currency) => (
              <motion.div 
                key={currency.name}
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-all duration-300">
                    <img src={currency.icon} alt={currency.name} className="w-6 h-6" />
                </div>
                <p className="text-xs text-emerald-200/70">{currency.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      );
    }