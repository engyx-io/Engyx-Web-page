import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Droplets, Zap, CheckCircle } from 'lucide-react';
export default function DevelopmentTab({
  developmentProjects
}) {
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
  if (developmentProjects.length === 0) {
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="text-center py-12">
            <div className="bg-card p-8 rounded-xl border max-w-md mx-auto">
              <Zap className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">There are no projects in development</h3>
              <p className="text-muted-foreground text-sm">There are currently no projects under construction.</p>
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
          <h2 className="text-2xl font-bold text-foreground">Projects in Development</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentProjects.map(project => {
        const ProjectIcon = getProjectIcon(project.type);
        return <motion.div key={project.id} className="bg-card p-6 rounded-xl border flex flex-col" whileHover={{
          scale: 1.02,
          boxShadow: '0px 10px 20px rgba(0,0,0,0.05)'
        }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <ProjectIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{project.digital_asset_name}</h3>
                      <p className="text-muted-foreground text-sm">{project.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Project Progress</span>
                        <span className="text-primary font-medium mono">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{
                  width: `${project.progress}%`
                }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Funding</span>
                        <span className="text-primary font-medium mono">{project.funding}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{
                  width: `${project.funding}%`
                }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Yield ROI</span>
                        <span className="text-primary font-medium mono">{project.roi}%</span>
                      </div>
                       <p className="text-xs text-muted-foreground">Based on actual production</p>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Start</span>
                      <span className="text-foreground font-medium mono">{new Date(project.estimated_start).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="text-center p-3 mt-4 bg-accent rounded-lg border">
                    <p className="text-primary font-semibold flex items-center justify-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Funding Complete</span>
                    </p>
                  </div>
                </motion.div>;
      })}
          </div>
        </motion.div>;
}