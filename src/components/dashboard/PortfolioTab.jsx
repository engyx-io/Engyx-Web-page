import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wallet, LayoutDashboard, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import MyInvestmentsTab from '@/components/portfolio/MyInvestmentsTab';
import PortfolioDashboardTab from '@/components/portfolio/PortfolioDashboardTab';

const PortfolioTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-investments', label: 'My Investments', icon: Briefcase },
  ];

  return (
    <div className="border-b border-border flex flex-wrap items-center gap-2 mb-8">
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
              layoutId="portfolio-underline"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default function PortfolioTab({ myPortfolio, handleManageInvestment }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!myPortfolio || myPortfolio.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="bg-card p-8 rounded-xl border max-w-md mx-auto">
          <Wallet className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Your portfolio is empty</h3>
          <p className="text-muted-foreground text-sm mb-6">Start investing in projects to see your assets here.</p>
          <Link to="/marketplace">
            <Button>Explore Projects</Button>
          </Link>
        </div>
      </motion.div>
    );
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PortfolioDashboardTab investments={myPortfolio} />;
      case 'my-investments':
        return <MyInvestmentsTab investments={myPortfolio} handleManageInvestment={handleManageInvestment} />;
      default:
        return <PortfolioDashboardTab investments={myPortfolio} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <PortfolioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </motion.div>
  );
}