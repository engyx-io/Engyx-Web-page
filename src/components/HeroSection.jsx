import React, { memo, useRef, useEffect } from 'react';
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
      const videoRef = useRef(null);

      useEffect(() => {
        const video = videoRef.current;
        if (video) {
          video.muted = true; // silenciar video
        }
      }, []);

      return (
        <section className="pt-40 pb-48 px-6 relative overflow-hidden">
          {/* Video de fondo bosque */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/Videos/foresttrees.jpg"
            style={{ minHeight: '100%', minWidth: '100%', maxHeight: 'none', maxWidth: 'none' }}
          >
            <source src="/Videos/foresttrees.mp4" type="video/mp4" />
          </video>
          {/* Contenido principal sin ondas de fondo */}
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto mt-12"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight title-glow whitespace-pre-line"
                style={{wordBreak: 'break-word', color: '#fff'}}
              >
                {(() => {
                  const title = t('heroTitle');
                  // Solo resaltar la palabra 'sustainable' (inglés) o 'sustentable' (español)
                  return title.split(/(sustainable|sustentable)/i).map((part, idx) => {
                    if (/^sustainable$/i.test(part)) {
                      return (
                        <span key={idx} className="bg-gradient-to-br from-primary to-teal-500 bg-clip-text text-transparent">{part}</span>
                      );
                    }
                    if (/^sustentable$/i.test(part)) {
                      return (
                        <span key={idx} className="bg-gradient-to-br from-primary to-teal-500 bg-clip-text text-transparent">{part}</span>
                      );
                    }
                    return part;
                  });
                })()}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl mb-12 leading-relaxed"
                style={{ color: '#fff' }}
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