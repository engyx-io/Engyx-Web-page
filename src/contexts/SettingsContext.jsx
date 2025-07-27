import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
    import { supabase } from '@/lib/customSupabaseClient';
    import Loader from '@/components/Loader';
    import { useAuth } from '@/contexts/SupabaseAuthContext';

    const SettingsContext = createContext(undefined);

    export const useSettings = () => {
        const context = useContext(SettingsContext);
        if (context === undefined) {
            throw new Error('useSettings must be used within a SettingsProvider');
        }
        return context;
    };

    export const SettingsProvider = ({ children }) => {
      const [settings, setSettings] = useState({});
      const [loading, setLoading] = useState(true);
      const { signOut } = useAuth();

      const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase.from('app_settings').select('key, value');
            
            if (error) throw error;

            const newSettings = data.reduce((acc, { key, value }) => {
              acc[key] = value;
              return acc;
            }, {});
            
            setSettings(newSettings);
        } catch (error) {
            console.error('Error fetching app settings:', error);
            if (error.message.includes('Invalid Refresh Token') || error.message.includes('JWT')) {
                console.warn('Supabase session error detected, signing out.');
                await signOut();
            }
        } finally {
            setLoading(false);
        }
      }, [signOut]);

      useEffect(() => {
        fetchSettings();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_IN") {
            fetchSettings();
          }
        });

        return () => {
          authListener.subscription.unsubscribe();
        };
      }, [fetchSettings]);

      const value = {
        settings,
        loading,
        refreshSettings: fetchSettings,
      };

      if (loading && Object.keys(settings).length === 0) {
        return <Loader />;
      }

      return (
        <SettingsContext.Provider value={value}>
          {children}
        </SettingsContext.Provider>
      );
    };