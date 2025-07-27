import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import StoSearch from '@/components/admin/sto/StoSearch';
import StoInvestments from '@/components/admin/sto/StoInvestments';
import StoResults from '@/components/admin/sto/StoResults';

export default function StoTab({ assets }) {
  const [results, setResults] = useState({
    stos: null,
    singleSto: null,
    stoBalance: null,
    stoInvestments: null,
    isLoading: false,
    searchType: null,
  });

  const handleResults = (data) => {
    setResults(prev => ({ ...prev, ...data }));
  };

  return (
    <Card className="glass-card text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-300">Consultar Ofertas de Tokens de Seguridad (STO)</CardTitle>
        <CardDescription className="text-emerald-200/70">
          Busca STOs por símbolo, UUID, o consulta su estado, balance e inversiones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="search" className="w-full">
          <AccordionItem value="search">
            <AccordionTrigger className="text-lg text-emerald-300 hover:text-emerald-200">Búsqueda General de STOs</AccordionTrigger>
            <AccordionContent>
              <StoSearch assets={assets} onResults={handleResults} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="investments">
            <AccordionTrigger className="text-lg text-emerald-300 hover:text-emerald-200">Búsqueda de Inversiones por STO</AccordionTrigger>
            <AccordionContent>
              <StoInvestments onResults={handleResults} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8">
          <StoResults {...results} />
        </div>
      </CardContent>
    </Card>
  );
}