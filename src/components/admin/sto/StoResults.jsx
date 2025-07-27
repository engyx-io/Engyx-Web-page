import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Info, User, Hash } from 'lucide-react';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
    <span className="text-emerald-200/80 text-sm">{label}</span>
    <span className="font-mono text-sm text-emerald-300 text-right">{value || '-'}</span>
  </div>
);

export default function StoResults({ stos, singleSto, stoBalance, stoInvestments, isLoading, searchType }) {
  if (isLoading) {
    return (
      <div className="text-center p-8 bg-black/30 rounded-lg mt-8">
        <p className="text-emerald-200/70">Cargando resultados...</p>
      </div>
    );
  }

  const renderStos = () => (
    <div>
      <h3 className="text-xl font-bold text-emerald-300 mb-4">Resultados de la Búsqueda</h3>
      <Accordion type="single" collapsible className="w-full">
        {stos.map((sto, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="hover:bg-emerald-500/5 px-4 rounded-t-lg">
              <div className="flex items-center gap-4"><Briefcase className="w-5 h-5 text-emerald-400" /><span>{sto.offeringName}</span></div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-emerald-500/5 rounded-b-lg">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                <InfoRow label="Moneda Aceptada" value={sto.acceptedCoin} />
                <InfoRow label="Tokens en Oferta" value={parseFloat(sto.tokenAmount).toLocaleString()} />
                <InfoRow label="Mín. Inversión (USD)" value={parseFloat(sto.minInvestment).toLocaleString()} />
                <InfoRow label="Máx. Inversión (USD)" value={parseFloat(sto.maxInvestment).toLocaleString()} />
                <InfoRow label="Mín. Recaudación (USD)" value={parseFloat(sto.minRaiseUSD).toLocaleString()} />
                <InfoRow label="Máx. Recaudación (USD)" value={parseFloat(sto.maxRaiseUSD).toLocaleString()} />
                <InfoRow label="Fecha de Inicio" value={new Date(sto.startDate).toLocaleDateString()} />
                <InfoRow label="Fecha de Fin" value={new Date(sto.endDate).toLocaleDateString()} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  const renderSingleSto = () => (
    <div>
      <h3 className="text-xl font-bold text-emerald-300 mb-4">Detalles de la STO</h3>
      <Card className="bg-black/30 border-emerald-500/20">
        <CardHeader><CardTitle className="flex items-center gap-3 text-emerald-400"><Briefcase /> {singleSto.offeringName}</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
            <InfoRow label="Moneda Aceptada" value={singleSto.acceptedCoin} />
            <InfoRow label="Tokens en Oferta" value={parseFloat(singleSto.tokenAmount).toLocaleString()} />
            <InfoRow label="Mín. Inversión (USD)" value={parseFloat(singleSto.minInvestment).toLocaleString()} />
            <InfoRow label="Máx. Inversión (USD)" value={parseFloat(singleSto.maxInvestment).toLocaleString()} />
            <InfoRow label="Mín. Recaudación (USD)" value={parseFloat(singleSto.minRaiseUSD).toLocaleString()} />
            <InfoRow label="Máx. Recaudación (USD)" value={parseFloat(singleSto.maxRaiseUSD).toLocaleString()} />
            <InfoRow label="Fecha de Inicio" value={new Date(singleSto.startDate).toLocaleDateString()} />
            <InfoRow label="Fecha de Fin" value={new Date(singleSto.endDate).toLocaleDateString()} />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStoBalance = () => (
    <div>
      <h3 className="text-xl font-bold text-emerald-300 mb-4">Balance y Estado de la STO</h3>
      <Card className="bg-black/30 border-emerald-500/20">
        <CardHeader><CardTitle className="flex items-center gap-3 text-emerald-400"><Info /> Estado Actual</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
            <InfoRow label="Fondos Recaudados (USD)" value={stoBalance.balance?.raisedFundsInUSD || '0'} />
            <InfoRow label="Número de Inversores" value={stoBalance.balance?.investorsCount || '0'} />
            <InfoRow label="Tokens Vendidos" value={stoBalance.balance?.tokensSelled || '0'} />
            <InfoRow label="Estado" value={stoBalance.status} />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStoInvestments = () => (
    <div>
      <h3 className="text-xl font-bold text-emerald-300 mb-4">Inversiones de la STO</h3>
      <Card className="bg-black/30 border-emerald-500/20">
        <CardContent className="pt-6">
          {stoInvestments.length > 0 ? (
            <Table>
              <TableHeader><TableRow><TableHead className="text-emerald-300"><User className="inline-block w-4 h-4 mr-1" />Inversor</TableHead><TableHead className="text-emerald-300">Monto</TableHead><TableHead className="text-emerald-300">Moneda</TableHead><TableHead className="text-emerald-300">Estado</TableHead><TableHead className="text-emerald-300"><Hash className="inline-block w-4 h-4 mr-1" />Tx Hash</TableHead></TableRow></TableHeader>
              <TableBody>
                {stoInvestments.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.investor.email}</TableCell>
                    <TableCell>{parseFloat(inv.amount).toLocaleString()}</TableCell>
                    <TableCell>{inv.currency}</TableCell>
                    <TableCell><span className={`px-2 py-1 text-xs rounded-full ${inv.status === 'SUCCESS' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{inv.status}</span></TableCell>
                    <TableCell className="font-mono text-xs truncate" title={inv.transactionHash}>{inv.transactionHash ? `${inv.transactionHash.substring(0, 6)}...${inv.transactionHash.substring(inv.transactionHash.length - 4)}` : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : <p className="text-center py-4 text-emerald-200/70">No se encontraron inversiones para esta STO.</p>}
        </CardContent>
      </Card>
    </div>
  );

  if (searchType === 'symbol' && stos?.length > 0) return renderStos();
  if (searchType === 'uuid' && singleSto) return renderSingleSto();
  if (searchType === 'status' && stoBalance) return renderStoBalance();
  if (searchType === 'investments' && stoInvestments) return renderStoInvestments();

  if ((searchType === 'symbol' && stos?.length === 0) || (searchType && !isLoading)) {
    return (
      <div className="text-center p-8 bg-black/30 rounded-lg mt-8">
        <p className="text-emerald-200/70">No se encontraron resultados para tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="text-center p-8 bg-black/30 rounded-lg mt-8">
      <p className="text-emerald-200/70">Realiza una búsqueda para ver los resultados.</p>
    </div>
  );
}