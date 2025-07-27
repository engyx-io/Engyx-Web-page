import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, PackageSearch, Search, Link as LinkIcon } from 'lucide-react';

    const InfoRow = ({ label, value, isLink = false }) => (
      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
          <span className="text-slate-400 text-sm">{label}</span>
          {isLink && value ? (
              <a href={value} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cyan-400 hover:text-cyan-300 truncate hover:underline flex items-center gap-1">
                  {value} <LinkIcon className="w-3 h-3"/>
              </a>
          ) : (
              <span className="font-mono text-sm text-slate-200 text-right truncate">{String(value) || '-'}</span>
          )}
      </div>
    );

    const TokenInfoTab = () => {
      const [tokenSymbol, setTokenSymbol] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [tokenInfo, setTokenInfo] = useState(null);

      const handleSearch = async (e) => {
        e.preventDefault();
        if (!tokenSymbol) {
          toast({
            title: 'Campo requerido',
            description: 'Por favor, ingrese un símbolo de token.',
            variant: 'destructive',
          });
          return;
        }

        setIsLoading(true);
        setTokenInfo(null);

        try {
          const { data, error } = await supabase.functions.invoke('get-token-info', {
            body: { tokenSymbol },
          });

          if (error) throw error;

          if (data.error) {
            throw new Error(data.error);
          }
          
          setTokenInfo(data);
          toast({
            title: 'Búsqueda exitosa',
            description: `Se encontró información para el token ${tokenSymbol}.`,
          });
        } catch (error) {
          console.error('Error fetching token info:', error);
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
                <PackageSearch />
                Consultar Información del Token
              </CardTitle>
              <CardDescription className="text-slate-400">
                Recupera información detallada sobre un token específico.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full sm:w-auto sm:flex-grow">
                    <label htmlFor="tokenSymbol" className="block text-sm font-medium text-slate-300 mb-1">Símbolo del Token</label>
                    <Input
                    id="tokenSymbol"
                    type="text"
                    placeholder="Ej: ENGYX"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
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

              {tokenInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-teal-300">{tokenInfo.name} ({tokenInfo.symbol})</CardTitle>
                      <CardDescription className="text-slate-400">Detalles del token</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <InfoRow label="Suministro Total" value={tokenInfo.totalSupply} />
                        <InfoRow label="Decimales" value={tokenInfo.decimals} />
                        <InfoRow label="Dirección del Contrato" value={tokenInfo.contractAddress} />
                        <InfoRow label="Propietario" value={tokenInfo.owner} />
                        <InfoRow label="ID de Cadena" value={tokenInfo.chainId} />
                        <InfoRow label="¿Es Pausable?" value={tokenInfo.isPausable ? 'Sí' : 'No'} />
                        <InfoRow label="¿Es Quemable?" value={tokenInfo.isBurnable ? 'Sí' : 'No'} />
                        <InfoRow label="¿Tiene Lista Negra?" value={tokenInfo.isBlacklistable ? 'Sí' : 'No'} />
                        <InfoRow label="¿Tiene Roles?" value={tokenInfo.hasRoles ? 'Sí' : 'No'} />
                        <InfoRow label="¿Es Recuperable?" value={tokenInfo.isRecoverable ? 'Sí' : 'No'} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default TokenInfoTab;