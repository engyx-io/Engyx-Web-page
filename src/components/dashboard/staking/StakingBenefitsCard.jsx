import React from 'react';
import { TrendingUp, Coins, DollarSign, Clock } from 'lucide-react';

export default function StakingBenefitsCard() {
  const benefits = [
    { icon: TrendingUp, text: 'Guaranteed passive rewards' },
    { icon: Coins, text: 'Governance participation' },
    { icon: DollarSign, text: '12% bonus for 12 months' },
    { icon: Clock, text: 'Flexible periods' },
  ];

  return (
    <div className="bg-card p-6 rounded-xl border">
      <h3 className="text-xl font-bold text-foreground mb-4">Staking Benefits</h3>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-muted-foreground text-sm">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}