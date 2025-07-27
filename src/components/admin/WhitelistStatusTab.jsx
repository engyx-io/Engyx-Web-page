import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, UserCheck, Search, Wallet, FileBadge } from 'lucide-react';

    const WhitelistStatusTab = () => {
      const [tokenSymbol, setTokenSymbol] = useState('');
      const [investorEmail, setInvestorEmail] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [whitelistStatus, setWhitelistStatus] = useState(null);

      const handleSearch = async (e) => {
        e.preventDefault();
        if (!tokenSymbol || !investorEmail) {
          toast({
            title: 'Campos requeridos',
            description: 'Por favor, complete todos los campos para buscar.',
            variant: 'destructive',
          });
          return;
        }

        setIsLoading(true);
        setWhitelistStatus(null);

        try {
          const { data, error } = await supabase.functions.invoke('get-whitelist-balance', {
            body: { tokenSymbol, investorEmail },
          });

          if (error) throw error;

          if (data.error) {
            throw new Error(data.error);
          }
          
          setWhitelistStatus(data);
          toast({
            title: 'Búsqueda exitosa',
            description: `Se encontró el estado para ${investorEmail}.`,
          });
        } catch (error) {
          console.error('Error fetching whitelist status:', error);
          toast({
            title: 'Error al obtener el estado',
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
                <UserCheck />
                Consultar Balance y Estado de Lista Blanca
              </CardTitle>
              <CardDescription className="text-slate-400">
                Obtén el balance y el estado de la lista blanca de un usuario para un token específico.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tokenSymbolWhitelist" className="block text-sm font-medium text-slate-300 mb-1">Símbolo del Token</label>
                    <Input
                      id="tokenSymbolWhitelist"
                      type="text"
                      placeholder="Ej: ENGYX"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="investorEmailWhitelist" className="block text-sm font-medium text-slate-300 mb-1">Correo del Inversor</label>
                    <Input
                      id="investorEmailWhitelist"
                      type="email"
                      placeholder="inversor@ejemplo.com"
                      value={investorEmail}
                      onChange={(e) => setInvestorEmail(e.target.value)}
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
                      Buscar Estado
                    </>
                  )}
                </Button>
              </form>

              {whitelistStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-teal-300">Resultado de la Consulta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-md">
                            <div className="flex items-center gap-3">
                                <Wallet className="w-5 h-5 text-teal-400"/>
                                <span className="text-slate-300">Balance del Remitente</span>
                            </div>
                            <span className="text-lg font-bold text-white mono">{whitelistStatus.senderBalance}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-md">
                            <div className="flex items-center gap-3">
                                <FileBadge className="w-5 h-5 text-teal-400"/>
                                <span className="text-slate-300">Comisiones BKN</span>
                            </div>
                            <span className="text-lg font-bold text-white mono">{whitelistStatus.bknFees}</span>
                        </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default WhitelistStatusTab;