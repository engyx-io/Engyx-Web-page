import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Coins as HandCoins, Search } from 'lucide-react';

const AllowanceTab = () => {
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allowance, setAllowance] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!tokenSymbol || !spenderAddress || !ownerAddress) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor, complete todos los campos para buscar la asignación.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAllowance(null);

    try {
      const { data, error } = await supabase.functions.invoke('get-allowance', {
        body: { tokenSymbol, spenderAddress, ownerAddress },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }
      
      setAllowance(data.allowance);
      toast({
        title: 'Asignación encontrada',
        description: `La asignación para ${tokenSymbol} es de ${data.allowance}.`,
      });
    } catch (error) {
      console.error('Error fetching allowance:', error);
      toast({
        title: 'Error al obtener la asignación',
        description: error.message || 'Ocurrió un error al comunicarse con el servicio.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-slate-900/50 border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <HandCoins />
            Consultar Asignación de Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tokenSymbol" className="block text-sm font-medium text-slate-300 mb-1">Símbolo del Token</label>
                <Input
                  id="tokenSymbol"
                  type="text"
                  placeholder="Ej: USDT"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="ownerAddress" className="block text-sm font-medium text-slate-300 mb-1">Dirección del Propietario</label>
                <Input
                  id="ownerAddress"
                  type="text"
                  placeholder="0x..."
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="spenderAddress" className="block text-sm font-medium text-slate-300 mb-1">Dirección del Gastador</label>
                <Input
                  id="spenderAddress"
                  type="text"
                  placeholder="0x..."
                  value={spenderAddress}
                  onChange={(e) => setSpenderAddress(e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar Asignación
                </>
              )}
            </Button>
          </form>

          {allowance !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card className="bg-slate-800/70 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-teal-300">Resultado de la Asignación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">La dirección del gastador tiene permiso para gastar:</p>
                  <p className="text-2xl font-bold text-white mt-2">{allowance} <span className="text-lg font-normal text-slate-400">{tokenSymbol}</span></p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AllowanceTab;