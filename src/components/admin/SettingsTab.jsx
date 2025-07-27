import React, { useState, useEffect } from 'react';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Switch } from '@/components/ui/switch';
    import { Label } from '@/components/ui/label';
    import { toast } from '@/components/ui/use-toast';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { useSettings } from '@/contexts/SettingsContext';
    import { motion } from 'framer-motion';
    import { Eye, EyeOff } from 'lucide-react';

    const SettingsTab = () => {
      const { settings, refreshSettings } = useSettings();
      const [showPresale, setShowPresale] = useState(false);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        if (settings.show_presale_page) {
          setShowPresale(settings.show_presale_page.enabled);
        }
        setLoading(false);
      }, [settings]);

      const handlePresaleToggle = async (checked) => {
        setLoading(true);
        setShowPresale(checked);

        const { error } = await supabase
          .from('app_settings')
          .update({ value: { enabled: checked } })
          .eq('key', 'show_presale_page');

        if (error) {
          toast({
            title: 'Error al actualizar',
            description: 'No se pudo cambiar la visibilidad de la página de preventa.',
            variant: 'destructive',
          });
          setShowPresale(!checked);
        } else {
          toast({
            title: 'Configuración actualizada',
            description: `Página de preventa ${checked ? 'habilitada' : 'deshabilitada'}.`,
          });
          refreshSettings();
        }
        setLoading(false);
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Configuración General de la Aplicación</CardTitle>
              <CardDescription className="text-muted-foreground">
                Gestiona la visibilidad de características y otras configuraciones globales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center p-4 text-muted-foreground">Cargando configuración...</div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
                    <div className="flex items-center gap-4">
                      {showPresale ? <Eye className="h-6 w-6 text-primary" /> : <EyeOff className="h-6 w-6 text-destructive" />}
                      <div>
                        <Label htmlFor="presale-toggle" className="text-base font-medium text-foreground">
                          Página de Preventa
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Controla si la página de preventa es visible para los usuarios.
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="presale-toggle"
                      checked={showPresale}
                      onCheckedChange={handlePresaleToggle}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default SettingsTab;