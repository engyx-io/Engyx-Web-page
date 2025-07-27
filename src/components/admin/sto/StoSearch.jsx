import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Search, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function StoSearch({ assets, onResults }) {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState('');
  const [stoUuid, setStoUuid] = useState('');
  const [isLoading, setIsLoading] = useState({ bySymbol: false, byUuid: false, byStatus: false });

  const setLoading = (type, value) => setIsLoading(prev => ({ ...prev, [type]: value }));

  const handleSearchBySymbol = async (e) => {
    e.preventDefault();
    if (!selectedAssetSymbol) {
      toast({ title: "Error", description: "Por favor, selecciona un activo digital.", variant: "destructive" });
      return;
    }
    setLoading('bySymbol', true);
    onResults({ isLoading: true, searchType: 'symbol', stos: null, singleSto: null, stoBalance: null, stoInvestments: null });
    
    try {
      const { data, error } = await supabase.functions.invoke('get-stos-by-symbol', { body: { tokenSymbol: selectedAssetSymbol } });
      if (error || (data && data.error)) throw new Error(error?.message || data?.error?.message || "Error desconocido.");
      onResults({ stos: data.data });
      toast({ title: "Búsqueda completada", description: `Se encontraron ${data.data.length} STOs.` });
    } catch (error) {
      toast({ title: "Error en la búsqueda", description: error.message, variant: "destructive" });
      onResults({ stos: [] });
    } finally {
      setLoading('bySymbol', false);
      onResults({ isLoading: false });
    }
  };

  const handleSearchByUuid = async (e) => {
    e.preventDefault();
    if (!stoUuid) {
      toast({ title: "Error", description: "Por favor, introduce un UUID de STO.", variant: "destructive" });
      return;
    }
    setLoading('byUuid', true);
    onResults({ isLoading: true, searchType: 'uuid', stos: null, singleSto: null, stoBalance: null, stoInvestments: null });

    try {
      const { data, error } = await supabase.functions.invoke('get-sto-by-uuid', { body: { uuid: stoUuid } });
      if (error || (data && data.error)) throw new Error(error?.message || data?.error?.message || "Error desconocido.");
      onResults({ singleSto: data.data });
      toast({ title: "Búsqueda completada", description: `STO encontrada.` });
    } catch (error) {
      toast({ title: "Error en la búsqueda", description: error.message, variant: "destructive" });
    } finally {
      setLoading('byUuid', false);
      onResults({ isLoading: false });
    }
  };

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!stoUuid) {
      toast({ title: "Error", description: "Por favor, introduce un UUID de STO.", variant: "destructive" });
      return;
    }
    setLoading('byStatus', true);
    onResults({ isLoading: true, searchType: 'status', stos: null, singleSto: null, stoBalance: null, stoInvestments: null });

    try {
      const { data, error } = await supabase.functions.invoke('get-sto-balance-and-status', { body: { uuid: stoUuid } });
      if (error || (data && data.error)) throw new Error(error?.message || data?.error?.message || "Error desconocido.");
      onResults({ stoBalance: data.data });
      toast({ title: "Consulta completada", description: `Estado de la STO obtenido.` });
    } catch (error) {
      toast({ title: "Error en la consulta", description: error.message, variant: "destructive" });
    } finally {
      setLoading('byStatus', false);
      onResults({ isLoading: false });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchBySymbol} className="flex flex-col md:flex-row items-end gap-4 my-4">
        <div className="flex-grow w-full md:w-auto">
          <Label htmlFor="asset-select-sto" className="text-emerald-200">Buscar por Símbolo de Activo</Label>
          <Select onValueChange={setSelectedAssetSymbol} value={selectedAssetSymbol}>
            <SelectTrigger id="asset-select-sto" className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400">
              <SelectValue placeholder="Elige un símbolo de token..." />
            </SelectTrigger>
            <SelectContent>
              {assets?.length > 0 ? assets.map(asset => (
                <SelectItem key={asset.id} value={asset.asset_symbol}>{asset.asset_name} ({asset.asset_symbol})</SelectItem>
              )) : <div className="p-4 text-center text-sm">No hay activos digitales creados.</div>}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white w-full md:w-auto" disabled={isLoading.bySymbol}>
          {isLoading.bySymbol ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          {isLoading.bySymbol ? "Buscando..." : "Buscar STOs"}
        </Button>
      </form>
      
      <div className="my-8 flex items-center">
        <Separator className="flex-1 bg-emerald-500/20" />
        <span className="px-4 text-sm text-emerald-300">O</span>
        <Separator className="flex-1 bg-emerald-500/20" />
      </div>

      <form onSubmit={handleSearchByUuid} className="flex flex-col md:flex-row items-end gap-4">
        <div className="flex-grow w-full md:w-auto">
          <Label htmlFor="sto-uuid-input" className="text-emerald-200">Buscar por UUID de STO</Label>
          <Input
            id="sto-uuid-input"
            type="text"
            placeholder="Introduce el UUID de la STO"
            value={stoUuid}
            onChange={(e) => setStoUuid(e.target.value)}
            className="bg-black/50 border-emerald-500/30 focus:border-emerald-400"
          />
        </div>
        <div className="flex items-end gap-2 w-full md:w-auto">
          <Button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white flex-1" disabled={isLoading.byUuid}>
            {isLoading.byUuid ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            {isLoading.byUuid ? "Buscando..." : "Detalles"}
          </Button>
          <Button onClick={handleCheckStatus} variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 flex-1" disabled={isLoading.byStatus}>
            {isLoading.byStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Info className="mr-2 h-4 w-4" />}
            {isLoading.byStatus ? "Consultando..." : "Estado y Balance"}
          </Button>
        </div>
      </form>
    </div>
  );
}