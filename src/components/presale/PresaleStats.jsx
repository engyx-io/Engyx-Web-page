import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PresaleStats() {
  const { t } = useTranslation();
  const [presaleStats, setPresaleStats] = useState({
    raised: 0,
    target: 300000,
    participants: 0,
    currentPrice: 0.03,
    launchPrice: 0.10,
    discount: 70,
    totalTokens: 10000000,
    tokensRemaining: 10000000
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchPresaleStats();
    const interval = setInterval(fetchPresaleStats, 30000);
    return () => clearInterval(interval);
  }, []);
  const fetchPresaleStats = async () => {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching presale stats:', error);
      setIsLoading(false);
    }
  };
  const progressPercentage = Math.min(presaleStats.raised / presaleStats.target * 100, 100);
  const tokensSold = Math.floor(presaleStats.raised / presaleStats.currentPrice);
  const tokensRemaining = presaleStats.totalTokens - tokensSold;
  return <div className="glass-card p-6 rounded-xl presale-highlight" style={{ color: '#071c38' }}>
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold" style={{ color: '#071c38' }}>{t('presale.statsTitle')}</h3>
            {isLoading && <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: '#071c38' }}>{t('presale.statsProgress')}</span>
                <span className="mono" style={{ color: '#071c38' }}>
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <motion.div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000" initial={{
                width: 0
              }} animate={{
                width: `${progressPercentage}%`
              }} transition={{
                duration: 1.5,
                ease: "easeOut"
              }} />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="mono" style={{ color: '#071c38' }}>${presaleStats.raised.toLocaleString()}</span>
                <span style={{ color: '#071c38' }}>${presaleStats.target.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20" whileHover={{
              scale: 1.02
            }}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <p className="text-2xl font-bold mono" style={{ color: '#071c38' }}>{presaleStats.participants}</p>
                </div>
                <p className="text-sm" style={{ color: '#071c38' }}>{t('presale.statsParticipants')}</p>
              </motion.div>
              
              <motion.div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20" whileHover={{
              scale: 1.02
            }}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <p className="text-2xl font-bold mono" style={{ color: '#071c38' }}>${presaleStats.currentPrice}</p>
                </div>
                <p className="text-sm" style={{ color: '#071c38' }}>{t('presale.statsCurrentPrice')}</p>
              </motion.div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span style={{ color: '#071c38' }}>{t('presale.statsTokensSold')}</span>
                <span className="mono" style={{ color: '#071c38' }}>{tokensSold.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#071c38' }}>{t('presale.statsTokensAvailable')}</span>
                <span className="mono" style={{ color: '#071c38' }}>{tokensRemaining.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#071c38' }}>{t('presale.statsCurrentDiscount')}</span>
                <span className="mono font-bold" style={{ color: '#071c38' }}>{presaleStats.discount}%</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="font-medium" style={{ color: '#071c38' }}>{t('presale.statsLimitedSupply')}</span>
              </div>
              <p className="text-sm mb-2" style={{ color: '#071c38' }}>{t('presale.statsLimitedSupplyDesc')}</p>
              <div className="w-full bg-yellow-500/20 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full transition-all duration-1000" style={{
                width: `${tokensSold / presaleStats.totalTokens * 100}%`
              }} />
              </div>
            </div>

            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="font-medium" style={{ color: '#071c38' }}>{t('presale.statsLaunchPriceDiscount')}</span>
              </div>
              <p className="text-sm" style={{ color: '#071c38' }}>
                {t('presale.statsLaunchPriceDiscountDesc', { launchPrice: presaleStats.launchPrice, discount: presaleStats.discount })}
              </p>
            </div>
          </div>
        </div>;
}