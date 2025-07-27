import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VerificationPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const verificationUrl = 'https://in.sumsub.com/websdk/p/sbx_uni_AL8Y3rAD946QY5AH';
    window.location.href = verificationUrl;
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('verificationPage.metaTitle')}</title>
        <meta name="description" content={t('verificationPage.metaDescription')} />
      </Helmet>
      <div className="flex flex-col justify-center items-center h-screen bg-[#04091A] text-white">
        <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
        <h1 className="text-2xl font-bold">{t('verificationPage.loading.title')}</h1>
        <p className="text-lg text-blue-200">{t('verificationPage.loading.description')}</p>
      </div>
    </>
  );
}