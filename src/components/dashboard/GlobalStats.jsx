import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Users, TrendingUp, Leaf, Activity, ArrowUpRight } from 'lucide-react';

export default function GlobalStats({ globalStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Global Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-xl tech-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <p className="text-emerald-200/70 text-sm mono">Energía Total Generada</p>
            <p className="text-3xl font-bold text-emerald-100">{globalStats.totalEnergy.toLocaleString()}</p>
            <p className="text-emerald-400 text-sm">MWh acumulados</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl tech-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-teal-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-teal-400" />
          </div>
          <div className="space-y-2">
            <p className="text-emerald-200/70 text-sm mono">Ingresos Generados</p>
            <p className="text-3xl font-bold text-emerald-100">${globalStats.totalRevenue.toLocaleString()}</p>
            <p className="text-teal-400 text-sm">USD totales</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl tech-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <p className="text-emerald-200/70 text-sm mono">Inversores Activos</p>
            <p className="text-3xl font-bold text-emerald-100">{globalStats.totalInvestors.toLocaleString()}</p>
            <p className="text-emerald-400 text-sm">Usuarios registrados</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl tech-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-teal-400" />
          </div>
          <div className="space-y-2">
            <p className="text-emerald-200/70 text-sm mono">ROI Promedio</p>
            <p className="text-3xl font-bold text-emerald-100">{globalStats.avgROI}%</p>
            <p className="text-teal-400 text-sm">Rendimiento anual</p>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl tech-border">
          <div className="flex items-center space-x-3 mb-6">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-100">Impacto Ambiental</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-emerald-500/10 rounded-lg">
              <div>
                <p className="text-emerald-200/70 text-sm">CO₂ Evitado</p>
                <p className="text-2xl font-bold text-emerald-100">{globalStats.co2Avoided.toLocaleString()}</p>
                <p className="text-emerald-400 text-sm">Toneladas</p>
              </div>
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-teal-500/10 rounded-lg">
              <div>
                <p className="text-emerald-200/70 text-sm">Equivalente en Árboles</p>
                <p className="text-2xl font-bold text-emerald-100">{globalStats.treesEquivalent.toLocaleString()}</p>
                <p className="text-teal-400 text-sm">Árboles plantados</p>
              </div>
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-teal-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl tech-border">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-100">Estado de la Red</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-100 font-medium">Sistema Operativo</span>
              </div>
              <span className="text-emerald-400 text-sm mono">100% ACTIVO</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-200/70">Plantas Operativas</span>
                <span className="text-emerald-400 mono">2/3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-200/70">En Mantenimiento</span>
                <span className="text-yellow-400 mono">1/3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-200/70">Errores Detectados</span>
                <span className="text-emerald-400 mono">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}