import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function SimulatorStep() {
  const { t } = useTranslation('demo');
  const [investment, setInvestment] = useState(10000);
  const [period, setPeriod] = useState(12);
  const [plantType, setPlantType] = useState('solar');
  const [results, setResults] = useState({
    roi: 0,
    projectedReturn: 0,
    total: 0,
    co2Avoided: 0
  });

  const baseRoi = {
    solar: 18.5,
    eolica: 16.2,
    hidrogeno: 22.0
  };

  const co2Factor = {
    solar: 1.5,
    eolica: 1.8,
    hidrogeno: 0.5 
  };

  useEffect(() => {
    const calculateProjection = () => {
      const annualRoi = baseRoi[plantType];
      const periodRoi = (annualRoi / 12) * period;
      const projectedReturn = (investment * periodRoi) / 100;
      const total = investment + projectedReturn;
      const co2Avoided = (investment / 1000) * co2Factor[plantType] * (period / 12);

      setResults({
        roi: periodRoi,
        projectedReturn: projectedReturn,
        total: total,
        co2Avoided: co2Avoided
      });
    };

    calculateProjection();
  }, [investment, period, plantType]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('simulator.title')}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-muted-foreground text-sm font-medium mb-2">
              {t('simulator.investmentAmount')}
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
              step="100"
            />
          </div>
          
          <div>
            <label className="block text-muted-foreground text-sm font-medium mb-2">
              {t('simulator.period')}
            </label>
            <select 
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
            >
              <option value="12">{t('simulator.months', { count: 12 })}</option>
              <option value="24">{t('simulator.months', { count: 24 })}</option>
              <option value="36">{t('simulator.months', { count: 36 })}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-muted-foreground text-sm font-medium mb-2">
              {t('simulator.plantType')}
            </label>
            <select 
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
            >
              <option value="solar">{t('simulator.types.solar')}</option>
              <option value="eolica">{t('simulator.types.wind')}</option>
              <option value="hidrogeno">{t('simulator.types.hydrogen')}</option>
            </select>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg tech-border">
          <h3 className="text-foreground font-semibold mb-4">{t('simulator.projectedReturns')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('simulator.initialInvestment')}</span>
              <span className="text-foreground">${investment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('simulator.estimatedROI', { months: period })}</span>
              <span className="text-primary">{results.roi.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('simulator.projectedReturn')}</span>
              <span className="text-primary font-bold">${results.projectedReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="text-foreground font-medium">{t('simulator.estimatedTotal')}</span>
                <span className="text-primary font-bold text-lg">${results.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-muted-foreground text-sm">
              <strong>{t('simulator.envImpact')}:</strong> {t('simulator.co2Avoided', { amount: results.co2Avoided.toFixed(2) })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}