import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import ForSaleProjectCard from '@/components/marketplace/ForSaleProjectCard';

const LaunchpadTab = ({ forSaleProjects, loading }) => {
  const { t } = useTranslation();
  const [showAllProjects, setShowAllProjects] = useState(false);

  const handleToggleShowAllProjects = () => {
    setShowAllProjects(prev => !prev);
  };

  const displayedForSaleProjects = showAllProjects ? forSaleProjects : forSaleProjects.slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('marketplace.launchpadTitle')}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading 
          ? Array(3).fill(0).map((_, i) => <div key={i} className="bg-card p-6 rounded-xl h-[550px] animate-pulse"></div>) 
          : displayedForSaleProjects.length > 0
            ? displayedForSaleProjects.map(project => <ForSaleProjectCard key={project.id} project={project} />)
            : <div className="col-span-full text-center py-12 text-muted-foreground">{t('marketplace.noLaunchpadProjects')}</div>
        }
      </div>
      {forSaleProjects.length > 3 && (
        <div className="text-center mt-8">
            <Button onClick={handleToggleShowAllProjects} variant="outline">
              {showAllProjects ? t('marketplace.toggle.collapse') : t('marketplace.toggle.expand')}
              {showAllProjects ? <ChevronsUp className="w-4 h-4 ml-2" /> : <ChevronsDown className="w-4 h-4 ml-2" />}
            </Button>
        </div>
      )}
    </motion.div>
  );
};

export default LaunchpadTab;