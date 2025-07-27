import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Leaf } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-card p-6 rounded-xl border">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-500/10 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-3xl font-bold text-foreground">${value.toLocaleString()}</p>
      </div>
    </div>
);

const PortfolioDashboardTab = ({ investments }) => {
  const portfolioSummary = investments.reduce((acc, investment) => {
    const projectTotalValue = (investment.projects.funding * investment.projects.capacity * 10000);
    const investmentPercentage = projectTotalValue > 0 ? (investment.amount_usd / projectTotalValue) : 0;
    
    acc.totalInvested += investment.amount_usd;
    acc.totalEnergyRevenue += (investment.projects.energy_revenue_share || 0) * investmentPercentage;
    acc.totalCarbonRevenue += (investment.projects.carbon_revenue_share || 0) * investmentPercentage;
    
    return acc;
  }, { totalInvested: 0, totalEnergyRevenue: 0, totalCarbonRevenue: 0 });
  
  const totalRevenue = portfolioSummary.totalEnergyRevenue + portfolioSummary.totalCarbonRevenue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">My Financial Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            icon={DollarSign}
            title="Total Invested"
            value={Math.round(portfolioSummary.totalInvested)}
            color="primary"
        />
        <StatCard 
            icon={DollarSign}
            title="Total Revenue Generated"
            value={Math.round(totalRevenue)}
            color="teal"
        />
        <StatCard 
            icon={Zap}
            title="Energy Revenue"
            value={Math.round(portfolioSummary.totalEnergyRevenue)}
            color="primary"
        />
        <StatCard 
            icon={Leaf}
            title="Carbon Revenue"
            value={Math.round(portfolioSummary.totalCarbonRevenue)}
            color="teal"
        />
      </div>
    </motion.div>
  );
};

export default PortfolioDashboardTab;