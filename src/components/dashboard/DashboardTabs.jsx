import React from 'react';
    import { Wallet, Globe, ShoppingCart, BarChart3, Zap, MapPin, Calculator, Lock } from 'lucide-react';
    import { useTranslation } from 'react-i18next';
    import { motion } from 'framer-motion';

    export default function DashboardTabs({ selectedTab, setSelectedTab }) {
      const { t } = useTranslation();
      
      const tabs = [
        { id: 'overview', label: t('tabs.overview'), icon: Globe },
        { id: 'portfolio', label: t('tabs.portfolio'), icon: Wallet },
        { id: 'for-sale', label: t('tabs.forSale'), icon: ShoppingCart },
        { id: 'development', label: t('tabs.development'), icon: BarChart3 },
        { id: 'projects', label: 'Active Projects', icon: Zap },
        { id: 'map', label: t('tabs.map'), icon: MapPin },
        { id: 'simulator', label: t('tabs.simulator'), icon: Calculator },
        { id: 'staking', label: t('tabs.staking'), icon: Lock },
      ];

      return (
        <div className="border-b border-border flex flex-wrap items-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`relative flex items-center space-x-2 px-4 py-3 transition-all duration-300 text-sm font-medium
                ${selectedTab === tab.id 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {selectedTab === tab.id && (
                <motion.div 
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>
      );
    }