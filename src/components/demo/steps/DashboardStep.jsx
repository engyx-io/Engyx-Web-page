import React from 'react';
import { Zap, DollarSign, Users, TrendingUp, Leaf, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DashboardStep({ stats }) {
  const { t } = useTranslation('demo');
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('dashboard.title')}</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 rounded-lg tech-border">
          <Zap className="w-5 h-5 text-primary mb-2" />
          <p className="text-muted-foreground text-xs">{t('dashboard.totalEnergy')}</p>
          <p className="text-xl font-bold text-foreground">{stats.totalEnergy.toLocaleString()}</p>
          <p className="text-primary text-xs">MWh</p>
        </div>
        
        <div className="glass-card p-4 rounded-lg tech-border">
          <DollarSign className="w-5 h-5 text-primary mb-2" />
          <p className="text-muted-foreground text-xs">{t('dashboard.revenue')}</p>
          <p className="text-xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
          <p className="text-primary text-xs">USD</p>
        </div>
        
        <div className="glass-card p-4 rounded-lg tech-border">
          <Users className="w-5 h-5 text-primary mb-2" />
          <p className="text-muted-foreground text-xs">{t('dashboard.investors')}</p>
          <p className="text-xl font-bold text-foreground">{stats.totalInvestors.toLocaleString()}</p>
          <p className="text-primary text-xs">{t('dashboard.active')}</p>
        </div>
        
        <div className="glass-card p-4 rounded-lg tech-border">
          <TrendingUp className="w-5 h-5 text-primary mb-2" />
          <p className="text-muted-foreground text-xs">{t('dashboard.avgROI')}</p>
          <p className="text-xl font-bold text-foreground">{stats.avgROI}%</p>
          <p className="text-primary text-xs">{t('dashboard.annual')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-lg tech-border">
          <div className="flex items-center space-x-2 mb-3">
            <Leaf className="w-5 h-5 text-primary" />
            <h3 className="text-foreground font-semibold">{t('dashboard.envImpact')}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">{t('dashboard.co2Avoided')}</span>
              <span className="text-primary font-medium">{stats.co2Avoided.toLocaleString()} t</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">{t('dashboard.treesEquivalent')}</span>
              <span className="text-primary font-medium">{stats.treesEquivalent.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg tech-border">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-foreground font-semibold">{t('dashboard.networkStatus')}</h3>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary text-sm">{t('dashboard.systemOperational')}</span>
          </div>
          <div className="text-muted-foreground text-sm">
            {t('dashboard.activePlants', { count: stats.activePlants })}
          </div>
        </div>
      </div>
    </div>
  );
}