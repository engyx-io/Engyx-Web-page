import React from 'react';
import { Zap, DollarSign, Users, TrendingUp, Leaf, Activity } from 'lucide-react';

export default function DashboardStep({ stats }) {
  // Datos estáticos para la demo interactiva
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#071c38' }}>Main Dashboard</h2>
      <div className="flex flex-wrap gap-4 mb-6 w-full justify-between items-stretch">
        {/* Grupo 1 */}
        <div className="flex flex-col items-center px-4 py-2">
          <span className="text-xs font-semibold" style={{ color: '#071c38' }}>Active Energy Capacity</span>
          <span className="text-2xl font-bold" style={{ color: '#32d3a2' }}>{stats.totalEnergy?.toLocaleString() ?? 0}</span>
          <span className="text-xs" style={{ color: '#071c38' }}>MW</span>
        </div>
        {/* Grupo 2 */}
        <div className="flex flex-col items-center px-4 py-2">
          <span className="text-xs font-semibold" style={{ color: '#071c38' }}>Generated Carbon Credits</span>
          <span className="text-2xl font-bold" style={{ color: '#32d3a2' }}>{stats.co2Avoided?.toLocaleString() ?? 0}</span>
          <span className="text-xs" style={{ color: '#071c38' }}>Tons</span>
        </div>
        {/* Grupo 3 */}
        <div className="flex flex-col items-center px-4 py-2">
          <span className="text-xs font-semibold" style={{ color: '#071c38' }}>Active Investors</span>
          <span className="text-2xl font-bold" style={{ color: '#32d3a2' }}>{stats.totalInvestors?.toLocaleString() ?? 0}</span>
          <span className="text-xs" style={{ color: '#071c38' }}>Registered Users</span>
        </div>
        {/* Grupo 4 */}
        <div className="flex flex-col items-center px-4 py-2">
          <span className="text-xs font-semibold" style={{ color: '#071c38' }}>Distributed rewards</span>
          <span className="text-2xl font-bold" style={{ color: '#32d3a2' }}>0</span>
          <span className="text-xs" style={{ color: '#071c38' }}>Total USD</span>
        </div>
        {/* Grupo 5 */}
        <div className="flex flex-col items-center px-4 py-2">
          <span className="text-xs font-semibold" style={{ color: '#071c38' }}>Average ROI</span>
          <span className="text-2xl font-bold" style={{ color: '#32d3a2' }}>{stats.avgROI ?? 0.0}%</span>
          <span className="text-xs" style={{ color: '#071c38' }}>Annual project yield</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 rounded-lg tech-border col-span-2 lg:col-span-2">
          <p className="text-xs font-semibold mb-2" style={{ color: '#071c38' }}>Generated Revenue</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="text-xs" style={{ color: '#071c38' }}>Energy Sales</p>
              <p className="text-2xl font-bold" style={{ color: '#32d3a2' }}>$0</p>
              <p className="text-xs" style={{ color: '#071c38' }}>Total USD</p>
            </div>
            <div className="flex-1">
              <p className="text-xs" style={{ color: '#071c38' }}>Carbon Credit Sales</p>
              <p className="text-2xl font-bold" style={{ color: '#32d3a2' }}>$0</p>
              <p className="text-xs" style={{ color: '#071c38' }}>Total USD</p>
            </div>
            <div className="flex-1">
              <p className="text-xs" style={{ color: '#071c38' }}>Sustainable Infrastructure Revenue</p>
              <p className="text-2xl font-bold" style={{ color: '#32d3a2' }}>$0</p>
              <p className="text-xs" style={{ color: '#071c38' }}>Total USD</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 rounded-lg tech-border col-span-2 lg:col-span-1 lg:col-start-4">
          <p className="text-xs font-semibold mb-2" style={{ color: '#071c38' }}>Network Status</p>
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 bg-[#32d3a2] rounded-full animate-pulse"></span>
            <span className="text-xs font-bold" style={{ color: '#32d3a2' }}>Operating System</span>
            <span className="text-xs" style={{ color: '#32d3a2' }}>100% ACTIVE</span>
          </div>
          <div className="flex justify-between text-xs" style={{ color: '#071c38' }}>
            <span>Operational Projects</span>
            <span>0 / 0</span>
          </div>
          <div className="flex justify-between text-xs" style={{ color: '#071c38' }}>
            <span>In Maintenance</span>
            <span>0</span>
          </div>
          <div className="flex justify-between text-xs" style={{ color: '#071c38' }}>
            <span>Errors Detected</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}