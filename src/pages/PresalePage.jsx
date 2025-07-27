import React, { useState, useEffect, useMemo } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Timer, Shield, Zap } from 'lucide-react';
    import { toast } from '@/components/ui/use-toast';
    import { useTranslation } from 'react-i18next';
    import { useWallet } from '@/contexts/WalletContext';
    import PresaleStats from '@/components/presale/PresaleStats';
    import PresaleBenefits from '@/components/presale/PresaleBenefits';
    import PurchaseForm from '@/components/presale/PurchaseForm';
    import WalletConnection from '@/components/dashboard/WalletConnection';
    import PresaleFAQ from '@/components/presale/PresaleFAQ';
    import { supabase } from '@/lib/customSupabaseClient';
    import AuthForm from '@/components/auth/AuthForm';

    const calculateTimeLeft = (endDate) => {
      const difference = +new Date(endDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return timeLeft;
    };

    export default function PresalePage() {
      const { t } = useTranslation();
      const { isConnected, authStatus } = useWallet();
      
      const [presaleStats, setPresaleStats] = useState(null);
      const [isLoadingStats, setIsLoadingStats] = useState(true);

      const presaleEndDate = useMemo(() => new Date('2025-06-01T04:00:00.000Z'), []);
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(presaleEndDate));

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft(presaleEndDate));
        }, 1000);

        const fetchPresaleStats = async () => {
          setIsLoadingStats(true);
          const { data, error } = await supabase
            .from('presale_stats')
            .select('*')
            .eq('id', 1)
            .single();

          if (error) {
            console.error('Error fetching presale stats:', error);
            toast({
              title: t('common.error'),
              description: t('presale.statsError'),
              variant: "destructive",
            });
          } else {
            setPresaleStats(data);
          }
          setIsLoadingStats(false);
        };

        fetchPresaleStats();

        return () => clearInterval(timer);
      }, [presaleEndDate, t]);

      const handlePurchase = () => {
        console.log('Purchase flow initiated.');
      };

      const timeUnits = {
        days: t('presale.days'),
        hours: t('presale.hours'),
        minutes: t('presale.minutes'),
        seconds: t('presale.seconds'),
      };

      return (
        <>
          <Helmet>
            <title>{t('presale.metaTitle')} - ENGYX</title>
            <meta name="description" content={t('presale.metaDescription')} />
          </Helmet>

          <div className="pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-6xl space-y-12">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent presale-neon-text">
                  {t('presale.title')}
                </h1>
                <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                  {t('presale.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card p-6 rounded-xl presale-highlight bg-gradient-to-br from-blue-500/10 via-black to-cyan-500/10"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-emerald-100 mb-4 flex items-center justify-center space-x-2">
                    <Timer className="w-6 h-6 text-blue-400" />
                    <span>{t('presale.endsIn')}</span>
                  </h2>
                  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                          <div className="text-4xl font-bold text-blue-400 mono">{value.toString().padStart(2, '0')}</div>
                          <div className="text-blue-200/70 text-xs capitalize mt-1">{timeUnits[unit]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:col-span-2 space-y-8"
                >
                  <div className="sticky top-24 space-y-8">
                    <div className="glass-card p-6 rounded-xl presale-highlight">
                      <WalletConnection />
                    </div>

                    {isConnected && (
                      <>
                        {authStatus === 'authenticated' && (
                          <>
                            {isLoadingStats ? (
                              <div className="glass-card p-8 rounded-2xl tech-border w-full max-w-md flex justify-center items-center h-[450px] presale-highlight">
                                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            ) : presaleStats ? (
                              <PurchaseForm
                                presaleStats={presaleStats}
                                onPurchase={handlePurchase}
                              />
                            ) : (
                              <div className="glass-card p-8 rounded-2xl tech-border w-full max-w-md flex justify-center items-center h-[450px] presale-highlight">
                                <p className="text-center text-red-400">{t('presale.statsError')}</p>
                              </div>
                            )}
                          </>
                        )}
                        {authStatus === 'connected_unauthenticated' && (
                          <div className="glass-card p-6 rounded-xl presale-highlight">
                            <h3 className="text-xl font-bold text-emerald-100 mb-2 text-center">{t('presale.completeConnection')}</h3>
                            <p className="text-center text-sm text-emerald-200/80 mb-6">{t('presale.completeConnectionDesc')}</p>
                            <AuthForm />
                          </div>
                        )}
                        {authStatus === 'pending' && (
                          <div className="glass-card p-8 rounded-2xl tech-border w-full max-w-md flex justify-center items-center h-[450px] presale-highlight">
                            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="lg:col-span-3 space-y-8"
                >
                  <PresaleStats />
                  <PresaleBenefits />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <PresaleFAQ />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="glass-card p-6 rounded-xl presale-highlight bg-gradient-to-r from-blue-500/5 to-cyan-500/5"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h3 className="text-emerald-100 font-semibold">{t('presale.securityTitle')}</h3>
                </div>
                <ul className="space-y-2 text-emerald-200/80 text-sm">
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>{t('presale.securityDesc1')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>{t('presale.securityDesc2')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>{t('presale.securityDesc3')}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </>
      );
    }