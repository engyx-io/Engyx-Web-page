import React, { useState, useEffect, useCallback } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { User, RefreshCw, Shield } from 'lucide-react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { toast } from '@/components/ui/use-toast';
    import { useTranslation } from 'react-i18next';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import DashboardTabs from '@/components/dashboard/DashboardTabs';
    import OverviewTab from '@/components/dashboard/OverviewTab';
    import SimulatorTab from '@/components/dashboard/SimulatorTab';
    import StakingTab from '@/components/dashboard/StakingTab';
    import ForSaleTab from '@/components/dashboard/ForSaleTab';
    import InvestmentModal from '@/components/dashboard/DevelopmentInvestment';
    import ProjectsTab from '@/components/dashboard/PlantsTab';
    import DevelopmentTab from '@/components/dashboard/DevelopmentTab';
    import PortfolioTab from '@/components/dashboard/PortfolioTab';
    import MapTab from '@/components/dashboard/MapTab';
    import ProjectForm from '@/components/admin/ProjectForm';
    import ManageInvestmentModal from '@/components/dashboard/ManageInvestmentModal';
    import { supabase } from '@/lib/customSupabaseClient';

    export default function DashboardPage({ handleFeatureClick }) {
      const { t } = useTranslation();
      const { user, isAdmin } = useAuth();
      const navigate = useNavigate();
      const [selectedTab, setSelectedTab] = useState('overview');
      const [selectedInvestmentProject, setSelectedInvestmentProject] = useState(null);
      const [lastUpdate, setLastUpdate] = useState(new Date());
      
      const [verificationStatus, setVerificationStatus] = useState(null);
      const [projects, setProjects] = useState([]);
      const [myPortfolio, setMyPortfolio] = useState([]);
      const [globalStats, setGlobalStats] = useState({
        total_energy_capacity: 0,
        generated_carbon_credits: 0,
        energy_revenue: 0,
        carbon_revenue: 0,
        total_investors: 0,
        avg_roi: 0,
        networkStatus: 'operational'
      });
      const [loading, setLoading] = useState(true);
      const [isFormOpen, setIsFormOpen] = useState(false);
      const [isManageModalOpen, setIsManageModalOpen] = useState(false);
      const [selectedInvestmentForManagement, setSelectedInvestmentForManagement] = useState(null);
      const [selectedProject, setSelectedProject] = useState(null);

      const [investmentAmount, setInvestmentAmount] = useState(1000);
      const [selectedPeriod, setSelectedPeriod] = useState(12);
      const [selectedSimulatorProject, setSelectedSimulatorProject] = useState(null);

      const fetchData = useCallback(async () => {
        setLoading(true);
        
        const projectsPromise = supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        const portfolioPromise = user 
          ? supabase
              .from('user_investments')
              .select('*, projects(*)')
              .eq('user_id', user.id)
          : Promise.resolve({ data: [], error: null });

        const globalStatsPromise = supabase.rpc('get_global_stats');

        const profilePromise = user 
          ? supabase.from('user_profiles').select('verification_status').eq('id', user.id).single()
          : Promise.resolve({ data: null, error: null });
          
        const [projectsResult, portfolioResult, globalStatsResult, profileResult] = await Promise.all([projectsPromise, portfolioPromise, globalStatsPromise, profilePromise]);

        if (projectsResult.error) {
          console.error('Error fetching projects:', projectsResult.error);
        } else {
          setProjects(projectsResult.data);
        }

        if (portfolioResult.error) {
          console.error('Error fetching portfolio:', portfolioResult.error);
        } else {
          setMyPortfolio(portfolioResult.data);
        }
        
        if (globalStatsResult.error) {
           console.error('Error fetching global stats:', globalStatsResult.error);
        } else {
          if (globalStatsResult.data && globalStatsResult.data.length > 0) {
            setGlobalStats(prev => ({ ...prev, ...globalStatsResult.data[0] }));
          }
        }

        if (profileResult.error && profileResult.error.code !== 'PGRST116') {
          console.error('Error fetching profile status:', profileResult.error);
        } else if (profileResult.data) {
          setVerificationStatus(profileResult.data.verification_status);
        } else {
          setVerificationStatus('not_verified');
        }

        setLoading(false);
        setLastUpdate(new Date());
      }, [user]);

      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const handleUpdateData = () => {
        fetchData();
        toast({
          title: t('notification.dataUpdated'),
          description: t('notification.dataUpdatedDesc'),
        });
      };

      const handleFormSubmit = () => {
        setIsFormOpen(false);
        fetchData();
      };

      const handleManageInvestment = (investment) => {
        setSelectedInvestmentForManagement(investment);
        setIsManageModalOpen(true);
      };

      const forSaleProjects = React.useMemo(() => projects.filter(p => p.status === 'for_sale'), [projects]);
      const developmentProjects = React.useMemo(() => projects.filter(p => p.status === 'in_development'), [projects]);
      const activeProjects = React.useMemo(() => projects.filter(p => p.status === 'active'), [projects]);

      const handleInvestmentClick = (project) => {
        if (!user) {
          toast({
            title: "Login to invest",
            description: "You must be logged into your account to invest in projects.",
            variant: "destructive",
          });
          return;
        }
         if (verificationStatus !== 'verified') {
          toast({
            title: "KYC Verification Required",
            description: "You must complete KYC verification in your profile to invest.",
            variant: "destructive",
          });
          navigate('/profile');
          return;
        }
        setSelectedInvestmentProject(project);
      };

      const renderTabContent = () => {
        if (loading) {
          return <div className="text-center p-12 text-lg text-foreground">Loading platform data...</div>;
        }
        switch (selectedTab) {
          case 'overview':
            return <OverviewTab globalStats={globalStats} activeProjects={activeProjects.length} allProjects={projects.length} />;
          case 'portfolio':
            return <PortfolioTab myPortfolio={myPortfolio} handleManageInvestment={handleManageInvestment} />;
          case 'for-sale':
            return <ForSaleTab forSaleProjects={forSaleProjects} handleInvestmentClick={handleInvestmentClick} />;
          case 'development':
            return <DevelopmentTab developmentProjects={developmentProjects} />;
          case 'projects':
            return <ProjectsTab activeProjects={activeProjects} setSelectedProject={setSelectedProject} handleFeatureClick={handleFeatureClick} />;
          case 'map':
            return <MapTab projects={projects} />;
          case 'simulator':
            return (
              <SimulatorTab
                investmentAmount={investmentAmount}
                setInvestmentAmount={setInvestmentAmount}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                selectedSimulatorProject={selectedSimulatorProject}
                setSelectedSimulatorProject={setSelectedSimulatorProject}
                handleInvestmentClick={handleInvestmentClick}
                forSaleProjects={forSaleProjects}
                handleFeatureClick={handleFeatureClick}
              />
            );
          case 'staking':
            return <StakingTab handleFeatureClick={handleFeatureClick} />;
          default:
            return <OverviewTab globalStats={globalStats} activeProjects={activeProjects.length} allProjects={projects.length} />;
        }
      };

      return (
        <>
          <Helmet>
            <title>Dashboard Digital Assets - ENGYX</title>
            <meta name="description" content={t('dashboard.metaDescription')} />
          </Helmet>

          <div className="pt-24 pb-20 px-6 min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl">
              <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground title-glow mb-2">
                      Digital Assets Dashboard
                    </h1>
                    <p className="text-muted-foreground mono text-sm">
                      {t('dashboard.subtitle')} • {t('dashboard.lastUpdate')}: {lastUpdate.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                     {user && (
                      <Link to="/profile">
                        <Button variant="outline" size="sm">
                          <User className="w-4 h-4 mr-2" />
                          {t('dashboard.profile')}
                        </Button>
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/admin">
                        <Button variant="outline" size="sm">
                          <Shield className="w-4 h-4 mr-2" />
                          {t('tabs.admin')}
                        </Button>
                      </Link>
                    )}
                    <Button onClick={handleUpdateData} variant="outline" size="sm" disabled={loading}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Updating...' : t('dashboard.update')}
                    </Button>
                  </div>
                </div>
                <DashboardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              </motion.div>
              {renderTabContent()}
            </div>
          </div>

          {selectedInvestmentProject && (
            <InvestmentModal
              project={selectedInvestmentProject}
              onClose={() => setSelectedInvestmentProject(null)}
              onSuccess={fetchData}
            />
          )}
          
          <ProjectForm
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            project={null}
            onSuccess={handleFormSubmit}
          />

          <ManageInvestmentModal
            isOpen={isManageModalOpen}
            onClose={() => setIsManageModalOpen(false)}
            investment={selectedInvestmentForManagement}
            handleFeatureClick={handleFeatureClick}
          />
        </>
      );
    }