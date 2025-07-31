import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import MarketplaceTabs from '@/components/marketplace/MarketplaceTabs';
import LaunchpadTab from '@/components/marketplace/LaunchpadTab';
import ExchangeTab from '@/components/marketplace/ExchangeTab';
import CarbonCreditsTab from '@/components/marketplace/CarbonCreditsTab';

export default function MarketplacePage({ handleFeatureClick }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('launchpad');
  const [tokens, setTokens] = useState([]);
  const [forSaleProjects, setForSaleProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isConnected, authStatus } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Protección para /marketplace
    if (location.pathname === '/marketplace' && (!isConnected || authStatus !== 'authenticated')) {
      navigate('/get-started', { replace: true });
    }
    // Protección para /mercado
    if (location.pathname === '/mercado' && (!isConnected || authStatus !== 'authenticated')) {
      navigate('/comenzar', { replace: true });
    }
  }, [isConnected, authStatus, navigate, location]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .not('digital_asset_symbol', 'is', null)
        .neq('digital_asset_symbol', '');

      const { data, error } = await query;
      
      if (error) throw error;

      const forSale = data.filter(p => p.status === 'for_sale');
      const otherTokens = data;

      const tokensWithMockStats = otherTokens.map(p => ({
        ...p,
        change24h: Math.random() * 10 - 5,
        volume24h: Math.random() * 1000000,
        marketCap: (p.tokens_available || 0) * (p.token_price || 0),
      }));

      setForSaleProjects(forSale);
      setTokens(tokensWithMockStats);

    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      toast({
        title: "Error al cargar los proyectos",
        description: "No se pudieron obtener los datos. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const renderContent = () => {
    switch (activeTab) {
      case 'launchpad':
        return <LaunchpadTab forSaleProjects={forSaleProjects} loading={loading} />;
      case 'exchange':
        return <ExchangeTab tokens={tokens} loading={loading} handleFeatureClick={handleFeatureClick} />;
      case 'carbon-credits':
        return <CarbonCreditsTab handleFeatureClick={handleFeatureClick} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('marketplace.metaTitle')}</title>
        <meta name="description" content={t('marketplace.metaDescription')} />
      </Helmet>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground title-glow">{t('marketplace.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('marketplace.subtitle')}
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <MarketplaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}