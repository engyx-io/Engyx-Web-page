import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Zap, ShoppingCart, FileCode, BarChart2, ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { useTranslation } from 'react-i18next';
    import { Card } from '@/components/ui/card';

    export default function ServicesPage({ handleFeatureClick }) {
      const { t } = useTranslation();

      const services = [
        {
          icon: Zap,
          title: t("servicesPage.service1Title"),
          description: t("servicesPage.service1Desc"),
          color: "primary"
        },
        {
          icon: ShoppingCart,
          title: t("servicesPage.service2Title"),
          description: t("servicesPage.service2Desc"),
          color: "teal"
        },
        {
          icon: FileCode,
          title: t("servicesPage.service3Title"),
          description: t("servicesPage.service3Desc"),
          color: "green"
        },
        {
          icon: BarChart2,
          title: t("servicesPage.service4Title"),
          description: t("servicesPage.service4Desc"),
          color: "cyan"
        }
      ];

      const serviceStyles = {
        primary: {
          iconText: "text-primary",
        },
        teal: {
          iconText: "text-teal-500",
        },
        green: {
          iconText: "text-green-500",
        },
        cyan: {
          iconText: "text-cyan-500",
        }
      };

      return (
        <>
          <Helmet>
            <title>{t('servicesPage.metaTitle')}</title>
            <meta name="description" content={t('servicesPage.metaDescription')} />
          </Helmet>

          <div className="pt-24 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground title-glow">
                  {t('servicesPage.title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t('servicesPage.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                {services.map((service, index) => {
                  const styles = serviceStyles[service.color];
                  return (
                    <motion.div
                      key={index}
                      className="p-8 rounded-2xl border transition-all duration-300 flex flex-col cursor-pointer bg-card shadow-soft-md hover:shadow-soft-lg hover:-translate-y-2 hover:border-primary/50"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      onClick={handleFeatureClick}
                    >
                      <div className={`w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6`}>
                        <service.icon className={`w-7 h-7 ${styles.iconText}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-grow">
                        {service.description}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center"
              >
                <Card className="p-8 shadow-soft-lg bg-gradient-to-r from-primary/5 to-teal-500/5">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {t('servicesPage.ctaTitle')}
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    {t('servicesPage.ctaDesc')}
                  </p>
                  <Link to="/contact">
                    <Button
                      className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-600 text-white"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      {t('servicesPage.ctaButton')}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </div>
        </>
      );
    }