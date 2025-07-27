import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardHeader({ selectedTab, setSelectedTab, tabs, handleFeatureClick }) {
  return (
    <motion.div 
      className="mb-8" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent neon-text mb-2">
            Dashboard ENGYX
          </h1>
          <p className="text-emerald-200/80 mono text-sm">
            Sistema de Monitoreo Energético • Última actualización: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 px-3 py-2 glass rounded-lg">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm mono">SISTEMA ACTIVO</span>
          </div>
          <Button 
            onClick={handleFeatureClick} 
            variant="outline" 
            size="sm" 
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedTab === tab.id 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                : 'glass text-emerald-200/70 hover:text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}