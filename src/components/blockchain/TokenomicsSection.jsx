import React from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Shield, Users, Zap, Globe, Building, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const tokenomicsDataConfig = [
  { key: "publicPrivateSale", percentage: "60%", amount: "600,000,000 $ENGYX", icon: Globe, color: "primary" },
  { key: "foundingTeam", percentage: "10%", amount: "100,000,000 $ENGYX", icon: Users, color: "teal" },
  { key: "treasuryReserve", percentage: "10%", amount: "100,000,000 $ENGYX", icon: Shield, color: "primary" },
  { key: "stakingRewards", percentage: "5%", amount: "50,000,000 $ENGYX", icon: TrendingUp, color: "teal" },
  { key: "ecosystemDevelopment", percentage: "5%", amount: "50,000,000 $ENGYX", icon: Zap, color: "primary" },
  { key: "marketingAlliances", percentage: "5%", amount: "50,000,000 $ENGYX", icon: Building, color: "teal" },
  { key: "liquidityFund", percentage: "4%", amount: "40,000,000 $ENGYX", icon: DollarSign, color: "primary" },
  { key: "preSale", percentage: "1%", amount: "10,000,000 $ENGYX", icon: Coins, color: "yellow" }
];

const utilitiesConfig = [
  { key: "energyDividends", icon: Coins },
  { key: "governance", icon: Users },
  { key: "stakingRewards", icon: TrendingUp },
  { key: "premiumAccess", icon: Shield }
];

export default function TokenomicsSection() {
  const { t } = useTranslation('tokenomics');

  const tokenomicsData = tokenomicsDataConfig.map(item => ({
    ...item,
    category: t(`distribution.${item.key}.category`),
    description: t(`distribution.${item.key}.description`)
  }));

  const utilities = utilitiesConfig.map(item => ({
    ...item,
    title: t(`utilities.${item.key}.title`),
    description: t(`utilities.${item.key}.description`)
  }));

  const colorClasses = {
    primary: {
      bg: 'bg-primary/20',
      text: 'text-primary',
      gradientFrom: 'from-primary',
      gradientTo: 'to-teal-500'
    },
    teal: {
      bg: 'bg-teal-500/20',
      text: 'text-teal-400',
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-cyan-500'
    },
    yellow: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-400',
      gradientFrom: 'from-yellow-500',
      gradientTo: 'to-amber-500'
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">{t('distributionTitle')}</h3>
        <div className="grid gap-4">
          {tokenomicsData.map((item, index) => {
             const styles = colorClasses[item.color] || colorClasses.primary;
             return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-background/5 rounded-lg border border-border/10 hover:bg-background/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-10 h-10 ${styles.bg} rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${styles.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-foreground font-semibold">{item.category}</h4>
                      <span className={`px-3 py-1 ${styles.bg} ${styles.text} text-sm rounded-full mono font-bold`}>
                        {item.percentage}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${styles.text} font-bold mono text-lg`}>{item.amount}</p>
                </div>
              </motion.div>
             )
            })}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-primary/5 to-teal-500/5 rounded-lg border border-border/10">
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">{t('visualDistributionTitle')}</h3>
        <div className="space-y-3">
          {tokenomicsData.map((item, index) => {
            const styles = colorClasses[item.color] || colorClasses.primary;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-20 text-muted-foreground text-sm font-medium">{item.percentage}</div>
                <div className="flex-1 bg-secondary/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.percentage }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo}`}
                  />
                </div>
                <div className="w-32 text-foreground text-sm font-medium text-right">{item.category}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">{t('utilitiesTitle')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {utilities.map((utility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-background/5 rounded-lg border border-border/10 hover:bg-background/10 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <utility.icon className="w-4 h-4 text-teal-400" />
                </div>
                <h4 className="text-foreground font-semibold">{utility.title}</h4>
              </div>
              <p className="text-muted-foreground text-sm">{utility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg border border-border/20">
        <h3 className="text-xl font-bold text-foreground mb-4 text-center">{t('summaryTitle')}</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-3xl font-bold text-primary mono mb-2">1B</p>
            <p className="text-muted-foreground text-sm">{t('summary.totalSupply')}</p>
          </div>
          <div className="p-4 bg-teal-500/10 rounded-lg">
            <p className="text-3xl font-bold text-teal-400 mono mb-2">$0.05</p>
            <p className="text-muted-foreground text-sm">{t('summary.presalePrice')}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-3xl font-bold text-primary mono mb-2">60%</p>
            <p className="text-muted-foreground text-sm">{t('summary.publicSale')}</p>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-lg">
            <p className="text-3xl font-bold text-yellow-400 mono mb-2">1%</p>
            <p className="text-muted-foreground text-sm">{t('summary.exclusivePresale')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}