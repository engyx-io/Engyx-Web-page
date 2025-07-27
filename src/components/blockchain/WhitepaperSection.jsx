import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function WhitepaperSection({ onDownload, isDownloading }) {
  const { t } = useTranslation();

  const whitepaperSections = [
    {
      title: t("blockchainPage.whitepaper.s1_title"),
      content: t("blockchainPage.whitepaper.s1_content")
    },
    {
      title: t("blockchainPage.whitepaper.s2_title"),
      content: t("blockchainPage.whitepaper.s2_content")
    },
    {
      title: t("blockchainPage.whitepaper.s3_title"),
      content: t("blockchainPage.whitepaper.s3_content")
    },
    {
      title: t("blockchainPage.whitepaper.s4_title"),
      content: t("blockchainPage.whitepaper.s4_content")
    },
    {
      title: t("blockchainPage.whitepaper.s5_title"),
      content: t("blockchainPage.whitepaper.s5_content")
    },
    {
      title: t("blockchainPage.whitepaper.s6_title"),
      content: t("blockchainPage.whitepaper.s6_content")
    }
  ];

  return (
    <div className="space-y-6">
      {whitepaperSections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-background/5 rounded-lg border border-border/10 hover:bg-background/10 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">{section.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{section.content}</p>
        </motion.div>
      ))}
      
      <div className="flex justify-center pt-4">
        <Button
          onClick={onDownload}
          disabled={isDownloading}
          className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-600 text-white"
        >
          {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ExternalLink className="w-4 h-4 mr-2" />}
          {isDownloading ? t('blockchainPage.loadingPDF') : t('blockchainPage.viewFullWhitepaper')}
        </Button>
      </div>
    </div>
  );
}