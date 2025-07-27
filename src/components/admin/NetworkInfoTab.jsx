import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, Network, Search, Link as LinkIcon } from 'lucide-react';

    const InfoRow = ({ label, value, isLink = false }) => (
      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
          <span className="text-slate-400 text-sm">{label}</span>
          {isLink && value ? (
              <a href={value} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cyan-400 hover:text-cyan-300 truncate hover:underline flex items-center gap-1">
                  {value} <LinkIcon className="w-3 h-3"/>
              </a>
          ) : (
              <span className="font-mono text-sm text-slate-200 text-right truncate">{value || '-'}</span>
          )}
      </div>
    );

    const NetworkInfoTab = () => {
      const [chainId, setChainId] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [networkInfo, setNetworkInfo] = useState(null);

      const handleSearch = async (e) => {
        e.preventDefault();
        if (!chainId) {
          toast({
            title: 'Campo requerido',
            description: 'Por favor, ingrese un Chain ID.',
            variant: 'destructive',
          });
          return;
        }

        setIsLoading(true);
        setNetworkInfo(null);

        try {
          const { data, error } = await supabase.functions.invoke('get-network-info', {
            body: { chainId },
          });

          if (error) throw error;

          if (data.error) {
            throw new Error(data.error);
          }
          
          setNetworkInfo(data);
          toast({
            title: 'Búsqueda exitosa',
            description: `Se encontró información para el Chain ID ${chainId}.`,
          });
        } catch (error) {
          console.error('Error fetching network info:', error);
          toast({
            title: 'Error al obtener la información',
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
                <Network />
                Consultar Información de la Red
              </CardTitle>
              <CardDescription className="text-slate-400">
                Recupera información de red para un ID de cadena específico.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full sm:w-auto sm:flex-grow">
                    <label htmlFor="chainId" className="block text-sm font-medium text-slate-300 mb-1">Chain ID</label>
                    <Input
                    id="chainId"
                    type="text"
                    placeholder="Ej: 11155111"
                    value={chainId}
                    onChange={(e) => setChainId(e.target.value)}
                    className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Buscar
                    </>
                  )}
                </Button>
              </form>

              {networkInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-teal-300">{networkInfo.name}</CardTitle>
                      <CardDescription className="text-slate-400">Detalles de la red para el Chain ID: {networkInfo.chainId}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <InfoRow label="Explorador de Bloques" value={networkInfo.blockExplorer} isLink={true} />
                        <InfoRow label="Símbolo de Moneda" value={networkInfo.currencySymbol} />
                        <InfoRow label="Nombre de Moneda" value={networkInfo.currencyName} />
                        <InfoRow label="Decimales de Moneda" value={networkInfo.currencyDecimals} />
                        <InfoRow label="Dirección del Contrato de Mercado" value={networkInfo.marketplaceContractAddress} />
                        <InfoRow label="URL RPC" value={networkInfo.rpcUrl} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default NetworkInfoTab;