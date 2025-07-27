import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Rocket, BarChart2, Leaf } from 'lucide-react';

const MarketplaceTabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const tabs = [
    { id: 'launchpad', label: t('marketplace.tabs.newOpportunities'), icon: Rocket },
    { id: 'exchange', label: t('marketplace.tabs.assetMarket'), icon: BarChart2 },
    { id: 'carbon-credits', label: 'Carbon Credits', icon: Leaf },
  ];

  return (
    <div className="border-b border-border flex flex-wrap items-center justify-center gap-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex items-center space-x-2 px-4 py-3 transition-all duration-300 text-sm font-medium
            ${activeTab === tab.id 
              ? 'text-primary' 
              : 'text-muted-foreground hover:text-primary'
            }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div 
              className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
              layoutId="marketplace-underline"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default MarketplaceTabs;