import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Droplets, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DemoProjectCard = ({ project, delay }) => {
  const PlantIcon = { solar: Sun, wind: Wind, hydro: Droplets }[project.type];
  const isEquity = project.tokenization_type === 'Equity Digital Asset';
  const progressLabel = isEquity ? '% de Proyecto Tokenizado' : '% de Ingresos Tokenizados';
  const fundingLabel = isEquity ? '% Financiado' : '% Vendido';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group overflow-hidden rounded-2xl tech-border h-full flex flex-col bg-black/20"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-20"></div>
      <img 
        alt={`Imagen del proyecto ${project.name}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
       src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
      
      <div className="relative z-30 p-5 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <PlantIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-300/80 mb-4">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-200/80">{progressLabel}</span>
                <span className="text-emerald-400 font-mono">{project.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-200/80">{fundingLabel}</span>
                <span className="text-teal-400 font-mono">{project.funding}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${project.funding}%` }}></div></div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30">
            <Eye className="w-4 h-4 mr-2" />
            Ver Detalles
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


export default function ForSaleStep() {
  const projects = [
    { id: 1, name: "Parque Solar Andino", location: "Desierto de Atacama, Chile", type: 'solar', progress: 75, funding: 45, tokenization_type: 'Revenue Digitalization' },
    { id: 2, name: "Vientos del Sur", location: "Patagonia, Argentina", type: 'wind', progress: 100, funding: 88, tokenization_type: 'Equity Digital Asset' },
    { id: 3, name: "Hidroeléctrica Amazónica", location: "Río Amazonas, Brasil", type: 'hydro', progress: 40, funding: 22, tokenization_type: 'Revenue Digitalization' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-emerald-100 mb-6">Proyectos en Venta</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <DemoProjectCard key={p.id} project={p} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}