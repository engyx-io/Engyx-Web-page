import React from 'react';
import { Button } from '@/components/ui/button';

const ToggleSwitch = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg">
    <div>
      <h4 className="text-emerald-100 font-medium">{label}</h4>
      <p className="text-emerald-200/70 text-sm">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-emerald-500' : 'bg-gray-600'
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

export default function SecurityTab({ settings, handleSettingsUpdate, handleFeatureClick }) {
  return (
    <div className="glass-card p-8 rounded-xl tech-border">
      <h2 className="text-2xl font-bold text-emerald-100 mb-6">Configuración de Seguridad</h2>
      
      <div className="space-y-6">
        <ToggleSwitch
          label="Autenticación de Dos Factores"
          description="Añade una capa extra de seguridad"
          enabled={settings.twoFactorAuth}
          onToggle={() => handleSettingsUpdate('twoFactorAuth', !settings.twoFactorAuth)}
        />
        <ToggleSwitch
          label="Alertas de Seguridad"
          description="Notificaciones de actividad sospechosa"
          enabled={settings.securityAlerts}
          onToggle={() => handleSettingsUpdate('securityAlerts', !settings.securityAlerts)}
        />

        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <Button
            onClick={handleFeatureClick}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            Cambiar Contraseña
          </Button>
          <Button
            onClick={handleFeatureClick}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            Descargar Backup
          </Button>
        </div>
      </div>
    </div>
  );
}