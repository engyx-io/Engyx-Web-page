import React from 'react';
    import { useTranslation } from 'react-i18next';

    const ToggleSwitch = ({ label, description, enabled, onToggle }) => (
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
        <div>
          <h4 className="text-foreground font-medium">{label}</h4>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-primary' : 'bg-input'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );

    export default function NotificationsTab({ settings, handleSettingsUpdate }) {
      const { t } = useTranslation();
      return (
        <div className="bg-card p-8 rounded-xl border">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('profile.notificationsTab.title')}</h2>
          
          <div className="space-y-6">
            <ToggleSwitch
              label={t('profile.notificationsTab.email')}
              description={t('profile.notificationsTab.emailDesc')}
              enabled={settings.emailNotifications}
              onToggle={() => handleSettingsUpdate('emailNotifications', !settings.emailNotifications)}
            />
            <ToggleSwitch
              label={t('profile.notificationsTab.push')}
              description={t('profile.notificationsTab.pushDesc')}
              enabled={settings.pushNotifications}
              onToggle={() => handleSettingsUpdate('pushNotifications', !settings.pushNotifications)}
            />
            <ToggleSwitch
              label={t('profile.notificationsTab.marketing')}
              description={t('profile.notificationsTab.marketingDesc')}
              enabled={settings.marketingEmails}
              onToggle={() => handleSettingsUpdate('marketingEmails', !settings.marketingEmails)}
            />
          </div>
        </div>
      );
    }