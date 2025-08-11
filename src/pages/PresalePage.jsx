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

          <section className="relative min-h-[80vh] flex flex-col justify-center items-center bg-white py-24 px-4 md:px-8">
            <div className="w-full max-w-6xl mx-auto space-y-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4" style={{ color: '#07c38' }}>
                  {t('presale.title')}
                </h1>
                <p className="text-lg md:text-2xl max-w-2xl mx-auto" style={{ color: '#32d3a2' }}>
                  {t('presale.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card p-6 md:p-8 rounded-2xl shadow-xl border" style={{ borderColor: '#32d3a2', background: '#fff' }}
              >
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-center space-x-2" style={{ color: '#32d3a2' }}>
                    <Timer className="w-6 h-6" style={{ color: '#32d3a2' }} />
                    <span>{t('presale.endsIn')}</span>
                  </h2>
                  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className="bg-gray-100 p-4 rounded-lg border" style={{ borderColor: '#32d3a2' }}>
                          <div className="text-3xl md:text-4xl font-bold mono" style={{ color: '#07c38' }}>{value.toString().padStart(2, '0')}</div>
                          <div className="text-xs capitalize mt-1" style={{ color: '#32d3a2' }}>{timeUnits[unit]}</div>
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
                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-primary/20 shadow-lg">
                      <WalletConnection />
                    </div>

                    {isConnected && (
                      <>
                        {authStatus === 'authenticated' && (
                          <>
                            {isLoadingStats ? (
                              <div className="glass-card p-8 rounded-2xl border border-primary/20 w-full max-w-md flex justify-center items-center h-[450px] bg-black/40">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            ) : presaleStats ? (
                              <PurchaseForm
                                presaleStats={presaleStats}
                                onPurchase={handlePurchase}
                              />
                            ) : (
                              <div className="glass-card p-8 rounded-2xl border border-red-500/40 w-full max-w-md flex justify-center items-center h-[450px] bg-black/40">
                                <p className="text-center text-red-400">{t('presale.statsError')}</p>
                              </div>
                            )}
                          </>
                        )}
                        {authStatus === 'connected_unauthenticated' && (
                          <div className="glass-card p-6 md:p-8 rounded-2xl border border-primary/20 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-2 text-center">{t('presale.completeConnection')}</h3>
                            <p className="text-center text-sm text-muted-foreground mb-6">{t('presale.completeConnectionDesc')}</p>
                            <AuthForm />
                          </div>
                        )}
                        {authStatus === 'pending' && (
                          <div className="glass-card p-8 rounded-2xl border border-primary/20 w-full max-w-md flex justify-center items-center h-[450px] bg-black/40">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                className="glass-card p-6 md:p-8 rounded-2xl border border-primary/20 shadow-lg bg-gradient-to-r from-blue-900/10 to-cyan-900/10"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="text-primary font-semibold">{t('presale.securityTitle')}</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>{t('presale.securityDesc1')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>{t('presale.securityDesc2')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>{t('presale.securityDesc3')}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>
        </>
      );
    }