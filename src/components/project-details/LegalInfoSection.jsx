import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gavel, FileText, Banknote, Building, ShieldCheck, Download, FileSignature } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <Icon className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
    <div>
      <p className="text-emerald-200/70 text-sm">{label}</p>
      <p className="text-white font-medium">{value || 'No especificado'}</p>
    </div>
  </div>
);

const LegalInfoSection = ({ project, ppaDocumentUrl, revenueContractUrl }) => {
  const { legal_info } = project;

  if (!legal_info) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="glass-card rounded-xl tech-border overflow-hidden">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Gavel className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-emerald-100 text-left">Información Legal y Regulatoria</h2>
                <p className="text-emerald-200/70 text-sm text-left">Cumplimiento y estructura legal del token.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <DetailItem icon={FileText} label="Memorando de Oferta (PPM)" value={legal_info.offering_memorandum} />
              <DetailItem icon={Banknote} label="Contrato de Ingresos" value={legal_info.revenue_contract} />
              <DetailItem icon={ShieldCheck} label="Opinión Legal" value={legal_info.legal_opinion} />
              <DetailItem icon={Building} label="Información de la Entidad SPV" value={legal_info.spv_info} />
              <DetailItem icon={Gavel} label="Base Legal de Emisión" value={legal_info.legal_basis} />
              {legal_info.ppa_details && <DetailItem icon={FileSignature} label="Contrato PPA" value={legal_info.ppa_details} />}
            </div>
            {(ppaDocumentUrl || revenueContractUrl) && (
              <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-4">
                {ppaDocumentUrl && (
                  <a href={ppaDocumentUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Descargar Contrato PPA
                    </Button>
                  </a>
                )}
                {revenueContractUrl && (
                  <a href={revenueContractUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Descargar Contrato de Ingresos
                    </Button>
                  </a>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default LegalInfoSection;