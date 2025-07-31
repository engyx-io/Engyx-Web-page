import React, { memo } from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useTranslation } from 'react-i18next';

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };

    const HeroSection = () => {
      const { t } = useTranslation('home');

      return (
        <section className="pt-40 pb-48 px-6 relative overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto mt-12"
            >

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight title-glow"
                style={{wordBreak: 'break-word'}}
              >
                {(() => {
                  const title = t('heroTitle');
                  // Remplaza Energy, Opportunities, Energia y Oportunidades por spans con el mismo degradado que la onda
                  return title.split(/(Energy|Opportunities|Energia|Energía|Oportunidades)/g).map((part, idx) => {
                    if (['Energy', 'Opportunities', 'Energia', 'Energía', 'Oportunidades'].includes(part)) {
                      return (
                        <span
                          key={idx}
                          style={{
                            background: 'linear-gradient(135deg, #30d3a2 0%, #14b8a6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {part}
                        </span>
                      );
                    }
                    return part;
                  });
                })()}
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
              >
                {t('heroSubtitle')}
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/comenzar">
                  <Button
                    size="lg"
                    className="text-white font-bold px-8 py-4 rounded-full text-lg shadow-soft-lg transition-all duration-300 transform hover:scale-105 border-0"
                    style={{
                      background: 'linear-gradient(135deg, #30d3a2 0%, #14b8a6 100%)',
                      boxShadow: '0 4px 24px 0 rgba(48,211,162,0.15)',
                    }}
                  >
                    {t('heroButtonAccess')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <Link to="/demo">
                  <Button size="lg" variant="outline" className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary/90 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-soft-md hover:shadow-soft-lg">
                    {t('heroButtonDemo')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      );
    }

    export default memo(HeroSection);