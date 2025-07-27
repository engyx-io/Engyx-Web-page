import React from 'react';
    import { User, Settings, Bell, Wallet, ShieldCheck } from 'lucide-react';
    import { useTranslation } from 'react-i18next';

    export default function ProfileTabs({ activeTab, setActiveTab }) {
      const { t } = useTranslation();
      const tabs = [
        { id: 'profile', label: t('profile.tabs.profile'), icon: User },
        { id: 'verification', label: t('profile.tabs.verification'), icon: ShieldCheck },
        { id: 'wallet', label: t('profile.tabs.wallet'), icon: Wallet },
        { id: 'settings', label: t('profile.tabs.settings'), icon: Settings },
        { id: 'notifications', label: t('profile.tabs.notifications'), icon: Bell }
      ];

      return (
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      );
    }