import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MapStep() {
  const { t } = useTranslation('demo');
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('map.title')}</h2>
      
      <div className="glass-card p-6 rounded-lg tech-border bg-gradient-to-br from-primary/5 to-teal-500/5">
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-primary/30 rounded-lg">
          <div className="text-center">
            <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-foreground font-semibold mb-2">{t('map.interactiveMap')}</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              {t('map.description')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
            <p className="text-foreground font-medium">{t('map.operational')}</p>
            <p className="text-primary text-sm">{t('map.activeCount', {count: 2})}</p>
          </div>
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
            <p className="text-foreground font-medium">{t('map.maintenance')}</p>
            <p className="text-yellow-500 text-sm">{t('map.maintenanceCount', {count: 1})}</p>
          </div>
          <div className="text-center p-4 bg-blue-500/10 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full mx-auto mb-2"></div>
            <p className="text-foreground font-medium">{t('map.inDevelopment')}</p>
            <p className="text-blue-500 text-sm">{t('map.developmentCount', {count: 3})}</p>
          </div>
        </div>
      </div>
    </div>
  );
}