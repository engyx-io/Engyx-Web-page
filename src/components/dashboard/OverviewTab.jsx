import React from 'react';
    import { motion } from 'framer-motion';
    import { Zap, DollarSign, Users, TrendingUp, Leaf, Activity, ArrowUpRight, Wind } from 'lucide-react';

    export default function OverviewTab({
      globalStats,
      activeProjects,
      allProjects
    }) {
      const StatCard = ({
        icon: Icon,
        title,
        value,
        unit,
        color,
        change
      }) => (
        <div className="bg-card p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-${color}-500/10 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            {change && <div className="flex items-center text-sm text-green-500"><ArrowUpRight className="w-4 h-4" /> {change}</div>}
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className={`text-${color}-500 text-sm`}>{unit}</p>
          </div>
        </div>
      );

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard icon={Zap} title="Active Energy Capacity" value={parseFloat(globalStats.total_energy_capacity || 0).toLocaleString()} unit="MW" color="primary" />
            <StatCard icon={Leaf} title="Generated Carbon Credits" value={`${parseFloat(globalStats.generated_carbon_credits || 0).toLocaleString()}`} unit="Tons" color="teal" />
            <StatCard icon={Users} title="Active Investors" value={Number(globalStats.total_investors || 0).toLocaleString()} unit="Registered Users" color="primary" />
            <StatCard icon={DollarSign} title="Distributed rewards" value={Math.round(globalStats.distributed_rewards || 0).toLocaleString()} unit="Total USD" color="yellow" />
            <StatCard icon={TrendingUp} title="Average ROI" value={`${parseFloat(globalStats.avg_roi || 0).toFixed(1)}%`} unit="Annual project yield" color="teal" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-xl border">
              <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Generated Revenue</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                  <div>
                    <p className="text-muted-foreground text-sm">Energy Sales</p>
                    <p className="text-2xl font-bold text-foreground">${Math.round(globalStats.energy_revenue || 0).toLocaleString()}</p>
                    <p className="text-primary text-sm">Total USD</p>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-teal-500/5 rounded-lg">
                  <div>
                    <p className="text-muted-foreground text-sm">Carbon Credit Sales</p>
                    <p className="text-2xl font-bold text-foreground">${Math.round(globalStats.carbon_revenue || 0).toLocaleString()}</p>
                    <p className="text-teal-500 text-sm">Total USD</p>
                  </div>
                  <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-teal-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/5 rounded-lg">
                  <div>
                    <p className="text-muted-foreground text-sm">Sustainable Infrastructure Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${Math.round(globalStats.infrastructure_revenue || 0).toLocaleString()}</p>
                    <p className="text-green-500 text-sm">Total USD</p>
                  </div>
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border">
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Network Status</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-foreground font-medium">Operating System</span>
                  </div>
                  <span className="text-primary text-sm font-mono">{globalStats.networkStatus === 'operational' ? '100% ACTIVE' : 'DEGRADED'}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Operational Projects</span>
                    <span className="text-primary font-mono">{activeProjects} / {allProjects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">In Maintenance</span>
                    <span className="text-yellow-500 font-mono">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Errors Detected</span>
                    <span className="text-primary font-mono">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }