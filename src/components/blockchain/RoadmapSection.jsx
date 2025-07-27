import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Flag, Rocket, Zap, Building, Users, Globe, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const roadmapPhasesConfig = [
  { phase: "Phase 1", period: "T1-T2 2025", status: "completed", icon: Building, key: "phase1" },
  { phase: "Phase 2", period: "T3-T4 2025", status: "in_progress", icon: Rocket, key: "phase2" },
  { phase: "Phase 3", period: "T4 2025 - T1 2026", status: "upcoming", icon: Zap, key: "phase3" },
  { phase: "Phase 4", period: "T2-T3 2026", status: "upcoming", icon: Users, key: "phase4" },
  { phase: "Phase 5", period: "T3-T4 2026", status: "upcoming", icon: LayoutGrid, key: "phase5" },
  { phase: "Phase 6", period: "T3-T4 2027", status: "upcoming", icon: Flag, key: "phase6" },
  { phase: "Phase 7", period: "2028", status: "upcoming", icon: Globe, key: "phase7" }
];

const getStatusStyles = (status) => {
  switch (status) {
    case 'completed':
      return {
        borderColor: 'border-emerald-500',
        iconBg: 'bg-emerald-500/20',
        iconColor: 'text-emerald-400',
        textColor: 'text-emerald-400'
      };
    case 'in_progress':
      return {
        borderColor: 'border-orange-500',
        iconBg: 'bg-orange-500/20',
        iconColor: 'text-orange-400',
        textColor: 'text-orange-400'
      };
    default: // upcoming
      return {
        borderColor: 'border-gray-500',
        iconBg: 'bg-gray-500/20',
        iconColor: 'text-gray-400',
        textColor: 'text-gray-400'
      };
  }
};

export default function RoadmapSection() {
  const { t } = useTranslation('roadmap');

  const roadmapPhases = roadmapPhasesConfig.map(phase => ({
    ...phase,
    title: t(`phases.${phase.key}.title`),
    objectives: t(`phases.${phase.key}.objectives`, { returnObjects: true })
  }));

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </div>
      <div className="absolute left-1/2 top-24 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-teal-500/20 to-transparent -translate-x-1/2"></div>
      
      {roadmapPhases.map((item, index) => {
        const styles = getStatusStyles(item.status);
        const isLeft = index % 2 === 0;
        const Icon = item.icon;

        return (
          <div key={index} className={`relative flex items-center w-full mb-12 ${isLeft ? 'justify-start' : 'justify-end'}`}>
            <div className={`w-1/2 ${isLeft ? 'pr-8' : 'pl-8'}`}>
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`bg-card p-6 rounded-xl tech-border ${styles.borderColor}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <span className={`text-xs font-bold uppercase ${styles.textColor}`}>{t(`status.${item.status}`)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.period}</p>
                <ul className="space-y-3">
                  {Array.isArray(item.objectives) && item.objectives.map((obj, objIndex) => (
                    <li key={objIndex} className="flex items-start space-x-3">
                      <CheckCircle className={`w-5 h-5 ${styles.iconColor} mt-0.5 flex-shrink-0`} />
                      <span className="text-muted-foreground text-sm">{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full flex items-center justify-center ${styles.iconBg} border-2 ${styles.borderColor}`}
            >
              <Icon className={`w-8 h-8 ${styles.iconColor}`} />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}