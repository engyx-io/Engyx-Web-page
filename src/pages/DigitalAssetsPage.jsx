import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Zap, Code, ShieldCheck, Home } from 'lucide-react';
    import { useTranslation } from 'react-i18next';
    import { Button } from '@/components/ui/button';

    const DigitalAssetsPage = () => {
      const { t } = useTranslation();

      const assets = [
        {
          icon: Zap,
          title: t('digitalAssetsPage.asset1Title'),
          description: t('digitalAssetsPage.asset1Desc'),
        },
        {
          icon: Code,
          title: t('digitalAssetsPage.asset2Title'),
          description: t('digitalAssetsPage.asset2Desc'),
        },
        {
          icon: ShieldCheck,
          title: t('digitalAssetsPage.asset3Title'),
          description: t('digitalAssetsPage.asset3Desc'),
        },
        {
          icon: Home,
          title: t('digitalAssetsPage.asset4Title'),
          description: t('digitalAssetsPage.asset4Desc'),
        },
      ];

      return (
        <>
          <Helmet>
            <title>{t('digitalAssetsPage.metaTitle')}</title>
            <meta name="description" content={t('digitalAssetsPage.metaDescription')} />
          </Helmet>
          <div className="pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-foreground title-glow">
                  {t('digitalAssetsPage.title')}
                </h1>
                <p className="text-lg text-foreground max-w-3xl mx-auto">
                  {t('digitalAssetsPage.subtitle')}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {assets.map((asset, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-8 rounded-xl flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 mb-6">
                      <asset.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{asset.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{asset.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-20 text-center glass-card p-10 rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('digitalAssetsPage.ctaTitle')}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t('digitalAssetsPage.ctaDesc')}</p>
                <Link to="/contact">
                  <Button size="lg">
                    {t('digitalAssetsPage.ctaButton')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </>
      );
    };

    export default DigitalAssetsPage;