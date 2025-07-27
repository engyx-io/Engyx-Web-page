import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, UserCheck } from 'lucide-react';

export default function MyStakesList({ myStakes, isUnstaking, unstakingId, handleUnstake, loading, isLoggedIn }) {
  if (loading) {
    return (
       <div className="bg-card p-6 rounded-xl border">
        <h3 className="text-xl font-bold text-foreground mb-6">My Active Stakes</h3>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
             <div key={i} className="p-4 rounded-lg bg-muted animate-pulse">
                <div className="h-5 bg-muted-foreground/20 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                </div>
              </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
     return (
      <div className="bg-card p-6 rounded-xl border text-center">
        <h3 className="text-xl font-bold text-foreground mb-6">My Active Stakes</h3>
        <UserCheck className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Please log in to view your stakes and manage your investments.
        </p>
      </div>
     )
  }
  
  if (myStakes.length === 0) {
    return (
      <div className="bg-card p-6 rounded-xl border">
        <h3 className="text-xl font-bold text-foreground mb-6">My Active Stakes</h3>
        <div className="text-center py-8">
          <Lock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">You have no active stakes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-xl border">
      <h3 className="text-xl font-bold text-foreground mb-6">My Active Stakes</h3>
      <div className="space-y-4">
        {myStakes.map(stake => (
          <div key={stake.id} className="p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-foreground font-semibold">{stake.staking_pools.name}</h4>
                <p className="text-muted-foreground text-sm">
                  {new Date(stake.start_date).toLocaleDateString()} - {new Date(stake.end_date).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                stake.status === 'active' 
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-muted-foreground/10 text-muted-foreground border border-border'
              }`}>
                {stake.status}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm mb-3">
              <div>
                <p className="text-muted-foreground">Locked</p>
                <p className="text-foreground font-medium mono">${stake.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">APR</p>
                <p className="text-primary font-medium">{stake.staking_pools.apy}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Rewards</p>
                <p className="text-teal-500 font-medium mono">${(stake.rewards_earned || 0).toFixed(2)}</p>
              </div>
            </div>
            
            {stake.status === 'active' && new Date(stake.end_date) <= new Date() && (
              <Button
                onClick={() => handleUnstake(stake.id)}
                disabled={isUnstaking && unstakingId === stake.id}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                {isUnstaking && unstakingId === stake.id ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 mr-2" />
                    Withdraw
                  </>
                )}
              </Button>
            )}
             {stake.status === 'active' && new Date(stake.end_date) > new Date() && (
                 <p className="text-xs text-yellow-500/80">Locked until {new Date(stake.end_date).toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}