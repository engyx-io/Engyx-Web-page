import React from 'react';
    import { motion } from 'framer-motion';
    import { Play, Pause, RotateCcw, Monitor, Tablet, Smartphone } from 'lucide-react';
    import { useTranslation } from 'react-i18next';
    import { Button } from '@/components/ui/button';
    import { Switch } from '@/components/ui/switch';
    import { Label } from '@/components/ui/label';

    export default function DemoControls({ 
      isPlaying, 
      handlePlayPause, 
      handleReset, 
      selectedDevice, 
      setSelectedDevice, 
      showRealData, 
      setShowRealData, 
      currentStep, 
      demoSteps 
    }) {
      const { t } = useTranslation('demo');

      const devices = [
        { id: 'desktop', name: t('devices.desktop'), icon: Monitor },
        { id: 'tablet', name: t('devices.tablet'), icon: Tablet },
        { id: 'mobile', name: t('devices.mobile'), icon: Smartphone }
      ];

      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-6 rounded-xl tech-border mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handlePlayPause}
                className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-600 text-white"
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? t('controls.pause') : t('controls.play')}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t('controls.reset')}
              </Button>
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-300 text-sm ${
                    selectedDevice === device.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <device.icon className="w-4 h-4" />
                  <span>{device.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Label htmlFor="real-time-data" className="text-foreground text-sm">{t('controls.realTimeData')}</Label>
              <Switch
                id="real-time-data"
                checked={showRealData}
                onCheckedChange={setShowRealData}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{t('controls.progress')}</span>
              <span className="text-foreground font-mono">
                {currentStep + 1} / {demoSteps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      );
    }