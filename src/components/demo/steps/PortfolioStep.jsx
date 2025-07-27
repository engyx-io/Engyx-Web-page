import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PortfolioStep({ portfolioData }) {
  const { t } = useTranslation('demo');
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('portfolio.title')}</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 rounded-lg tech-border text-center">
          <p className="text-muted-foreground text-sm mb-1">{t('portfolio.totalInvested')}</p>
          <p className="text-2xl font-bold text-foreground">${portfolioData.totalInvested.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 rounded-lg tech-border text-center">
          <p className="text-muted-foreground text-sm mb-1">{t('portfolio.currentValue')}</p>
          <p className="text-2xl font-bold text-foreground">${portfolioData.currentValue.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 rounded-lg tech-border text-center">
          <p className="text-muted-foreground text-sm mb-1">{t('portfolio.returns')}</p>
          <p className="text-2xl font-bold text-primary">+${portfolioData.totalReturns.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 rounded-lg tech-border text-center">
          <p className="text-muted-foreground text-sm mb-1">{t('portfolio.roi')}</p>
          <p className="text-2xl font-bold text-primary">+{portfolioData.roi}%</p>
        </div>
      </div>

      <div className="glass-card p-4 rounded-lg tech-border">
        <h3 className="text-foreground font-semibold mb-4">{t('portfolio.myTokens')}</h3>
        <div className="space-y-3">
          {Object.entries(portfolioData.tokens).map(([token, amount]) => (
            <div key={token} className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">{token}</span>
                </div>
                <span className="text-foreground font-medium">{t('portfolio.tokenName', { token })}</span>
              </div>
              <span className="text-primary font-bold">{amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}