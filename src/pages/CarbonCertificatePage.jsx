import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, ArrowRight, Check, Leaf, FileText, BarChart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Seleccionar proyecto', icon: FileText },
  { id: 2, title: 'Ingresar datos', icon: BarChart },
  { id: 3, title: 'Cálculo', icon: Leaf },
  { id: 4, title: 'Confirmar y generar', icon: Check },
];

export default function CarbonCertificatePage({ handleFeatureClick }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculatedCO2, setCalculatedCO2] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      projectId: '',
      startDate: '',
      endDate: '',
      totalProduction: '',
      emissionFactor: 0.4, // Default value tCO2e/MWh
      techManagerName: '',
      techManagerEmail: '',
    }
  });

  const watchProjectId = watch('projectId');
  const watchTotalProduction = watch('totalProduction');
  const watchEmissionFactor = watch('emissionFactor');

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('id, digital_asset_name, location');
      if (error) {
        toast({ title: 'Error', description: 'No se pudieron cargar los proyectos.', variant: 'destructive' });
      } else {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const handleNextStep = () => {
    if (currentStep < 4) {
      if(currentStep === 2) { // Moving to calculation step
        const co2 = parseFloat(watchTotalProduction) * parseFloat(watchEmissionFactor);
        setCalculatedCO2(co2);
      }
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      if(currentStep === 4) setCertificateData(null); // Clear certificate data when going back
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const co2 = parseFloat(data.totalProduction) * parseFloat(data.emissionFactor);
    const certificateCode = `ENGX-CO2-${new Date().getTime()}`;

    const submissionData = {
      project_id: data.projectId,
      user_id: user.id,
      start_date: data.startDate,
      end_date: data.endDate,
      production_mwh: data.totalProduction,
      emission_factor: data.emissionFactor,
      co2_avoided_tons: co2,
      technical_manager_name: data.techManagerName,
      technical_manager_email: data.techManagerEmail,
      certificate_code: certificateCode,
    };

    const { error } = await supabase.from('carbon_certificates').insert([submissionData]);
    
    if (error) {
      toast({ title: 'Error', description: 'No se pudo generar el certificado.', variant: 'destructive' });
    } else {
      toast({ title: 'Éxito', description: 'Certificado generado correctamente.' });
      setCertificateData({
        projectName: projects.find(p => p.id === data.projectId)?.digital_asset_name,
        location: projects.find(p => p.id === data.projectId)?.location,
        ...submissionData
      });
      // Do not auto-next step, wait for user action.
    }
    setIsSubmitting(false);
  };
  
  const selectedProject = projects.find(p => p.id === watchProjectId);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Paso 1: Seleccionar proyecto a certificar</h2>
            <p className="text-muted-foreground">Elija un proyecto de la lista para comenzar el proceso de certificación.</p>
            <div>
              <Label htmlFor="projectId">Proyecto</Label>
              <Controller
                name="projectId"
                control={control}
                rules={{ required: "Debe seleccionar un proyecto" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="projectId">
                      <SelectValue placeholder="Seleccione un proyecto..." />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.digital_asset_name} ({project.location})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.projectId && <p className="text-red-500 text-sm mt-1">{errors.projectId.message}</p>}
            </div>
            {selectedProject && (
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle>Detalles del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Nombre:</strong> {selectedProject.digital_asset_name}</p>
                    <p><strong>Ubicación:</strong> {selectedProject.location}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Paso 2: Ingresar datos de producción</h2>
            <p className="text-muted-foreground">Complete los siguientes campos. Si el proyecto tiene IoT, los datos pueden autocompletarse.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate">Periodo a certificar (Inicio)</Label>
                <Input id="startDate" type="date" {...register("startDate", { required: "Fecha de inicio es requerida" })} />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="endDate">Periodo a certificar (Fin)</Label>
                <Input id="endDate" type="date" {...register("endDate", { required: "Fecha de fin es requerida" })} />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="totalProduction">Producción total del periodo (MWh)</Label>
              <Input id="totalProduction" type="number" step="0.01" {...register("totalProduction", { required: "Producción es requerida", valueAsNumber: true })} />
              {errors.totalProduction && <p className="text-red-500 text-sm mt-1">{errors.totalProduction.message}</p>}
            </div>
            <div>
              <Label htmlFor="emissionFactor">Factor de emisión evitado (tCO₂e/MWh)</Label>
              <Input id="emissionFactor" type="number" step="0.01" {...register("emissionFactor", { required: "Factor de emisión es requerido", valueAsNumber: true })} />
              {errors.emissionFactor && <p className="text-red-500 text-sm mt-1">{errors.emissionFactor.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="techManagerName">Responsable técnico (Nombre)</Label>
                <Input id="techManagerName" {...register("techManagerName", { required: "Nombre del responsable es requerido" })} />
                {errors.techManagerName && <p className="text-red-500 text-sm mt-1">{errors.techManagerName.message}</p>}
              </div>
              <div>
                <Label htmlFor="techManagerEmail">Responsable técnico (Email)</Label>
                <Input id="techManagerEmail" type="email" {...register("techManagerEmail", { required: "Email del responsable es requerido" })} />
                {errors.techManagerEmail && <p className="text-red-500 text-sm mt-1">{errors.techManagerEmail.message}</p>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Paso 3: Cálculo automático del CO₂ evitado</h2>
            <p className="text-muted-foreground">Basado en los datos proporcionados, este es el resultado.</p>
            <Card className="bg-primary/10 border-primary/20 w-fit mx-auto">
              <CardContent className="p-8">
                <p className="text-lg">Se han evitado</p>
                <p className="text-5xl font-bold text-primary my-2">{calculatedCO2 ? calculatedCO2.toFixed(2) : '0.00'}</p>
                <p className="text-lg">toneladas de CO₂ en este periodo.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Paso 4: Confirmar y generar certificado</h2>
            {certificateData ? (
               <Card className="text-left w-full max-w-2xl mx-auto border-primary shadow-lg shadow-primary/20">
                <CardHeader>
                  <CardTitle className="text-center text-primary">Certificado Oficial de Reducción de Emisiones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Este documento certifica que el proyecto <strong>{certificateData.projectName}</strong> ha evitado la emisión de <strong>{certificateData.co2_avoided_tons.toFixed(2)} tCO₂e</strong> entre el <strong>{new Date(certificateData.start_date).toLocaleDateString()}</strong> y el <strong>{new Date(certificateData.end_date).toLocaleDateString()}</strong>.</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <p><strong>Tipo de energía:</strong> {selectedProject?.type || 'Renovable'}</p>
                      <p><strong>Ubicación:</strong> {certificateData.location}</p>
                      <p><strong>Producción validada:</strong> {certificateData.production_mwh} MWh</p>
                      <p><strong>Factor de emisión evitado:</strong> {certificateData.emission_factor} tCO₂e/MWh</p>
                    </div>
                    <div className="pt-4 mt-4 border-t">
                      <p><strong>Emitido por:</strong> Engyx – Plataforma de tokenización de infraestructura sustentable</p>
                      <p><strong>Certificado Nº:</strong> {certificateData.certificate_code}</p>
                      <p><strong>Fecha de emisión:</strong> {new Date(certificateData.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-center pt-4">
                      <Button onClick={handleFeatureClick}>Descargar PDF</Button>
                    </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <p className="text-muted-foreground">Revise los datos y confirme para generar el certificado.</p>
                <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} size="lg">
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Emitir certificado de carbono
                </Button>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Helmet>
        <title>Certificar Créditos de Carbono - ENGYX</title>
        <meta name="description" content="Genere certificados para sus proyectos de energía renovable." />
      </Helmet>

      <div className="pt-24 pb-20 px-6 text-foreground">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground title-glow mb-2">
                Generador de Certificados de Carbono
              </h1>
              <p className="text-muted-foreground">
                Siga los pasos para certificar la reducción de emisiones de sus proyectos.
              </p>
            </div>
            
            <div className="flex justify-center items-center mb-12">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= step.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-secondary border-border'}`}>
                      {currentStep > step.id ? <Check /> : <step.icon />}
                    </div>
                    <p className={`mt-2 text-sm transition-all duration-300 ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>{step.title}</p>
                  </div>
                  {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${currentStep > index + 1 ? 'bg-primary' : 'bg-border'}`}></div>}
                </React.Fragment>
              ))}
            </div>

            <Card>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button onClick={handlePrevStep} disabled={currentStep === 1} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              {currentStep < 4 ? (
                <Button onClick={handleNextStep} disabled={currentStep === 4 || (currentStep === 1 && !watchProjectId) }>
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Link to="/marketplace">
                  <Button>Finalizar</Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}