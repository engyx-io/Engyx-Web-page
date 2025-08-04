import React from 'react';
    import { Helmet } from 'react-helmet';
    import { useTranslation } from 'react-i18next';
    import HeroSection from '@/components/HeroSection';
    import FeaturesSection from '@/components/FeaturesSection';
// import ServicesSection from '@/components/ServicesSection';
    import HowItWorksSection from '@/components/HowItWorksSection';
    import CTASection from '@/components/CTASection';
    import TokenizedAssetsSection from '@/components/TokenizedAssetsSection';

    export default function HomePage({ handleFeatureClick }) {
      const { t } = useTranslation('home');

      return (
        <>
          <Helmet>
            <title>{t('metaTitle')} - Engyx Digital Assets</title>
            <meta name="description" content={t('metaDescription')} />
          </Helmet>

          <HeroSection handleFeatureClick={handleFeatureClick} />
          <TokenizedAssetsSection />
          <FeaturesSection handleFeatureClick={handleFeatureClick} />
          <HowItWorksSection />
          {/* <ServicesSection handleFeatureClick={handleFeatureClick} /> */}
          <CTASection handleFeatureClick={handleFeatureClick} />
        </>
      );
    }