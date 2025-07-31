import React, { useMemo, useEffect, Suspense, useState, useCallback } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
    import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { toast } from '@/components/ui/use-toast';
    import { WalletProvider } from '@/contexts/WalletContext';
    import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import HomePage from '@/pages/HomePage';
    import ContactPage from '@/pages/ContactPage';
    import GetStartedPage from '@/pages/GetStartedPage';
    import DashboardPage from '@/pages/DashboardPage';
    import BlockchainPage from '@/pages/BlockchainPage';
    import PresalePage from '@/pages/PresalePage';
    import ProfilePage from '@/pages/ProfilePage';
    import DemoPage from '@/pages/DemoPage';
    import AboutPage from '@/pages/AboutPage';
    import ServicesPage from '@/pages/ServicesPage';
    import DigitalAssetsPage from '@/pages/DigitalAssetsPage';
    import AdminPage from '@/pages/AdminPage';
    import AdminLoginPage from '@/pages/AdminLoginPage';
    import AdminRoute from '@/components/admin/AdminRoute';
    import PrivateRoute from '@/components/PrivateRoute';
    import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
    import TermsPage from '@/pages/TermsPage';
    import CookiePolicyPage from '@/pages/CookiePolicyPage';
    import HelpCenterPage from '@/pages/HelpCenterPage';
    import MarketplacePage from '@/pages/MarketplacePage';
    import ProjectDetailsPage from '@/pages/ProjectDetailsPage';
    import ResetPasswordPage from '@/pages/ResetPasswordPage';
    import ProtectedPage from '@/pages/ProtectedPage';
    import BlogPage from '@/pages/BlogPage';
    import BlogPostPage from '@/pages/BlogPostPage';
    import FaqsPage from '@/pages/FaqsPage';
    import SumsubWebhooksPage from '@/pages/SumsubWebhooksPage';
    import CarbonCertificatePage from '@/pages/CarbonCertificatePage';
    import BlockchainNetworkBackground from '@/components/BlockchainNetworkBackground';
    import { useTranslation } from 'react-i18next';
    import Loader from '@/components/Loader';
    import { AnimatePresence } from 'framer-motion';

    import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
    import { WagmiConfig, useAccount, useSwitchNetwork } from 'wagmi';
    import { mainnet, arbitrum, bsc, bscTestnet, base, polygon } from 'wagmi/chains';
    import { sepoliaCustom } from '@/config';

    import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
    import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
    import { PhantomWalletAdapter, SolflareWalletAdapter, TrustWalletAdapter, CoinbaseWalletAdapter } from '@solana/wallet-adapter-wallets';
    import { clusterApiUrl } from '@solana/web3.js';
    import '@solana/wallet-adapter-react-ui/styles.css';
    import { supabase } from '@/lib/customSupabaseClient';
    import { AuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
    import { LoadScript } from '@react-google-maps/api';

    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const libraries = ['places', 'maps'];

    const projectId = '1c543d75436c30459f57634104555b2e';

    const metadata = {
      name: 'Engyx Digital Energy',
      description: 'Engyx Digital Energy - Tokenizing Digital Energy',
      url: 'https://engyx.io',
      icons: ['https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20Engyx%20Azul%20Sin%20Margen.png']
    };

    const chains = [mainnet, arbitrum, bsc, sepoliaCustom, bscTestnet, base, polygon];
    const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

    createWeb3Modal({ 
      wagmiConfig, 
      projectId, 
      chains,
      defaultChain: sepoliaCustom,
      featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
        '1ae92b26df02f0acd6098547a97c68a526ea99b857032b12544ac7ca07d35775', // Rainbow
        'fd20b726-8ae2-4b9b-82a0-3707ba6f4762' // Coinbase Wallet
      ],
      themeVariables: {
        '--w3m-accent': '#32d3a2',
        '--w3m-color-mix': '#FFFFFF',
        '--w3m-color-mix-strength': 40,
        '--w3m-font-family': 'Inter, sans-serif',
        '--w3m-border-radius-master': '1rem',
      }
    });

    function AuthCallback() {
      const navigate = useNavigate();
      const { user } = useAuth();

      useEffect(() => {
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/get-started');
        }
      }, [user, navigate]);

      return (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      );
    }

    function AppContent() {
      const location = useLocation();
      const navigate = useNavigate();
      const { t } = useTranslation('common');
      const { settings } = useSettings();
      const { chain } = useAccount();
      const { switchNetwork } = useSwitchNetwork();

      useEffect(() => {
        if (chain && chain.id !== sepoliaCustom.id) {
          toast({
            title: "Red incorrecta",
            description: "Por favor, cambia a la red de Sepolia para continuar.",
            action: (
              <button
                onClick={() => switchNetwork?.(sepoliaCustom.id)}
                className="px-3 py-1 text-sm text-white bg-primary rounded hover:bg-primary/90"
              >
                Cambiar Red
              </button>
            ),
          });
        }
      }, [chain, switchNetwork]);

      const showPresalePage = settings?.show_presale_page?.enabled ?? false;
      const isFullPageLayout = location.pathname.startsWith('/admin') || location.pathname.startsWith('/webhooks');
      
      useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'PASSWORD_RECOVERY') {
            navigate('/update-password');
          }
        });
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      }, [navigate]);

      const handleFeatureClick = useCallback(() => {
        toast({
          title: t('notification.featureNotImplementedTitle'),
          description: t('notification.featureNotImplementedDesc'),
        });
      }, [t]);
      
      return (
        <div className={`min-h-screen overflow-hidden relative flex flex-col`}>
          {!isFullPageLayout && location.pathname === '/' && <BlockchainNetworkBackground />}
          {!isFullPageLayout && <Header handleFeatureClick={handleFeatureClick} showPresalePage={showPresalePage} />}
          <main className="relative z-0 flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage handleFeatureClick={handleFeatureClick} />} />
                {showPresalePage && <Route path="/pre-sale" element={<PresalePage />} />}
                <Route path="/mercado" element={<PrivateRoute><MarketplacePage handleFeatureClick={handleFeatureClick} /></PrivateRoute>} />
                <Route path="/marketplace" element={<PrivateRoute><MarketplacePage handleFeatureClick={handleFeatureClick} /></PrivateRoute>} />
                <Route path="/project/:id" element={<PrivateRoute><ProjectDetailsPage handleFeatureClick={handleFeatureClick} /></PrivateRoute>} />
                <Route path="/blockchain" element={<BlockchainPage handleFeatureClick={handleFeatureClick} />} />
                <Route path="/contacto" element={<ContactPage handleFeatureClick={handleFeatureClick} />} />
                <Route path="/contact" element={<ContactPage handleFeatureClick={handleFeatureClick} />} />
                <Route path="/comenzar" element={<GetStartedPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage handleFeatureClick={handleFeatureClick} /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage handleFeatureClick={handleFeatureClick} /></PrivateRoute>} />
                <Route path="/protegida" element={<PrivateRoute><ProtectedPage /></PrivateRoute>} />
                <Route path="/demo" element={<DemoPage handleFeatureClick={handleFeatureClick} />} />
                <Route path="/sobre-nosotros" element={<AboutPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/servicios" element={<ServicesPage handleFeatureClick={handleFeatureClick} />} />
                <Route path="/services" element={<ServicesPage handleFeatureClick={handleFeatureClick} />} />
                <Route path="/digital-assets" element={<DigitalAssetsPage />} />
                <Route path="/activos-digitales" element={<DigitalAssetsPage />} />
                <Route path="/privacidad" element={<PrivacyPolicyPage />} />
                <Route path="/terminos" element={<TermsPage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/help-center" element={<HelpCenterPage />} />
                <Route path="/centro-de-ayuda" element={<HelpCenterPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                <Route path="/update-password" element={<ResetPasswordPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/faqs" element={<FaqsPage />} />
                <Route path="/webhooks" element={<AdminRoute><SumsubWebhooksPage /></AdminRoute>} />
                <Route path="/certify-carbon" element={<PrivateRoute><CarbonCertificatePage handleFeatureClick={handleFeatureClick} /></PrivateRoute>} />
              </Routes>
            </AnimatePresence>
          </main>
          {!isFullPageLayout && <Footer handleFeatureClick={handleFeatureClick} />}
          <Toaster />
        </div>
      )
    }

    function App() {
      const solanaNetwork = 'devnet';
      const endpoint = useMemo(() => clusterApiUrl(solanaNetwork), [solanaNetwork]);
      const solanaWallets = useMemo(
        () => [
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
          new TrustWalletAdapter(),
          new CoinbaseWalletAdapter(),
        ],
        []
      );
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
      }, []);

      return (
        <Suspense fallback={<Loader />}>
          <Router>
            <WagmiConfig config={wagmiConfig}>
              <ConnectionProvider endpoint={endpoint}>
                <SolanaWalletProvider wallets={solanaWallets} autoConnect>
                  <WalletModalProvider>
                    <AuthProvider>
                      <SettingsProvider>
                        <WalletProvider>
                          <LoadScript
                            id="google-maps-script"
                            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                            libraries={libraries}
                            loadingElement={<Loader />}
                          >
                            <AnimatePresence mode="wait">
                              {isLoading ? <Loader key="loader" /> : <AppContent key="content" />}
                            </AnimatePresence>
                          </LoadScript>
                          <SpeedInsights />
                          <Analytics />
                        </WalletProvider>
                      </SettingsProvider>
                    </AuthProvider>
                  </WalletModalProvider>
                </SolanaWalletProvider>
              </ConnectionProvider>
            </WagmiConfig>
          </Router>
        </Suspense>
      );
    }

    export default App;