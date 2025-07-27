import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, List } from 'lucide-react';
import { Label } from "@/components/ui/label";

export default function StoInvestments({ onResults }) {
  const [searchInvestmentsUuid, setSearchInvestmentsUuid] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchInvestments = async (e) => {
    e.preventDefault();
    if (!searchInvestmentsUuid) {
      toast({ title: "Error", description: "Por favor, introduce un UUID de STO.", variant: "destructive" });
      return;
    }
    setIsFetching(true);
    onResults({ isLoading: true, searchType: 'investments', stos: null, singleSto: null, stoBalance: null, stoInvestments: null });

    try {
      const { data, error } = await supabase.functions.invoke('get-investments-by-sto-id', { body: { stoId: searchInvestmentsUuid } });
      if (error || (data && data.error)) throw new Error(error?.message || data?.error?.message || "Error desconocido.");
      onResults({ stoInvestments: data.data });
      toast({ title: "Búsqueda completada", description: `Se encontraron ${data.data.length} inversiones.` });
    } catch (error) {
      toast({ title: "Error en la búsqueda", description: error.message, variant: "destructive" });
    } finally {
      setIsFetching(false);
      onResults({ isLoading: false });
    }
  };

  return (
    <form onSubmit={handleFetchInvestments} className="flex flex-col md:flex-row items-end gap-4 my-4">
      <div className="flex-grow w-full md:w-auto">
        <Label htmlFor="investments-uuid-input" className="text-emerald-200">UUID de la STO</Label>
        <Input
          id="investments-uuid-input"
          type="text"
          placeholder="Introduce el UUID para ver sus inversiones"
          value={searchInvestmentsUuid}
          onChange={(e) => setSearchInvestmentsUuid(e.target.value)}
          className="bg-black/50 border-emerald-500/30 focus:border-emerald-400"
        />
      </div>
      <Button type="submit" className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white w-full md:w-auto" disabled={isFetching}>
        {isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <List className="mr-2 h-4 w-4" />}
        {isFetching ? "Buscando..." : "Ver Inversiones"}
      </Button>
    </form>
  );
}