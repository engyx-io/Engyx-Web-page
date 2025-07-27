import React from 'react';
        import { motion } from 'framer-motion';
        import { Star, Shield, TrendingUp, Users } from 'lucide-react';
        import { useTranslation } from 'react-i18next';

        export default function PresaleBenefits() {
          const { t } = useTranslation();
          const benefits = [
            {
              icon: Star,
              title: t("presale.benefit1Title"),
              description: t("presale.benefit1Desc")
            },
            {
              icon: Shield,
              title: t("presale.benefit2Title"),
              description: t("presale.benefit2Desc")
            },
            {
              icon: TrendingUp,
              title: t("presale.benefit3Title"),
              description: t("presale.benefit3Desc")
            },
            {
              icon: Users,
              title: t("presale.benefit4Title"),
              description: t("presale.benefit4Desc")
            }
          ];

          return (
            <div className="glass-card p-6 rounded-xl presale-highlight">
              <h3 className="text-xl font-bold text-emerald-100 mb-6">{t('presale.benefitsTitle')}</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-500/5 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-emerald-100 font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-emerald-200/70 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        }