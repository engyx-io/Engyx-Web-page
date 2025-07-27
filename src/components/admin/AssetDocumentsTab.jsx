import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssetDocumentsTab({ assets }) {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState('');
  const [logotypeFile, setLogotypeFile] = useState(null);
  const [subscriptionFile, setSubscriptionFile] = useState(null);
  const [legalDocsFile, setLegalDocsFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (setter) => (event) => {
    setter(event.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssetSymbol) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un activo digital.",
        variant: "destructive",
      });
      return;
    }
    if (!logotypeFile && !subscriptionFile && !legalDocsFile) {
        toast({
          title: "Error",
          description: "Debes seleccionar al menos un archivo para actualizar.",
          variant: "destructive",
        });
        return;
    }

    setIsSubmitting(true);
    toast({
      title: "Actualizando Documentación",
      description: "Enviando archivos a Brickken...",
    });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Error de autenticación", description: "No se pudo obtener la sesión. Por favor, inicia sesión de nuevo.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
        const formData = new FormData();
        formData.append('tokenSymbol', selectedAssetSymbol);
        if (logotypeFile) formData.append('tokenLogotype', logotypeFile);
        if (subscriptionFile) formData.append('subscriptionAgreement', subscriptionFile);
        if (legalDocsFile) formData.append('legalDocs', legalDocsFile);

        const { data, error } = await supabase.functions.invoke('update-token-documentation', {
            body: formData,
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
        });

        if (error || (data && data.error)) {
            const errorMsg = error?.message || (data && data.error) || "Error desconocido al actualizar la documentación.";
            throw new Error(errorMsg);
        }

        toast({
            title: "¡Documentación Actualizada!",
            description: `Los documentos para ${selectedAssetSymbol} se han actualizado correctamente.`,
            className: "bg-emerald-600 border-emerald-500 text-white",
        });
        
        setSelectedAssetSymbol('');
        setLogotypeFile(null);
        setSubscriptionFile(null);
        setLegalDocsFile(null);
        e.target.reset();

    } catch (error) {
        console.error("Error updating documentation:", error);
        toast({ title: "Error al actualizar", description: error.message, variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-300">Actualizar Documentación del Activo</CardTitle>
        <CardDescription className="text-emerald-200/70">
          Sube nuevos documentos para un activo digital existente. Los archivos se enviarán a la API de Brickken.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="asset-select" className="text-emerald-200">Seleccionar Activo Digital</Label>
                <Select onValueChange={setSelectedAssetSymbol} value={selectedAssetSymbol}>
                    <SelectTrigger id="asset-select" className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400">
                        <SelectValue placeholder="Elige un símbolo de token..." />
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="logotypeFile" className="text-emerald-200">Logotipo del Token</Label>
                    <Input id="logotypeFile" name="logotypeFile" type="file" accept="image/*" onChange={handleFileChange(setLogotypeFile)} className="bg-black/50 border-emerald-500/30 file:text-emerald-300 file:border-0 file:bg-black/50 file:px-4 file:py-2 file:mr-4 file:rounded-l-md hover:file:bg-emerald-500/20 cursor-pointer" />
                    {logotypeFile && <p className="text-xs text-emerald-300 mt-1 truncate">{logotypeFile.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subscriptionFile" className="text-emerald-200">Acuerdo de Suscripción</Label>
                    <Input id="subscriptionFile" name="subscriptionFile" type="file" accept=".pdf" onChange={handleFileChange(setSubscriptionFile)} className="bg-black/50 border-emerald-500/30 file:text-emerald-300 file:border-0 file:bg-black/50 file:px-4 file:py-2 file:mr-4 file:rounded-l-md hover:file:bg-emerald-500/20 cursor-pointer" />
                    {subscriptionFile && <p className="text-xs text-emerald-300 mt-1 truncate">{subscriptionFile.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="legalDocsFile" className="text-emerald-200">Documentos Legales</Label>
                    <Input id="legalDocsFile" name="legalDocsFile" type="file" accept=".pdf" onChange={handleFileChange(setLegalDocsFile)} className="bg-black/50 border-emerald-500/30 file:text-emerald-300 file:border-0 file:bg-black/50 file:px-4 file:py-2 file:mr-4 file:rounded-l-md hover:file:bg-emerald-500/20 cursor-pointer" />
                    {legalDocsFile && <p className="text-xs text-emerald-300 mt-1 truncate">{legalDocsFile.name}</p>}
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Actualizando...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Actualizar Documentación
                        </>
                    )}
                </Button>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}