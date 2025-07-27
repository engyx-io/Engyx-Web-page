import React from 'react';
    import { DollarSign, TrendingUp, Zap, Award } from 'lucide-react';
    import { useTranslation } from 'react-i18next';

    const levelStyles = (t) => ({
      [t('profile.investorStats.levels.geo')]: { bg: 'bg-purple-500/20', text: 'text-purple-500' },
      [t('profile.investorStats.levels.greenHydrogen')]: { bg: 'bg-cyan-500/20', text: 'text-cyan-500' },
      [t('profile.investorStats.levels.wind')]: { bg: 'bg-blue-500/20', text: 'text-blue-500' },
      [t('profile.investorStats.levels.solar')]: { bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
      [t('profile.investorStats.levels.seed')]: { bg: 'bg-emerald-500/20', text: 'text-emerald-500' },
      [t('profile.investorStats.levels.initial')]: { bg: 'bg-gray-500/20', text: 'text-gray-500' },
      [t('profile.investorStats.levels.na')]: { bg: 'bg-gray-500/20', text: 'text-gray-500' },
    });

    export default function InvestorStats({ investorData }) {
      const { t } = useTranslation();
      const styles = levelStyles(t);
      const investorLevel = investorData?.investorLevel || t('profile.investorStats.levels.na');
      const levelStyle = styles[investorLevel] || styles[t('profile.investorStats.levels.na')];

      const stats = [
        {
          icon: DollarSign,
          label: t('profile.investorStats.totalInvested'),
          value: `${(investorData?.totalInvested || 0).toLocaleString()}`,
          bgClass: 'bg-emerald-500/20',
          textClass: 'text-emerald-500'
        },
        {
          icon: TrendingUp,
          label: t('profile.investorStats.totalReturns'),
          value: `${(investorData?.totalReturns || 0).toLocaleString()}`,
          bgClass: 'bg-teal-500/20',
          textClass: 'text-teal-500'
        },
        {
          icon: Zap,
          label: t('profile.investorStats.activeProjects'),
          value: investorData?.activeProjects || 0,
          bgClass: 'bg-emerald-500/20',
          textClass: 'text-emerald-500'
        },
        {
          icon: Award,
          label: t('profile.investorStats.investorLevel'),
          value: investorLevel,
          bgClass: levelStyle.bg,
          textClass: levelStyle.text
        }
      ];

      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card p-4 rounded-xl border text-center">
              <div className={`w-12 h-12 ${stat.bgClass} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.textClass}`} />
              </div>
              <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
              <p className="text-foreground font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      );
    }