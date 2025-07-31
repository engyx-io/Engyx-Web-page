import React, { useState, useEffect, useCallback } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { useTranslation } from 'react-i18next';
    import { Button } from '@/components/ui/button';
    import DemoControls from '@/components/demo/DemoControls';
    import DemoStepsNavigation from '@/components/demo/DemoStepsNavigation';
    import { initialDemoStats, plantsData, portfolioData } from '@/components/demo/data';
    import WelcomeStep from '@/components/demo/steps/WelcomeStep';
    import DashboardStep from '@/components/demo/steps/DashboardStep';
    import PlantsStep from '@/components/demo/steps/PlantsStep';
    import PortfolioStep from '@/components/demo/steps/PortfolioStep';
    import SimulatorStep from '@/components/demo/steps/SimulatorStep';
    import MapStep from '@/components/demo/steps/MapStep';

    export default function DemoPage({ handleFeatureClick }) {
      const { t, i18n } = useTranslation('demo');
      const [isPlaying, setIsPlaying] = useState(false);
      const [currentStep, setCurrentStep] = useState(0);
      const [selectedDevice, setSelectedDevice] = useState('desktop');
      const [showRealData, setShowRealData] = useState(true);
      const [demoStats, setDemoStats] = useState(initialDemoStats);
      
      const demoSteps = t('steps', { returnObjects: true });

      useEffect(() => {
        let interval;
        if (isPlaying) {
          interval = setInterval(() => {
            setCurrentStep(prev => {
              if (prev >= demoSteps.length - 1) {
                setIsPlaying(false);
                return 0;
              }
              return prev + 1;
            });
          }, demoSteps[currentStep]?.duration || 3000);
        }
        return () => clearInterval(interval);
      }, [isPlaying, currentStep, demoSteps]);

      useEffect(() => {
        let interval;
        if (showRealData) {
          interval = setInterval(() => {
            setDemoStats(prev => ({
              ...prev,
              totalEnergy: prev.totalEnergy + Math.floor(Math.random() * 10),
              totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
              totalInvestors: prev.totalInvestors + (Math.random() > 0.8 ? 1 : 0)
            }));
          }, 2000);
        }
        return () => clearInterval(interval);
      }, [showRealData]);

      const handlePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev);
        if (!isPlaying && currentStep >= demoSteps.length - 1) {
          setCurrentStep(0);
        }
      }, [isPlaying, currentStep, demoSteps.length]);

      const handleReset = useCallback(() => {
        setIsPlaying(false);
        setCurrentStep(0);
        setDemoStats(initialDemoStats);
      }, []);

      const handleStepClick = useCallback((stepIndex) => {
        setCurrentStep(stepIndex);
        setIsPlaying(false);
      }, []);

      const renderDemoContent = () => {
        switch (currentStep) {
          case 0: return <WelcomeStep />;
          case 1: return <DashboardStep stats={demoStats} />;
          case 2: return <PlantsStep plants={plantsData} />;
          case 3: return <PortfolioStep portfolioData={portfolioData} />;
          case 4: return <SimulatorStep />;
          case 5: return <MapStep />;
          default: return null;
        }
      };

      return (
        <>
          <Helmet>
            <title>{t('metaTitle')}</title>
            <meta name="description" content={t('metaDescription')} />
          </Helmet>

          <div className="pt-24 pb-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground title-glow">
                  {t('title')}
                </h1>
                <p className="text-xl text-foreground max-w-3xl mx-auto">
                  {t('subtitle')}
                </p>
              </motion.div>

              <DemoControls
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                handleReset={handleReset}
                selectedDevice={selectedDevice}
                setSelectedDevice={setSelectedDevice}
                showRealData={showRealData}
                setShowRealData={setShowRealData}
                currentStep={currentStep}
                demoSteps={demoSteps}
              />

              <DemoStepsNavigation
                demoSteps={demoSteps}
                currentStep={currentStep}
                handleStepClick={handleStepClick}
              />

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`glass-card rounded-xl tech-border overflow-hidden transition-all duration-500 ${
                  selectedDevice === 'mobile' ? 'max-w-sm mx-auto' :
                  selectedDevice === 'tablet' ? 'max-w-4xl mx-auto' :
                  'w-full'
                }`}
              >
                {renderDemoContent()}
              </motion.div>


            </div>
          </div>
        </>
      );
    }