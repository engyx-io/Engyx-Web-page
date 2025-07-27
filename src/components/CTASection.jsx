import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ArrowRight } from 'lucide-react';
    import { useTranslation } from 'react-i18next';

    export default function CTASection({ handleFeatureClick }) {
      const { t } = useTranslation('home');

      return (
        <section className="py-24 px-6 bg-gray-50">
          <div className="container mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-primary to-teal-500 rounded-3xl p-12 md:p-16 text-center text-white shadow-soft-xl shadow-primary/40"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('ctaTitle')}</h2>
              <p className="text-xl max-w-3xl mx-auto mb-10">
                {t('ctaSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/comenzar">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full text-lg shadow-soft-lg hover:shadow-white/30 transition-all duration-300 transform hover:scale-105">
                    {t('ctaButtonStart')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="secondary" className="bg-white/20 text-white hover:bg-white/30 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-soft-md hover:shadow-soft-lg">
                    {t('ctaButtonDemo')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      );
    }