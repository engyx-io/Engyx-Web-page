import React, { useState, useEffect, useCallback } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Loader2 } from 'lucide-react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { toast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { supabase } from '@/lib/customSupabaseClient';
    import ProfileSidebar from '@/components/profile/ProfileSidebar';
    import ProfileInfoTab from '@/components/profile/ProfileInfoTab';
    import WalletTab from '@/components/profile/WalletTab';
    import SettingsTab from '@/components/profile/SettingsTab';
    import NotificationsTab from '@/components/profile/NotificationsTab';
    import VerificationTab from '@/components/profile/VerificationTab';
    import InvestorStats from '@/components/profile/InvestorStats';
    import { useTranslation } from 'react-i18next';

    export default function ProfilePage({ handleFeatureClick }) {
      const { t } = useTranslation();
      const { user, loading: authLoading } = useAuth();
      const navigate = useNavigate();
      const [activeTab, setActiveTab] = useState('profile');
      
      const [userProfile, setUserProfile] = useState(null);
      const [investorData, setInvestorData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [isSaving, setIsSaving] = useState(false);

      const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: true,
        securityAlerts: true,
        twoFactorAuth: false,
        language: 'es',
        currency: 'USD',
        autoReinvest: false,
        riskTolerance: 'medium'
      });

      const getInvestorLevel = (totalInvested) => {
        if (totalInvested >= 50000) return t('profile.investorStats.levels.geo');
        if (totalInvested >= 10000) return t('profile.investorStats.levels.greenHydrogen');
        if (totalInvested >= 2500) return t('profile.investorStats.levels.wind');
        if (totalInvested >= 500) return t('profile.investorStats.levels.solar');
        if (totalInvested >= 50) return t('profile.investorStats.levels.seed');
        return t('profile.investorStats.levels.initial');
      };

      const fetchProfileData = useCallback(async () => {
        if (!user) {
          setLoading(false);
          return;
        }
        
        setLoading(true);

        try {
          const profilePromise = supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          const investmentsPromise = supabase
            .from('user_investments')
            .select('amount_usd, projects(status)')
            .eq('user_id', user.id);
            
          const walletsPromise = supabase
            .from('user_wallets')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });

          const [{ data: profileData, error: profileError }, { data: investments, error: investmentsError }, { data: wallets, error: walletsError }] = await Promise.all([profilePromise, investmentsPromise, walletsPromise]);

          if (profileError && profileError.code !== 'PGRST116') throw profileError;
          if (investmentsError) throw investmentsError;
          if (walletsError) throw walletsError;

          const totalInvested = investments.reduce((sum, item) => sum + item.amount_usd, 0);
          const activeProjects = investments.filter(item => item.projects?.status === 'active').length;
          const investorLevel = getInvestorLevel(totalInvested);

          const currentInvestorData = {
            totalInvested,
            activeProjects,
            totalReturns: 0,
            investorLevel,
          };
          setInvestorData(currentInvestorData);
          
          const fullUserProfile = {
            id: user.id,
            email: user.email,
            joinDate: user.created_at,
            wallets: wallets || [],
            investorLevel: investorLevel,
            full_name: profileData?.full_name || user.user_metadata?.full_name || '',
            birth_date: profileData?.birth_date || '',
            nationality: profileData?.nationality || '',
            address: profileData?.address || '',
            document_type: profileData?.document_type || '',
            document_number: profileData?.document_number || '',
            ssn_itin: profileData?.ssn_itin || '',
            avatar_url: profileData?.avatar_url || null,
            verification_status: profileData?.verification_status || 'not_verified',
            applicant_id: profileData?.applicant_id || null,
          };
          
          setUserProfile(fullUserProfile);

        } catch (error) {
          console.error("Error fetching profile data: ", error)
          toast({ title: t('profile.notifications.loadErrorTitle'), description: t('profile.notifications.loadErrorDesc'), variant: 'destructive' });
        } finally {
          setLoading(false);
        }
      }, [user, t]);

      useEffect(() => {
        if (user) {
            fetchProfileData();
        } else if (!authLoading) {
            setLoading(false);
        }
      }, [user, authLoading, fetchProfileData]);

      const handleProfileUpdate = async (updatedProfile) => {
        if (!user) return { error: { message: "User not authenticated."}};
        setIsSaving(true);

        const changedData = {};
        Object.keys(updatedProfile).forEach(key => {
          if (updatedProfile[key] !== userProfile[key]) {
            changedData[key] = updatedProfile[key];
          }
        });

        if (Object.keys(changedData).length === 0) {
          toast({ title: t('profile.notifications.noChangesTitle'), description: t('profile.notifications.noChangesDesc') });
          setIsSaving(false);
          return { error: null };
        }

        const { wallets, investorLevel, email, joinDate, ...profileFieldsToUpdate } = changedData;

        const dataToUpdate = {
          ...profileFieldsToUpdate,
          id: user.id,
          updated_at: new Date().toISOString(),
        };

        if (dataToUpdate.birth_date === '') {
          dataToUpdate.birth_date = null;
        }
        
        const { error } = await supabase
          .from('user_profiles')
          .upsert(dataToUpdate, { onConflict: 'id' });

        if (error) {
            toast({ title: t('profile.notifications.updateErrorTitle'), description: error.message, variant: 'destructive' });
        } else {
            toast({ title: t('profile.notifications.updateSuccessTitle'), description: t('profile.notifications.updateSuccessDesc') });
            await fetchProfileData();
        }
        
        setIsSaving(false);
        return { error };
      };

      const handleSettingsUpdate = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        toast({
          title: t('profile.notifications.settingsUpdatedTitle'),
          description: t('profile.notifications.settingsUpdatedDesc'),
        });
      };

      const renderTabContent = () => {
        if (!userProfile) return null;

        switch (activeTab) {
          case 'profile':
            return <ProfileInfoTab userProfile={userProfile} onSave={handleProfileUpdate} isSaving={isSaving} />;
          case 'verification':
            return <VerificationTab userProfile={userProfile} onVerificationUpdate={fetchProfileData} />;
          case 'wallet':
            return <WalletTab userProfile={userProfile} onWalletDeleted={fetchProfileData} />;
          case 'settings':
            return <SettingsTab settings={settings} handleSettingsUpdate={handleSettingsUpdate} />;
          case 'notifications':
            return <NotificationsTab settings={settings} handleSettingsUpdate={handleSettingsUpdate} />;
          default:
            return <ProfileInfoTab userProfile={userProfile} onSave={handleProfileUpdate} isSaving={isSaving} />;
        }
      };

      if (authLoading || loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        );
      }
      
      if (!user) {
         return (
             <div className="flex flex-col justify-center items-center h-screen text-center px-6">
                <h1 className="text-3xl font-bold text-foreground title-glow mb-4">{t('profile.accessRequired')}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    {t('profile.accessRequiredDesc')}
                </p>
                <Link to="/comenzar">
                    <Button>
                        {t('profile.loginOrRegister')}
                    </Button>
                </Link>
            </div>
         )
      }

      return (
        <>
          <Helmet>
            <title>{t('profile.metaTitle')}</title>
            <meta name="description" content={t('profile.metaDescription')} />
          </Helmet>

          <div className="pt-24 pb-20 px-6 text-foreground">
            <div className="container mx-auto max-w-6xl">
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t('profile.backToPlatform')}
                    </Button>
                  </Link>
                </div>
                
                <div className="text-center">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground title-glow">
                    {t('profile.title')}
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('profile.subtitle')}
                  </p>
                </div>
              </motion.div>

              {userProfile && investorData ? (
                <div className="grid lg:grid-cols-4 gap-8">
                  <ProfileSidebar 
                    userProfile={userProfile}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onAvatarChange={fetchProfileData}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="lg:col-span-3"
                  >
                    {activeTab === 'profile' && user && <InvestorStats investorData={investorData} />}
                    <div className="mt-8">
                      {renderTabContent()}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-10">{t('profile.loading')}</div>
              )}
            </div>
          </div>
        </>
      );
    }