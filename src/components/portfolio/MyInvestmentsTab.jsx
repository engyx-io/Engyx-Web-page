import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, Zap, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyInvestmentsTab = ({ investments, handleManageInvestment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="grid gap-6">
        {investments.map(investment => {
          const projectTotalValue = (investment.projects.funding * investment.projects.capacity * 10000); // Simplified total value
          const investmentPercentage = projectTotalValue > 0 ? (investment.amount_usd / projectTotalValue) * 100 : 0;
          const energyRevenue = (investment.projects.energy_revenue_share || 0) * (investmentPercentage / 100);
          const carbonRevenue = (investment.projects.carbon_revenue_share || 0) * (investmentPercentage / 100);

          return (
            <motion.div
              key={investment.id}
              className="bg-card p-6 rounded-xl border"
              whileHover={{ scale: 1.01, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}
            >
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{investment.projects.digital_asset_name}</h3>
                  {investment.projects.digital_asset_symbol && <p className="text-primary text-xs font-mono mb-2">{`${investment.projects.digital_asset_symbol}`}</p>}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">My Investment</span>
                      <span className="text-foreground font-medium mono">${investment.amount_usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">My Ownership</span>
                      <span className="text-primary font-medium mono">{investmentPercentage.toFixed(4)}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground font-semibold mb-2">Performance</h4>
                  <div className="space-y-1">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Yield ROI</span>
                        <span className="text-primary mono">{investment.projects.roi}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-right">Based on actual production.</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="text-foreground mono capitalize">{investment.projects.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground font-semibold mb-2">My Generated Revenue</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm p-2 bg-primary/5 rounded-md">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Energy</span>
                      </div>
                      <span className="text-primary font-mono">${energyRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 bg-teal-500/5 rounded-md">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-teal-500" />
                        <span className="text-muted-foreground">Carbon</span>
                      </div>
                      <span className="text-teal-500 font-mono">${carbonRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/project/${investment.projects.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button onClick={() => handleManageInvestment(investment)} className="flex-1">
                    Manage
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MyInvestmentsTab;