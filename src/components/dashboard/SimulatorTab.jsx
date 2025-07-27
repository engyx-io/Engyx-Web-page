import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function SimulatorTab({ 
  investmentAmount = 1000, 
  setInvestmentAmount = () => {}, 
  selectedPeriod = 12, 
  setSelectedPeriod = () => {}, 
  selectedSimulatorProject, 
  setSelectedSimulatorProject = () => {}, 
  handleInvestmentClick,
  forSaleProjects = [],
  handleFeatureClick 
}) {
  const { t } = useTranslation();

  const availableProjects = forSaleProjects.filter(p => p.funding < 100);

  const getProjectROI = (projectId) => {
    const project = availableProjects.find(p => p.id === projectId);
    return project ? project.roi : 16.8;
  };

  const getProjectName = (projectId) => {
    const project = availableProjects.find(p => p.id === projectId);
    return project ? project.digital_asset_name : t('simulator.noProjectSelected');
  };

  const calculateProjectedReturns = () => {
    const selectedROI = getProjectROI(selectedSimulatorProject);
    const monthlyReturn = selectedROI / 100 / 12;
    const projection = investmentAmount * Math.pow(1 + monthlyReturn, selectedPeriod);
    const returns = projection - investmentAmount;
    return isNaN(returns) ? 0 : returns;
  };

  const handleStartInvestment = () => {
    const selectedProjectData = availableProjects.find(p => p.id === selectedSimulatorProject);
    if (selectedProjectData) {
      handleInvestmentClick(selectedProjectData);
    } else {
      handleFeatureClick();
    }
  };

  React.useEffect(() => {
    if (availableProjects.length > 0 && !selectedSimulatorProject) {
        setSelectedSimulatorProject(availableProjects[0].id);
    }
    if (availableProjects.length === 0 && selectedSimulatorProject) {
        setSelectedSimulatorProject(null);
    }
  }, [availableProjects, selectedSimulatorProject, setSelectedSimulatorProject]);

  if (availableProjects.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{t('simulator.title')}</h2>
        
        <div className="bg-card p-8 rounded-xl border text-center">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t('simulator.noProjectsAvailable')}</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {t('simulator.noProjectsDesc')}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{t('simulator.title')}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-foreground mb-6">{t('simulator.configureInvestment')}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-muted-foreground text-sm font-medium mb-2">
                {t('simulator.investmentAmount')}
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
                min="100"
                step="100"
              />
            </div>

            <div>
              <label className="block text-muted-foreground text-sm font-medium mb-2">
                {t('simulator.period')}
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
              >
                <option value={12}>{t('simulator.period12')}</option>
                <option value={24}>{t('simulator.period24')}</option>
                <option value={36}>{t('simulator.period36')}</option>
              </select>
            </div>

            <div>
              <label className="block text-muted-foreground text-sm font-medium mb-2">
                {t('simulator.selectProject')}
              </label>
              <select
                value={selectedSimulatorProject || ''}
                onChange={(e) => setSelectedSimulatorProject(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
              >
                {availableProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.digital_asset_name} (ROI: {project.roi}%)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-foreground mb-6">{t('simulator.projectedReturns')}</h3>
          
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-muted-foreground text-sm mb-2">{t('simulator.projectedGain')}</p>
              <p className="text-4xl font-bold text-primary">
                ${calculateProjectedReturns().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {t('simulator.inMonths', { months: selectedPeriod })}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('simulator.initialInvestment')}</span>
                <span className="text-foreground font-mono">${investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('simulator.estimatedROI')}</span>
                <span className="text-primary font-mono">{getProjectROI(selectedSimulatorProject)}% {t('simulator.annual')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('simulator.finalTotal')}</span>
                <span className="text-teal-500 font-mono font-bold">
                  ${(investmentAmount + calculateProjectedReturns()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('simulator.project')}:</span>
                <span className="text-primary font-mono text-sm text-right">{getProjectName(selectedSimulatorProject)}</span>
              </div>
            </div>

            <div className="p-4 bg-teal-500/5 rounded-lg border border-teal-500/10">
              <h4 className="text-foreground font-semibold mb-2">{t('simulator.environmentalImpact')}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('simulator.co2Avoided')}</span>
                  <span className="text-teal-500 font-mono">{Math.round(investmentAmount * 0.05)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('simulator.treesEquivalent')}</span>
                  <span className="text-teal-500 font-mono">{Math.round(investmentAmount * 0.002)}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleStartInvestment}
              className="w-full"
            >
              {t('simulator.startInvestment')}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}