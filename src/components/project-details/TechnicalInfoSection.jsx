import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cpu, Link, Tag, GitBranch, Globe, Vote } from 'lucide-react';

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <Icon className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
    <div>
      <p className="text-emerald-200/70 text-sm">{label}</p>
      <p className="text-white font-medium">{value || 'No especificado'}</p>
    </div>
  </div>
);

const TechnicalInfoSection = ({ project }) => {
  const { technical_info, token_name } = project;

  if (!technical_info) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="glass-card rounded-xl tech-border overflow-hidden">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-emerald-100 text-left">Datos Técnicos para Mercado Secundario</h2>
                <p className="text-emerald-200/70 text-sm text-left">Información esencial del token para trading.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <DetailItem icon={Link} label="Dirección del Token" value={technical_info.token_address} />
              <DetailItem icon={Cpu} label="Norma del Token" value={technical_info.token_standard} />
              <DetailItem icon={Tag} label="Símbolo del Token" value={token_name} />
              <DetailItem icon={GitBranch} label="Mecanismo de Distribución" value={technical_info.distribution_mechanism} />
              <DetailItem icon={Globe} label="Whitelist / Restricción de Jurisdicción" value={technical_info.jurisdiction_restriction} />
              <DetailItem icon={Vote} label="Participación de Gobernanza" value={technical_info.governance_participation} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default TechnicalInfoSection;