import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Droplets, CheckCircle, DollarSign, Eye, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export default function ForSaleTab({
  forSaleProjects,
  handleInvestmentClick
}) {
  const getPlantIcon = type => {
    switch (type) {
      case 'solar':
        return Sun;
      case 'wind':
        return Wind;
      case 'hydro':
        return Droplets;
      default:
        return Sun;
    }
  };
  const getStatusBadge = project => {
    if (project.funding >= 100) {
      return <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-200">
              Sold Out
            </div>;
    }
    if (project.funding >= 90) {
      return <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
              Last Units
            </div>;
    }
    return <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
            Available
          </div>;
  };
  if (forSaleProjects.length === 0) {
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="text-center py-12">
              <div className="bg-card p-8 rounded-xl border max-w-md mx-auto">
                <DollarSign className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">There are no projects available</h3>
                <p className="text-muted-foreground text-sm">There are currently no projects for sale. Come back soon for new investment opportunities.</p>
              </div>
            </motion.div>;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-bold text-foreground">Projects for Sale</h2>
            <div className="text-muted-foreground text-sm">
              {forSaleProjects.filter(p => p.funding < 100).length} projects available
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forSaleProjects.map(project => {
        const PlantIcon = getPlantIcon(project.type);
        const isSoldOut = project.funding >= 100;
        const isEquity = project.tokenization_type === 'Equity Digital Asset';
        const progressLabel = isEquity ? '% of Project Tokenized' : '% of Revenue Tokenized';
        const fundingLabel = isEquity ? '% Funded' : '% Sold';
        return <motion.div key={project.id} className="relative group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-2xl bg-card" whileHover={{
          y: -5
        }}>
                  <div className="absolute top-0 left-0 p-4 z-20 w-full flex justify-between items-start">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm">
                      <PlantIcon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-sm text-foreground capitalize">{project.type}</span>
                    </div>
                     {getStatusBadge(project)}
                  </div>
                  <img alt={`Image of project ${project.digital_asset_name}`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" src={project.image_url || "https://images.unsplash.com/photo-1634052262274-e0f4ac08bc06?q=80&w=2070&auto=format&fit=crop"} />
                  
                  <div className="p-6 flex flex-col">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 h-16">{project.digital_asset_name}</h3>
                      
                      <div className="grid grid-cols-3 gap-4 text-center my-6">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">Capacity</p>
                          <p className="text-foreground font-bold text-lg">{project.capacity} <span className="text-sm font-normal">MW</span></p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">Token Price</p>
                          <p className="text-foreground font-bold text-lg">${project.token_price}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider">ROI</p>
                          <p className="text-primary font-bold text-lg">{project.roi}%</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{progressLabel}</span>
                            <span className="text-primary font-mono">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{
                      width: `${project.progress}%`
                    }}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{fundingLabel}</span>
                            <span className="text-primary font-mono">{project.funding}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{
                      width: `${project.funding}%`
                    }}></div></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      {isSoldOut ? <div className="text-center p-4 bg-muted rounded-lg border">
                          <CheckCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-foreground font-semibold">Sold Out</p>
                        </div> : <div className="flex items-center space-x-3">
                          <Button onClick={() => handleInvestmentClick(project)} className="flex-grow">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Invest
                          </Button>
                          <Link to={`/project/${project.id}`} className="flex-grow">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              Details
                            </Button>
                          </Link>
                        </div>}
                    </div>
                  </div>
                </motion.div>;
      })}
          </div>
        </motion.div>;
}