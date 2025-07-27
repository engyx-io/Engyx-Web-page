import React, { useState, useEffect, useCallback } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Shield, Briefcase, FileText, FileUp, Users, Newspaper, SearchCheck, LayoutDashboard, Settings, ArrowLeft, Coins as HandCoins, UserCheck, Network, PackageSearch, UserCog, ListChecks } from 'lucide-react';
    import { useLocation, useNavigate, Link } from 'react-router-dom';

    import AdminSidebar from '@/components/admin/AdminSidebar';
    import DigitalAssetsList from '@/components/admin/DigitalAssetsList';
    import CreateAssetWizard from '@/components/admin/CreateAssetWizard';
    import AssetDocumentsTab from '@/components/admin/AssetDocumentsTab';
    import StoTab from '@/components/admin/StoTab';
    import InvestorInfoTab from '@/components/admin/InvestorInfoTab';
    import TransactionStatusTab from '@/components/admin/TransactionStatusTab';
    import BlogManagerTab from '@/components/admin/BlogManagerTab';
    import SettingsTab from '@/components/admin/SettingsTab';
    import ProjectList from '@/components/admin/ProjectList';
    import ProjectForm from '@/components/admin/ProjectForm';
    import ProjectDocumentsTab from '@/components/admin/ProjectDocumentsTab';
    import { Button } from '@/components/ui/button';
    import AllowanceTab from '@/components/admin/AllowanceTab';
    import WhitelistStatusTab from '@/components/admin/WhitelistStatusTab';
    import NetworkInfoTab from '@/components/admin/NetworkInfoTab';
    import TokenInfoTab from '@/components/admin/TokenInfoTab';
    import TokenizerInfoTab from '@/components/admin/TokenizerInfoTab';
    import WhitelistCheckTab from '@/components/admin/WhitelistCheckTab';
    import AuthNavButton from '@/components/AuthNavButton';

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: ProjectList },
      { id: 'assets', label: 'Activos Digitales', icon: Briefcase, component: DigitalAssetsList },
      { id: 'tokenize', label: 'Tokenizar', icon: FileUp, component: CreateAssetWizard },
      { id: 'asset-docs', label: 'Docs de Activos', icon: FileText, component: AssetDocumentsTab },
      { id: 'project-docs', label: 'Docs de Proyectos', icon: FileText, component: ProjectDocumentsTab },
      { id: 'sto', label: 'STO', icon: Briefcase, component: StoTab },
      { id: 'investors', label: 'Inversores', icon: Users, component: InvestorInfoTab },
      { id: 'transactions', label: 'Transacciones', icon: SearchCheck, component: TransactionStatusTab },
      { id: 'allowance', label: 'Asignación', icon: HandCoins, component: AllowanceTab },
      { id: 'whitelist-balance', label: 'Balance Lista Blanca', icon: UserCheck, component: WhitelistStatusTab },
      { id: 'whitelist-status', label: 'Estado Lista Blanca', icon: ListChecks, component: WhitelistCheckTab },
      { id: 'network', label: 'Red', icon: Network, component: NetworkInfoTab },
      { id: 'token', label: 'Token', icon: PackageSearch, component: TokenInfoTab },
      { id: 'tokenizer', label: 'Tokenizador', icon: UserCog, component: TokenizerInfoTab },
      { id: 'blog', label: 'Blog', icon: Newspaper, component: BlogManagerTab },
      { id: 'settings', label: 'Configuración', icon: Settings, component: SettingsTab },
    ];

    export default function AdminPage() {
      const location = useLocation();
      const navigate = useNavigate();
      
      const [activeTab, setActiveTab] = useState('dashboard');
      const [digitalAssets, setDigitalAssets] = useState([]);
      const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(true);
      const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
      const [selectedProject, setSelectedProject] = useState(null);

      useEffect(() => {
        const tabFromUrl = location.hash.replace('#', '');
        if (tabFromUrl && menuItems.some(item => item.id === tabFromUrl)) {
          setActiveTab(tabFromUrl);
        } else {
          setActiveTab('dashboard');
        }
      }, [location]);

      const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        navigate(`#${tabId}`);
      };

      const fetchData = useCallback(async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const [assetsRes, projectsRes] = await Promise.all([
            supabase.from('digital_assets').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
            supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
          ]);

          if (assetsRes.error) {
            console.error('Error fetching digital assets:', assetsRes.error);
            toast({ title: "Error al cargar activos digitales", description: assetsRes.error.message, variant: "destructive" });
          } else {
            setDigitalAssets(assetsRes.data);
          }

          if (projectsRes.error) {
            console.error('Error fetching projects:', projectsRes.error);
            toast({ title: "Error al cargar proyectos", description: projectsRes.error.message, variant: "destructive" });
          } else {
            setProjects(projectsRes.data);
          }
        }
        setLoading(false);
      }, []);

      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const handleSuccess = () => {
        fetchData();
        setIsProjectFormOpen(false);
        setSelectedProject(null);
      };

      const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsProjectFormOpen(true);
      };

      const handleDeleteProject = async (projectId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;
        
        const { error } = await supabase.from('projects').delete().eq('id', projectId);
        if (error) {
          toast({ title: "Error al eliminar proyecto", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Proyecto eliminado", description: "El proyecto ha sido eliminado exitosamente." });
          fetchData();
        }
      };

      const handleDeleteAsset = async (assetId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este activo digital?')) return;
        
        const { error } = await supabase.from('digital_assets').delete().eq('id', assetId);
        if (error) {
          toast({ title: "Error al eliminar activo", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Activo eliminado", description: "El activo digital ha sido eliminado exitosamente." });
          fetchData();
        }
      };

      const handleCreateProject = () => {
        setSelectedProject(null);
        setIsProjectFormOpen(true);
      };

      const renderContent = () => {
        const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;
        if (!ActiveComponent) return null;

        const props = {
          dashboard: { projects: projects, onEdit: handleEditProject, onDelete: handleDeleteProject, onCreate: handleCreateProject },
          assets: { assets: digitalAssets, loading: loading, onDelete: handleDeleteAsset },
          tokenize: { onSuccess: handleSuccess, onCancel: () => {} },
          'asset-docs': { assets: digitalAssets },
          'project-docs': {},
          sto: { assets: digitalAssets },
          investors: { assets: digitalAssets },
          transactions: {},
          allowance: {},
          'whitelist-balance': {},
          'whitelist-status': {},
          network: {},
          token: {},
          tokenizer: {},
          blog: {},
          settings: {},
        };
        
        const key = activeTab.replace(/-/g, '_');
        props[key] = props[activeTab];

        return <ActiveComponent {...props[activeTab]} />;
      };

      return (
        <>
          <Helmet>
            <title>Panel de Administración - ENGYX</title>
            <meta name="description" content="Gestión de activos digitales de Engyx." />
          </Helmet>

          <div className="min-h-screen bg-background text-foreground">
            <div className="flex">
              <AdminSidebar menuItems={menuItems} activeTab={activeTab} onTabChange={handleTabChange} />
              
              <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-muted/30" style={{ maxHeight: '100vh' }}>
                <motion.div 
                  className="mb-8" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-primary"/>
                        Panel de Administración
                      </h1>
                      <p className="text-muted-foreground text-sm">
                        Gestiona todos los aspectos de la plataforma y los activos digitales.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Link to="/dashboard" className="flex-1 sm:flex-initial">
                            <Button variant="outline" className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                            </Button>
                        </Link>
                        <div className="flex-1 sm:w-auto">
                            <AuthNavButton />
                        </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5 }}
                >
                  {renderContent()}
                </motion.div>
              </main>
            </div>
          </div>
          
          <ProjectForm 
            isOpen={isProjectFormOpen} 
            setIsOpen={setIsProjectFormOpen} 
            project={selectedProject} 
            onSuccess={handleSuccess} 
          />
        </>
      );
    }