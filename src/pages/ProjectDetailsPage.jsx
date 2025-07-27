import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sun, Wind, Droplets, DollarSign } from 'lucide-react';
import LegalInfoSection from '@/components/project-details/LegalInfoSection';
import FinancialInfoSection from '@/components/project-details/FinancialInfoSection';
import TechnicalInfoSection from '@/components/project-details/TechnicalInfoSection';

const ProjectDetailsPage = ({ handleFeatureClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ppaDocumentUrl, setPpaDocumentUrl] = useState(null);
  const [revenueContractUrl, setRevenueContractUrl] = useState(null);

  const fetchProjectDetails = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: "Error al cargar el proyecto",
        description: error.message || "No se pudo encontrar el proyecto solicitado.",
        variant: "destructive",
      });
      navigate('/mercado');
      setLoading(false);
      return;
    }
    
    setProject(data);

    const { data: documentsData, error: documentsError } = await supabase
      .from('project_documents')
      .select('name, file_path')
      .eq('project_id', id);

    if (!documentsError && documentsData) {
      const ppaDoc = documentsData.find(doc => doc.name && doc.name.toLowerCase().includes('contract ppa'));
      if (ppaDoc) {
        const { data: ppaUrlData, error: ppaUrlError } = supabase
          .storage
          .from('project_documents')
          .getPublicUrl(ppaDoc.file_path);

        if (!ppaUrlError) {
          setPpaDocumentUrl(ppaUrlData.publicUrl);
        } else {
          console.error("Error getting public URL for PPA:", ppaUrlError.message);
        }
      }
      
      const revenueContractDoc = documentsData.find(doc => doc.name && doc.name.toLowerCase().includes('contrato de ingresos'));
      if (revenueContractDoc) {
        const { data: revenueUrlData, error: revenueUrlError } = supabase
          .storage
          .from('project_documents')
          .getPublicUrl(revenueContractDoc.file_path);

        if (!revenueUrlError) {
          setRevenueContractUrl(revenueUrlData.publicUrl);
        } else {
          console.error("Error getting public URL for Revenue Contract:", revenueUrlError.message);
        }
      }

    } else if (documentsError) {
      console.error("Error fetching project documents:", documentsError.message);
    }

    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const getPlantIcon = (type) => {
    switch (type) {
      case 'solar': return <Sun className="w-8 h-8 text-emerald-400" />;
      case 'wind': return <Wind className="w-8 h-8 text-blue-400" />;
      case 'hydro': return <Droplets className="w-8 h-8 text-cyan-400" />;
      case 'green_hydrogen': return <Droplets className="w-8 h-8 text-green-400" />;
      default: return <Sun className="w-8 h-8 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20 text-white">
        Proyecto no encontrado.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.digital_asset_name} - Detalles del Activo - ENGYX</title>
        <meta name="description" content={`Información detallada sobre el activo digital ${project.digital_asset_name}.`} />
      </Helmet>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <Link to="/mercado">
                <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Mercado
                </Button>
              </Link>
            </div>

            <div className="glass-card p-8 rounded-xl tech-border mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    {getPlantIcon(project.type)}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-emerald-100">{project.digital_asset_name}</h1>
                    <p className="text-emerald-200/70 text-lg">{project.location}</p>
                  </div>
                </div>
                <Button onClick={() => handleFeatureClick()} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Invertir Ahora
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <FinancialInfoSection project={project} />
              <LegalInfoSection project={project} ppaDocumentUrl={ppaDocumentUrl} revenueContractUrl={revenueContractUrl} />
              <TechnicalInfoSection project={project} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;