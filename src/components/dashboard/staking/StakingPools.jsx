import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
export default function StakingPools({
  stakingPools,
  selectedPeriod,
  setSelectedPeriod,
  loading
}) {
  if (loading) {
    return <div className="bg-card p-6 rounded-xl border">
        <h3 className="text-xl font-bold text-foreground mb-6">Available Staking Plans</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="p-4 rounded-lg bg-muted animate-pulse">
              <div className="h-5 bg-muted-foreground/20 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
              </div>
            </div>)}
        </div>
      </div>;
  }
  return <div className="bg-card p-6 rounded-xl border">
      <h3 className="text-xl font-bold text-foreground mb-6">Available Staking Plans</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {stakingPools.map(pool => <motion.div key={pool.id} className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${selectedPeriod === pool.duration_months ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-background hover:border-primary/50'}`} onClick={() => setSelectedPeriod(pool.duration_months)} whileHover={{
        scale: 1.02
      }}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-foreground font-semibold">{pool.name}</h4>
              <div className="flex items-center space-x-1 bg-primary/10 border border-primary/20 px-2 py-1 rounded">
                <Lock className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-mono">{pool.duration_months}m</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">APR</span>
                <span className="text-primary font-bold">{pool.apy}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Minimum</span>
                <span className="text-foreground font-mono">${(pool.min_stake || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Locked</span>
                <span className="text-foreground font-mono">${(pool.total_staked || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Participants</span>
                <span className="text-foreground font-mono">{pool.participants || 0}</span>
              </div>
            </div>
          </motion.div>)}
      </div>
    </div>;
}