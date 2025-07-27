import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Droplets, Zap, MapPin, BarChart3, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function ProjectsTab({
  activeProjects,
  handleFeatureClick
}) {
  const navigate = useNavigate();
  const getProjectIcon = type => {
    switch (type) {
      case 'solar':
        return Sun;
      case 'wind':
        return Wind;
      case 'hydro':
        return Droplets;
      default:
        return Zap;
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'operational':
        return 'text-primary';
      case 'maintenance':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };
  if (activeProjects.length === 0) {
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="text-center py-12">
            <div className="bg-card p-8 rounded-xl border max-w-md mx-auto">
              <Zap className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No active projects</h3>
              <p className="text-muted-foreground text-sm">Projects in development will appear here once they are operational.</p>
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
            <h2 className="text-2xl font-bold text-foreground">Active Projects</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search projects..." className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none" />
              </div>
              <Button onClick={handleFeatureClick} variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {activeProjects.map(project => {
        const ProjectIcon = getProjectIcon(project.type);
        return <motion.div key={project.id} className="bg-card p-6 rounded-xl border hover:border-primary/50 transition-all duration-300 cursor-pointer" whileHover={{
          scale: 1.01,
          y: -2
        }} onClick={() => navigate(`/project/${project.id}`)}>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ProjectIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{project.digital_asset_name}</h3>
                          <p className="text-muted-foreground text-sm capitalize">{project.type}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground text-sm">{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground text-sm">{project.capacity} MW installed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${project.operational_status === 'operational' ? 'bg-primary' : project.operational_status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                          <span className={`text-sm capitalize ${getStatusColor(project.operational_status)}`}>{project.operational_status || 'Operational'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-foreground font-semibold">Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Energy Today</span>
                          <span className="text-primary font-medium mono">{(project.energy_today || 0).toLocaleString()} kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Total Generated</span>
                          <span className="text-primary font-medium mono">{(project.total_energy || 0).toLocaleString()} kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Revenue</span>
                          <span className="text-teal-500 font-medium mono">${(project.revenue || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Annual ROI</span>
                          <span className="text-primary font-medium mono">{project.roi}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-foreground font-semibold">Performance</h4>
                      <div className="h-32 bg-primary/5 rounded-lg flex items-center justify-center border border-primary/10">
                        <div className="text-center">
                          <BarChart3 className="w-8 h-8 text-primary/50 mx-auto mb-2" />
                          <p className="text-primary/70 text-sm">Performance Chart</p>
                          <p className="text-primary/50 text-xs">Efficiency: {project.efficiency || 95}%</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Last reading: {new Date(project.last_reading || Date.now()).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>;
      })}
          </div>
        </motion.div>;
}