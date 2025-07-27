import React from 'react';
import { BarChart, FileText, Layers, DollarSign } from 'lucide-react';

const RevenueCard = ({ icon: Icon, title, description, value, color }) => (
  <div className="bg-muted/50 p-4 rounded-lg border border-border flex items-start space-x-4">
    <div className={`w-10 h-10 bg-${color}-500/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-5 h-5 text-${color}-500`} />
    </div>
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <p className={`text-lg font-bold text-${color}-500 ml-auto`}>{value}</p>
  </div>
);

export default function RevenueStreams() {
  const revenueData = [
    {
      icon: FileText,
      title: "Direct Credit Sales",
      description: "5-10% commission on carbon credit sales.",
      value: "$12,500",
      color: "primary"
    },
    {
      icon: Layers,
      title: "Third-Party Tokenization",
      description: "1-3% fee for tokenizing external assets.",
      value: "$8,200",
      color: "teal"
    },
    {
      icon: BarChart,
      title: "On-Chain Marketplace",
      description: "Transaction fees from the secondary market.",
      value: "$4,800",
      color: "yellow"
    }
  ];

  return (
    <div className="bg-card p-6 rounded-xl border h-full">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Engyx Revenue Model</h3>
      </div>
      <div className="space-y-4">
        {revenueData.map((item, index) => (
          <RevenueCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}