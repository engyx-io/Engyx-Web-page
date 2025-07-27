import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sun, Wind, Droplets, MapPin, Eye } from 'lucide-react';

const ForSaleProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const getPlantIcon = (type) => {
    switch (type) {
      case 'solar': return Sun;
      case 'wind': return Wind;
      case 'hydro': return Droplets;
      default: return Sun;
    }
  };

  const getStatusBadge = (project) => {
    if (project.funding >= 100) {
      return (
        <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium border border-red-500/30">
          {t('marketplace.projectStatus.soldOut')}
        </div>
      );
    }
    
    if (project.funding >= 90) {
      return (
        <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-500/30">
          {t('marketplace.projectStatus.lastUnits')}
        </div>
      );
    }
    
    return (
      <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/30">
        {t('marketplace.projectStatus.available')}
      </div>
    );
  };
  
  const PlantIcon = getPlantIcon(project.type);
  const isEquity = project.tokenization_type === 'Equity Digital Asset';

  const progressLabel = isEquity ? t('marketplace.projectCard.tokenizedProgressEquity') : t('marketplace.projectCard.tokenizedProgressRevenue');
  const fundingLabel = isEquity ? t('marketplace.projectCard.fundedProgress') : t('marketplace.projectCard.soldProgress');

  return (
    <motion.div 
      className="relative group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <img  
          alt={`Imagen del proyecto ${project.digital_asset_name}`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          src={project.image_url || "https://images.unsplash.com/photo-1634052262274-e0f4ac08bc06?q=80&w=2070&auto=format&fit=crop"} />
         <div className="absolute top-4 right-4">{getStatusBadge(project)}</div>
      </div>
      
      <div className="p-6 flex flex-col h-full flex-grow">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <PlantIcon className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">{project.digital_asset_name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center my-6">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('marketplace.projectCard.capacity')}</p>
              <p className="text-foreground font-bold text-lg">{project.capacity} <span className="text-sm font-normal">MW</span></p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('marketplace.projectCard.tokenPrice')}</p>
              <p className="text-foreground font-bold text-lg">${project.token_price}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('marketplace.projectCard.roi')}</p>
              <p className="text-primary font-bold text-lg">{project.roi}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{progressLabel}</span>
                <span className="text-primary font-mono">{project.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{fundingLabel}</span>
                <span className="text-teal-500 font-mono">{project.funding}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5"><div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${project.funding}%` }}></div></div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link to={`/project/${project.id}`}>
            <Button 
              className="w-full flex-grow bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-primary/20"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t('marketplace.projectCard.viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForSaleProjectCard;