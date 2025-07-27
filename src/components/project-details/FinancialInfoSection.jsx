import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, Sun, MapPin, UserCheck, Calendar, Briefcase, BarChart, Percent, CalendarDays, FileSignature, Search, CheckCircle } from 'lucide-react';

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <Icon className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
    <div>
      <p className="text-emerald-200/70 text-sm">{label}</p>
      <p className="text-white font-medium">{value || 'No especificado'}</p>
    </div>
  </div>
);

const FinancialInfoSection = ({ project }) => {
  const { financial_info, type, location, progress } = project;

  if (!financial_info) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="glass-card rounded-xl tech-border overflow-hidden">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-emerald-100 text-left">Información Financiera del Activo</h2>
                <p className="text-emerald-200/70 text-sm text-left">Datos clave sobre el proyecto y sus flujos de ingresos.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-emerald-100 mb-4">Información del Proyecto</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DetailItem icon={Sun} label="Tipo de Planta" value={type} />
                  <DetailItem icon={MapPin} label="Ubicación y Tamaño (MW)" value={`${location} - ${project.capacity} MW`} />
                  <DetailItem icon={UserCheck} label="Entidad Operadora" value={financial_info.operator} />
                  <DetailItem icon={Briefcase} label="Estado Actual" value={financial_info.current_status} />
                  <DetailItem icon={Calendar} label="Fecha de Operación (COD)" value={financial_info.cod_date ? new Date(financial_info.cod_date).toLocaleDateString() : 'N/A'} />
                </div>
              </div>
              <div className="border-t border-emerald-500/20"></div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-100 mb-4">Flujo de Ingresos</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DetailItem icon={BarChart} label="Modelo de Negocio" value={financial_info.business_model} />
                  <DetailItem icon={BarChart} label="Tarifa de Venta de Energía" value={financial_info.energy_sale_price} />
                  <DetailItem icon={TrendingUp} label="Ingresos Proyectados" value={financial_info.revenue_projections} />
                  <DetailItem icon={Percent} label="Porcentaje Distribuido al Token" value={`${progress}%`} />
                  <DetailItem icon={CalendarDays} label="Periodicidad de Pago" value={financial_info.payment_frequency} />
                </div>
              </div>
              <div className="border-t border-emerald-500/20"></div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-100 mb-4">Contrato Inteligente Asociado</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <DetailItem icon={FileSignature} label="Dirección del Smart Contract" value={financial_info.smart_contract_address} />
                  <DetailItem icon={Search} label="Enlace al Explorador" value={financial_info.explorer_link} />
                  <DetailItem icon={CheckCircle} label="Auditoría del Contrato" value={financial_info.contract_audit} />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default FinancialInfoSection;