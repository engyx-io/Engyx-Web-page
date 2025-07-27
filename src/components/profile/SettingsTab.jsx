import React from 'react';
    import { useTranslation } from 'react-i18next';

    export default function SettingsTab({ settings, handleSettingsUpdate }) {
      const { t, i18n } = useTranslation();

      const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        handleSettingsUpdate('language', lang);
      };

      return (
        <div className="bg-card p-8 rounded-xl border">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('profile.settingsTab.title')}</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-muted-foreground text-sm font-medium mb-2">{t('profile.settingsTab.language')}</label>
                <select
                  value={i18n.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="es">{t('language.spanish')}</option>
                  <option value="en">{t('language.english')}</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground text-sm font-medium mb-2">{t('profile.settingsTab.currency')}</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleSettingsUpdate('currency', e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="USD">{t('profile.settingsTab.currencies.usd')}</option>
                  <option value="EUR">{t('profile.settingsTab.currencies.eur')}</option>
                  <option value="BTC">{t('profile.settingsTab.currencies.btc')}</option>
                  <option value="ETH">{t('profile.settingsTab.currencies.eth')}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-muted-foreground text-sm font-medium mb-2">{t('profile.settingsTab.riskTolerance')}</label>
                <select
                  value={settings.riskTolerance}
                  onChange={(e) => handleSettingsUpdate('riskTolerance', e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="low">{t('profile.settingsTab.riskLevels.low')}</option>
                  <option value="medium">{t('profile.settingsTab.riskLevels.medium')}</option>
                  <option value="high">{t('profile.settingsTab.riskLevels.high')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }