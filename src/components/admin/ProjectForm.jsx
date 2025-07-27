import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2, ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import GeneralInfoForm from '@/components/admin/project-form/GeneralInfoForm';
import FinancialInfoForm from '@/components/admin/project-form/FinancialInfoForm';
import TechnicalInfoForm from '@/components/admin/project-form/TechnicalInfoForm';
import LegalInfoForm from '@/components/admin/project-form/LegalInfoForm';
import initialData from '@/components/admin/project-form/initialData';

const steps = [
  { id: 'general', title: 'Información General', component: GeneralInfoForm },
  { id: 'financial', title: 'Información Financiera', component: FinancialInfoForm },
  { id: 'technical', title: 'Información Técnica', component: TechnicalInfoForm },
  { id: 'legal', title: 'Información Legal', component: LegalInfoForm },
];

export default function ProjectForm({ isOpen, setIsOpen, project, onSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [digitalAssets, setDigitalAssets] = useState([]);

  const fetchDigitalAssets = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('digital_assets')
      .select('id, asset_name, asset_symbol, logo_url, legal_doc_url, contract_address, network, payment_tokens')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching digital assets:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los activos digitales.",
        variant: "destructive",
      });
    } else {
      setDigitalAssets(data);
    }
  }, [user]);

  useEffect(() => {
    fetchDigitalAssets();
  }, [fetchDigitalAssets]);

  useEffect(() => {
    if (project) {
      setFormData({
        general: {
          digital_asset_id: project.digital_asset_id || '',
          type: project.type || '',
          location: project.location || '',
          status: project.status || 'upcoming',
          image_url: project.image_url || '',
          latitude: project.latitude || '',
          longitude: project.longitude || '',
        },
        financial: project.financial_info || initialData.financial,
        technical: project.technical_info || initialData.technical,
        legal: project.legal_info || initialData.legal,
      });
    } else {
      setFormData(initialData);
    }
    setCurrentStep(0);
    setIsSuccess(false);
  }, [project, isOpen]);

  const handleDataChange = (step, data) => {
    setFormData(prev => ({ ...prev, [step]: data }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedAsset = digitalAssets.find(asset => asset.id === formData.general.digital_asset_id);

    const projectData = {
      digital_asset_id: formData.general.digital_asset_id,
      digital_asset_name: selectedAsset?.asset_name || '',
      digital_asset_symbol: selectedAsset?.asset_symbol || '',
      digital_asset_logo_url: selectedAsset?.logo_url || '',
      legal_document_url: selectedAsset?.legal_doc_url || '',
      smart_contract_network: selectedAsset?.contract_address || '',
      tokenization_networks: [selectedAsset?.network] || [],
      accepted_payment_tokens: selectedAsset?.payment_tokens || [],
      type: formData.general.type,
      location: formData.general.location,
      status: formData.general.status,
      image_url: formData.general.image_url,
      latitude: formData.general.latitude,
      longitude: formData.general.longitude,
      financial_info: formData.financial,
      technical_info: formData.technical,
      legal_info: formData.legal,
      user_id: user.id
    };

    let response;
    if (project) {
      response = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', project.id);
    } else {
      response = await supabase
        .from('projects')
        .insert([projectData]);
    }

    setIsSubmitting(false);

    if (response.error) {
      console.error("Error saving project:", response.error);
      toast({
        title: "Error",
        description: `Hubo un error al guardar el proyecto: ${response.error.message}`,
        variant: "destructive",
      });
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        toast({
          title: "¡Éxito!",
          description: `Proyecto ${project ? 'actualizado' : 'creado'} correctamente.`,
        });
        onSuccess();
        setIsOpen(false);
      }, 1500);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col glass-card text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-300">
            {project ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
          </DialogTitle>
          <DialogDescription className="text-emerald-200/70">
            Completa los siguientes pasos para {project ? 'actualizar el' : 'configurar un nuevo'} proyecto.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center flex-grow"
            >
              <CheckCircle className="w-24 h-24 text-green-400 mb-6" />
              <h2 className="text-2xl font-bold text-white">¡Proyecto Guardado!</h2>
              <p className="text-slate-300">El proyecto ha sido {project ? 'actualizado' : 'creado'} con éxito.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4 px-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          index === currentStep ? 'bg-emerald-500 scale-110' : 'bg-gray-600'
                        } ${index < currentStep ? 'bg-emerald-600' : ''}`}
                      >
                        {index < currentStep ? <CheckCircle className="w-5 h-5 text-white" /> : index + 1}
                      </div>
                      <p className={`mt-2 text-xs text-center ${index === currentStep ? 'font-bold text-emerald-300' : 'text-gray-400'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${index < currentStep ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex-grow overflow-y-auto pr-2 -mr-2 custom-scrollbar">
                  <CurrentStepComponent
                    formData={formData[steps[currentStep].id]}
                    setFormData={(data) => handleDataChange(steps[currentStep].id, data)}
                    digitalAssets={digitalAssets}
                  />
              </div>

              <div className="flex justify-between items-center pt-6 mt-auto">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button onClick={handleNext} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {project ? 'Guardar Cambios' : 'Crear Proyecto'}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}