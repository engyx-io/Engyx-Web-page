import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Plus, Minus } from 'lucide-react';
export default function NewStakePanel({
  stakingAmount,
  setStakingAmount,
  selectedPeriod,
  stakingPools,
  isStaking,
  handleStake
}) {
  const adjustAmount = increment => {
    setStakingAmount(prev => Math.max(100, prev + increment));
  };
  const getPoolByDuration = duration => {
    return stakingPools.find(p => p.duration_months === duration);
  };
  const selectedPool = getPoolByDuration(selectedPeriod);
  const minStake = selectedPool?.min_stake || 100;
  const calculateRewards = () => {
    if (!selectedPool || !stakingAmount) return 0;
    const yearlyRate = selectedPool.apy / 100;
    return stakingAmount * yearlyRate * (selectedPeriod / 12);
  };
  const rewards = calculateRewards();
  return <div className="bg-card p-6 rounded-xl border">
      <h3 className="text-xl font-bold text-foreground mb-6">New Stake</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-muted-foreground text-sm font-medium mb-2">Amount ($ENGYX)</label>
          <div className="flex items-center space-x-2">
            <Button onClick={() => adjustAmount(-100)} variant="outline" size="sm" disabled={stakingAmount <= 100}>
              <Minus className="w-4 h-4" />
            </Button>
            <input type="number" value={stakingAmount} onChange={e => setStakingAmount(Number(e.target.value))} className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none text-center font-mono" min="100" step="100" />
            <Button onClick={() => adjustAmount(100)} variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-muted-foreground text-sm font-medium mb-2">Selected Plan</label>
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex justify-between items-center">
              <span className="text-foreground font-medium">{selectedPool?.name}</span>
              <span className="text-primary font-bold">{selectedPool?.apy}% APR</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-teal-500/5 rounded-lg border border-teal-500/10">
          <h4 className="text-teal-600 font-semibold mb-3">Rewards Projection</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lock-up</span>
              <span className="text-teal-600 font-mono">{selectedPeriod} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Rewards</span>
              <span className="text-teal-600 font-bold font-mono">${rewards.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-teal-500/20 pt-2 font-medium">
              <span className="text-foreground">Total to receive</span>
              <span className="text-teal-600 font-bold font-mono">${(stakingAmount + rewards).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleStake} disabled={isStaking || !selectedPool || stakingAmount < minStake} className="w-full py-3 text-base">
          {isStaking ? <div className="flex items-center justify-center space-x-2"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Processing...</span></div> : <div className="flex items-center justify-center space-x-2"><Lock className="w-5 h-5" /><span>Start Staking</span></div>}
        </Button>

        {selectedPool && stakingAmount < minStake && <p className="text-yellow-500 text-sm text-center">
            Minimum required: ${minStake.toLocaleString()}
          </p>}
      </div>
    </div>;
}