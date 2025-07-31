import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Coins, ChevronDown, ChevronUp, Shield, Globe, Cpu, Download, ArrowRight, Map, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import WhitepaperSection from '@/components/blockchain/WhitepaperSection';
import TokenomicsSection from '@/components/blockchain/TokenomicsSection';
import RoadmapSection from '@/components/blockchain/RoadmapSection';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function BlockchainPage({
  handleFeatureClick
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    user
  } = useAuth();
  const {
    isConnected
  } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    t
  } = useTranslation(['translation', 'roadmap', 'tokenomics']);
  const handleDownloadWhitepaper = async e => {
    e?.stopPropagation();
    if (!user || !isConnected) {
      toast({
        title: t('blockchainPage.restrictedAccessTitle'),
        description: t('blockchainPage.restrictedAccessDesc'),
        variant: "destructive"
      });
      navigate('/comenzar', {
        state: {
          from: location
        }
      });
      return;
    }
    setIsDownloading(true);
    try {
      const {
        data: docData,
        error: docError
      } = await supabase.from('documents').select('file_path').ilike('name', '%whitepaper%').order('created_at', {
        ascending: false
      }).limit(1).single();
      if (docError || !docData) {
        throw new Error("Whitepaper not found or error fetching path.");
      }
      const {
        data: urlData,
        error: urlError
      } = await supabase.storage.from('general_documents').createSignedUrl(docData.file_path, 60);
      if (urlError || !urlData) {
        throw new Error("Could not get a secure URL for the whitepaper.");
      }
      window.open(urlData.signedUrl, '_blank');
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: t('blockchainPage.downloadErrorTitle'),
        description: t('blockchainPage.downloadErrorDesc'),
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  return <>
      <Helmet>
        <title>{t('blockchainPage.metaTitle')}</title>
        <meta name="description" content={t('blockchainPage.metaDescription')} />
      </Helmet>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground title-glow">{t('blockchainPage.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('blockchainPage.subtitle')}
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="shadow-soft-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('blockchainPage.securityTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t('blockchainPage.securityDesc')}</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('blockchainPage.decentralizationTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t('blockchainPage.decentralizationDesc')}</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('blockchainPage.scalabilityTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t('blockchainPage.scalabilityDesc')}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="mb-16">
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1" className="border rounded-xl shadow-soft-md mb-4 px-4">
                <AccordionTrigger className="text-2xl font-bold text-foreground hover:no-underline">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h2 className="text-2xl font-bold text-foreground">Whitepaper</h2>
                      <p className="text-sm text-muted-foreground">Complete technical documentation of the ENGYX</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6">
                  <WhitepaperSection onDownload={handleDownloadWhitepaper} isDownloading={isDownloading} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-xl shadow-soft-md mb-4 px-4">
                <AccordionTrigger className="text-2xl font-bold text-foreground hover:no-underline">
                   <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Coins className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h2 className="text-2xl font-bold text-foreground">Tokenomics $ENGYX</h2>
                      <p className="text-sm text-muted-foreground">Distribution and utility of the native token - 1B tokens</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6">
                  <TokenomicsSection />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-xl shadow-soft-md px-4">
                <AccordionTrigger className="text-2xl font-bold text-foreground hover:no-underline">
                   <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Map className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h2 className="text-2xl font-bold text-foreground">Roadmap</h2>
                      <p className="text-sm text-muted-foreground">Here is our development plan</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-8">
                  <RoadmapSection />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>


        </div>
      </div>
    </>;
}