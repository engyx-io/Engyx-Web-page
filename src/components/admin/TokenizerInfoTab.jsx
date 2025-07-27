import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, UserCog, Search } from 'lucide-react';

    const InfoRow = ({ label, value }) => (
      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
          <span className="text-slate-400 text-sm">{label}</span>
          <span className="font-mono text-sm text-slate-200 text-right truncate">{value || '-'}</span>
      </div>
    );

    const TokenizerInfoTab = () => {
      const [tokenSymbol, setTokenSymbol] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [tokenizerInfo, setTokenizerInfo] = useState(null);

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
        setTokenizerInfo(null);

        try {
          const { data, error } = await supabase.functions.invoke('get-tokenizer-info', {
            body: { tokenSymbol },
          });

          if (error) throw error;

          if (data.error) {
            throw new Error(data.error);
          }
          
          setTokenizerInfo(data);
          toast({
            title: 'Búsqueda exitosa',
            description: `Se encontró información del tokenizador para el token ${tokenSymbol}.`,
          });
        } catch (error) {
          console.error('Error fetching tokenizer info:', error);
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
                <UserCog />
                Consultar Información del Tokenizador
              </CardTitle>
              <CardDescription className="text-slate-400">
                Recupera información sobre el tokenizador de un token específico.
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

              {tokenizerInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-teal-300">Información del Tokenizador</CardTitle>
                      <CardDescription className="text-slate-400">Detalles para el token {tokenSymbol}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <InfoRow label="Nombre" value={tokenizerInfo.name} />
                        <InfoRow label="Apellido" value={tokenizerInfo.surname} />
                        <InfoRow label="Compañía" value={tokenizerInfo.companyName} />
                        <InfoRow label="Email" value={tokenizerInfo.email} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default TokenizerInfoTab;