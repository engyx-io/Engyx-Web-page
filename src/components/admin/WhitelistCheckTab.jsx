import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, ListChecks, Search, ShieldCheck, ShieldX } from 'lucide-react';

    const WhitelistCheckTab = () => {
      const [tokenSymbol, setTokenSymbol] = useState('');
      const [investorAddress, setInvestorAddress] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [isWhitelisted, setIsWhitelisted] = useState(null);

      const handleSearch = async (e) => {
        e.preventDefault();
        if (!tokenSymbol || !investorAddress) {
          toast({
            title: 'Campos requeridos',
            description: 'Por favor, complete todos los campos para buscar.',
            variant: 'destructive',
          });
          return;
        }

        setIsLoading(true);
        setIsWhitelisted(null);

        try {
          const { data, error } = await supabase.functions.invoke('check-whitelist-status', {
            body: { tokenSymbol, investorAddress },
          });

          if (error) throw error;

          if (data.error) {
            throw new Error(data.error);
          }
          
          setIsWhitelisted(data.isWhitelisted);
          toast({
            title: 'Búsqueda exitosa',
            description: `Se verificó el estado de la lista blanca para la dirección.`,
          });
        } catch (error) {
          console.error('Error fetching whitelist status:', error);
          toast({
            title: 'Error al verificar el estado',
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
                <ListChecks />
                Verificar Estado de Lista Blanca por Wallet
              </CardTitle>
              <CardDescription className="text-slate-400">
                Verifica si la dirección de un inversor está en la lista blanca para un token específico.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tokenSymbolCheck" className="block text-sm font-medium text-slate-300 mb-1">Símbolo del Token</label>
                    <Input
                      id="tokenSymbolCheck"
                      type="text"
                      placeholder="Ej: ENGYX"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="investorAddressCheck" className="block text-sm font-medium text-slate-300 mb-1">Dirección del Inversor</label>
                    <Input
                      id="investorAddressCheck"
                      type="text"
                      placeholder="0x..."
                      value={investorAddress}
                      onChange={(e) => setInvestorAddress(e.target.value)}
                      className="bg-slate-800 border-slate-700 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verificar Estado
                    </>
                  )}
                </Button>
              </form>

              {isWhitelisted !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-teal-300">Resultado de la Verificación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isWhitelisted ? (
                        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <ShieldCheck className="w-8 h-8 text-green-400" />
                          <div>
                            <p className="text-lg font-bold text-green-300">En la Lista Blanca</p>
                            <p className="text-sm text-green-400/80">Esta dirección está autorizada.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <ShieldX className="w-8 h-8 text-red-400" />
                          <div>
                            <p className="text-lg font-bold text-red-300">No está en la Lista Blanca</p>
                            <p className="text-sm text-red-400/80">Esta dirección no está autorizada.</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default WhitelistCheckTab;