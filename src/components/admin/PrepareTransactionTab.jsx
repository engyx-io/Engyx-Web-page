import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, Send, FileJson, Link as LinkIcon, CheckCircle } from 'lucide-react';
    import { networkOptions } from '@/components/admin/asset-wizard/constants';
    import { ethers } from 'ethers';

    const ResultRow = ({ label, value, isLink = false }) => (
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-3 border-b border-slate-700/50 gap-2">
        <span className="text-slate-400 text-sm font-medium">{label}</span>
        {isLink && value ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cyan-400 hover:text-cyan-300 break-all hover:underline flex items-center gap-1">
            {value} <LinkIcon className="w-3 h-3 flex-shrink-0" />
          </a>
        ) : (
          <span className="font-mono text-sm text-slate-200 text-left sm:text-right break-all">{value || '-'}</span>
        )}
      </div>
    );

    const PrepareTransactionTab = ({ projects }) => {
      const [isLoading, setIsLoading] = useState(false);
      const [isSending, setIsSending] = useState(false);
      const [formData, setFormData] = useState({
        method: 'newTokenization',
        signerAddress: '0x058BAA4a1466Ac45D383c1813089f95e11658fD4',
        chainId: 'aa36a7',
        name: 'NombreToken',
        tokenizerEmail: 'exequiel@engyx.io',
        symbol: 'DEMO1',
      });
      const [transactionResult, setTransactionResult] = useState(null);
      const [sendResult, setSendResult] = useState(null);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handlePrepareSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setTransactionResult(null);
        setSendResult(null);

        try {
          const blockchainName = networkOptions.find(n => n.chainId === formData.chainId)?.value;
          if (!blockchainName) {
            throw new Error("No se pudo determinar el nombre de la blockchain a partir del Chain ID.");
          }

          const payload = {
            ...formData,
            blockchain: blockchainName,
          };
          
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            throw new Error("No estás autenticado. Por favor, inicia sesión.");
          }

          const { data, error } = await supabase.functions.invoke('prepare-api-transaction', {
            body: JSON.stringify(payload),
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
            }
          });

          if (error) {
              const errorBody = await error.context.json();
              console.error("Supabase function error details:", errorBody);
              throw new Error(errorBody.error || error.message);
          }
          
          if (data.error) {
            const errorMessage = data.details?.message || data.error || 'Error desconocido desde la API';
            throw new Error(errorMessage);
          }
          
          setTransactionResult(data);
          toast({
            title: 'Transacción Preparada',
            description: 'La transacción ha sido preparada exitosamente.',
          });
        } catch (error) {
          console.error('Error preparing transaction:', error);
          const errorMessage = error.message;
          toast({
            title: 'Error al preparar la transacción',
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };

      const handleSendTransaction = async () => {
        if (!transactionResult || !transactionResult.transactions) {
          toast({
            title: 'Error',
            description: 'No hay transacción preparada para enviar.',
            variant: 'destructive',
          });
          return;
        }

        setIsSending(true);
        setSendResult(null);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            for (const tx of transactionResult.transactions) {
                const txResponse = await signer.sendTransaction(tx);
                const receipt = await txResponse.wait();
                setSendResult({
                  tx_hash: receipt.hash,
                  explorer_url: `${networkOptions.find(n => n.chainId === formData.chainId)?.explorerUrl}/tx/${receipt.hash}`
                });
            }
          
            toast({
              title: 'Transacción Enviada',
              description: 'La transacción ha sido enviada y confirmada exitosamente.',
            });

        } catch (error) {
          console.error('Error sending transaction:', error);
          toast({
            title: 'Error al enviar la transacción',
            description: error.message,
            variant: 'destructive',
          });
        } finally {
          setIsSending(false);
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
                <Send />
                Preparar Transacción de Tokenización
              </CardTitle>
              <CardDescription className="text-slate-400">
                Prepara una nueva tokenización utilizando la API de Brickken.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePrepareSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="method" className="block text-sm font-medium text-slate-300 mb-1">Método</label>
                    <Input id="method" name="method" value={formData.method} onChange={handleInputChange} className="bg-slate-800 border-slate-700" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Chain ID</label>
                    <Select onValueChange={(value) => handleSelectChange('chainId', value)} value={formData.chainId}>
                      <SelectTrigger className="w-full bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Seleccione una red" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 text-white border-slate-700">
                        {networkOptions.map(network => (
                          <SelectItem key={network.chainId} value={network.chainId}>
                            {network.label} ({network.chainId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="signerAddress" className="block text-sm font-medium text-slate-300 mb-1">Dirección del Firmante</label>
                    <Input id="signerAddress" name="signerAddress" value={formData.signerAddress} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                  </div>
                  <div>
                    <label htmlFor="tokenizerEmail" className="block text-sm font-medium text-slate-300 mb-1">Email del Tokenizador</label>
                    <Input id="tokenizerEmail" name="tokenizerEmail" value={formData.tokenizerEmail} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nombre del Token</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                  </div>
                  <div>
                    <label htmlFor="symbol" className="block text-sm font-medium text-slate-300 mb-1">Símbolo del Token</label>
                    <Input id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange} className="bg-slate-800 border-slate-700" />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Preparar Transacción
                    </>
                  )}
                </Button>
              </form>

              {transactionResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-teal-300 flex items-center gap-2">
                        <FileJson />
                        Resultado de la Preparación
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {transactionResult.transactions && transactionResult.transactions.map((tx, index) => (
                        <div key={index} className="p-4 border border-slate-700 rounded-lg">
                          <h4 className="text-lg font-semibold text-slate-200 mb-2">Transacción #{index + 1}</h4>
                          <ResultRow label="Hasta" value={tx.to} />
                          <ResultRow label="Valor" value={tx.value} />
                          <ResultRow label="Datos" value={tx.data} />
                        </div>
                      ))}
                      <ResultRow label="Dirección del Contrato" value={transactionResult.contract_address} />
                      
                      <div className="pt-4">
                        <Button onClick={handleSendTransaction} disabled={isSending || sendResult} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                          {isSending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar Transacción
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {sendResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="bg-slate-800/70 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <CheckCircle />
                        Resultado del Envío
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ResultRow label="Hash de Transacción" value={sendResult.tx_hash} isLink={true} />
                      <ResultRow label="URL del Explorador" value={sendResult.explorer_url} isLink={true} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default PrepareTransactionTab;