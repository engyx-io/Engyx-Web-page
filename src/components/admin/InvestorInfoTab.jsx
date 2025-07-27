import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Search, User, Briefcase, Link as LinkIcon, CheckCircle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const InfoRow = ({ label, value, isLink = false }) => (
    <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
        <span className="text-emerald-200/80 text-sm">{label}</span>
        {isLink && value ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cyan-400 hover:text-cyan-300 truncate hover:underline">
                Verificar <LinkIcon className="inline w-3 h-3 ml-1"/>
            </a>
        ) : (
            <span className="font-mono text-sm text-emerald-300 text-right truncate">{value || '-'}</span>
        )}
    </div>
);

export default function InvestorInfoTab({ assets }) {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investorInfo, setInvestorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedAssetSymbol || !investorEmail) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un activo y proporciona un correo electrónico.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setInvestorInfo(null);
    toast({
      title: "Buscando inversor...",
      description: `Consultando información para ${investorEmail}.`,
    });
    
    try {
        const { data, error } = await supabase.functions.invoke('get-investor-info', {
            body: { email: investorEmail, tokenSymbol: selectedAssetSymbol },
        });

        if (error || (data && data.error)) {
            const errorMsg = error?.message || (data && data.error.message) || "Error desconocido al buscar al inversor.";
            throw new Error(errorMsg);
        }

        setInvestorInfo(data.data);
        toast({
            title: "Búsqueda completada",
            description: `Información de ${investorEmail} encontrada.`,
        });

    } catch (error) {
        console.error("Error searching investor:", error);
        toast({ title: "Error en la búsqueda", description: error.message, variant: "destructive" });
        setInvestorInfo(null);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-300">Consultar Información de Inversores</CardTitle>
        <CardDescription className="text-emerald-200/70">
          Busca los detalles de un inversor por su correo electrónico y el símbolo del token.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-4 mb-6">
            <div className="flex-grow w-full md:w-auto">
                <Label htmlFor="investor-email" className="text-emerald-200">Correo Electrónico del Inversor</Label>
                <Input
                    id="investor-email"
                    type="email"
                    placeholder="ejemplo@inversor.com"
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                    className="bg-black/50 border-emerald-500/30 focus:border-emerald-400"
                />
            </div>
            <div className="flex-grow w-full md:w-auto">
                <Label htmlFor="asset-select-investor" className="text-emerald-200">Símbolo del Activo</Label>
                <Select onValueChange={setSelectedAssetSymbol} value={selectedAssetSymbol}>
                    <SelectTrigger id="asset-select-investor" className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400">
                        <SelectValue placeholder="Elige un símbolo..." />
                    </SelectTrigger>
                    <SelectContent>
                        {assets && assets.length > 0 ? (
                            assets.map(asset => (
                                <SelectItem key={asset.id} value={asset.asset_symbol}>
                                    {asset.asset_name} ({asset.asset_symbol})
                                </SelectItem>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm">No hay activos digitales creados.</div>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white w-full md:w-auto" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                {isLoading ? "Buscando..." : "Buscar Inversor"}
            </Button>
        </form>
        
        <Separator className="my-8 bg-emerald-500/20" />

        <div className="mt-8">
            {investorInfo ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="bg-black/30 border-emerald-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-emerald-400">
                                <User /> {investorInfo.personalData.name || 'Inversor'} {investorInfo.personalData.surname}
                            </CardTitle>
                            <CardDescription className="text-emerald-200/70">{investorInfo.personalData.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                                <InfoRow label="Verificación KYC" value={investorInfo.personalData.kycLink} isLink={true} />
                                <InfoRow label="Dirección de Billetera" value={investorInfo.walletAddress} />
                                <InfoRow label="Tipo de Inversor" value={investorInfo.type} />
                            </div>
                            
                            <h4 className="text-lg font-bold text-emerald-300 mb-4 mt-6">Historial de Inversiones</h4>
                            {investorInfo.investments && investorInfo.investments.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full">
                                    {investorInfo.investments.map((investment, index) => (
                                        <AccordionItem value={`investment-${index}`} key={index}>
                                            <AccordionTrigger className="hover:bg-emerald-500/5 px-4 rounded-t-lg">
                                                <div className="flex items-center gap-4">
                                                    <Briefcase className="w-5 h-5 text-emerald-400" />
                                                    <span>{investment.offering.offeringName}</span>
                                                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${investment.status === 'SUCCESS' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {investment.status}
                                                    </span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="p-4 bg-emerald-500/5 rounded-b-lg">
                                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                                                    <InfoRow label="Monto" value={`${parseFloat(investment.amount).toLocaleString()} ${investment.currency}`} />
                                                    <InfoRow label="Símbolo del Token" value={investment.offering.tokenSymbol} />
                                                    <InfoRow label="Fecha" value={new Date(investment.createdAt).toLocaleDateString()} />
                                                    <InfoRow label="Hash de Transacción" value={investment.transactionHash} />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <p className="text-center p-4 text-emerald-200/70">No se encontraron inversiones para este token.</p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <div className="text-center p-8 bg-black/30 rounded-lg mt-8">
                    <p className="text-emerald-200/70">
                        {isLoading ? "Cargando información..." : "Realiza una búsqueda para ver los detalles del inversor."}
                    </p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}