import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PlantsStep({ plants }) {
  const { t } = useTranslation('demo');
  const colorClasses = {
    emerald: 'primary',
    teal: 'teal-500',
    blue: 'blue-500'
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('plants.title')}</h2>
      
      <div className="space-y-4">
        {plants.map((plant) => (
          <div key={plant.id} className="glass-card p-4 rounded-lg tech-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center`}>
                  <plant.icon className={`w-5 h-5 text-primary`} />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">{plant.name}</h3>
                  <p className="text-muted-foreground text-sm">{t(`plants.types.${plant.type.toLowerCase()}`)} • {plant.location}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                plant.status === 'Operativa' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-yellow-500/20 text-yellow-500'
              }`}>
                {t(`plants.status.${plant.status === 'Operativa' ? 'operational' : 'maintenance'}`)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{t('plants.capacity')}</p>
                <p className="text-foreground font-medium">{plant.capacity}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('plants.energyToday')}</p>
                <p className="text-foreground font-medium">{plant.energyToday}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('plants.revenue')}</p>
                <p className="text-foreground font-medium">{plant.revenue}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('plants.efficiency')}</p>
                <p className="text-foreground font-medium">{plant.efficiency}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}