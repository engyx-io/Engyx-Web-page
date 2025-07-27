import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Search, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'SUCCESS':
      return <CheckCircle className="w-16 h-16 text-green-400" />;
    case 'FAILED':
      return <XCircle className="w-16 h-16 text-red-400" />;
    case 'PENDING':
      return <Clock className="w-16 h-16 text-yellow-400 animate-pulse" />;
    default:
      return <AlertTriangle className="w-16 h-16 text-gray-400" />;
  }
};

export default function TransactionStatusTab() {
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!transactionHash) {
      toast({
        title: "Error",
        description: "Por favor, introduce un hash de transacción.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTransactionStatus(null);
    toast({
      title: "Verificando transacción...",
      description: `Consultando estado para el hash ${transactionHash.substring(0, 10)}...`,
    });
    
    try {
        const { data, error } = await supabase.functions.invoke('check-transaction-status', {
            body: { hash: transactionHash },
        });

        if (error || (data && data.error)) {
            const errorMsg = error?.message || (data && data.error.message) || "Error desconocido al verificar la transacción.";
            throw new Error(errorMsg);
        }

        setTransactionStatus(data.data);
        toast({
            title: "Verificación completada",
            description: `El estado de la transacción es ${data.data.status}.`,
        });

    } catch (error) {
        console.error("Error checking transaction status:", error);
        toast({ title: "Error en la verificación", description: error.message, variant: "destructive" });
        setTransactionStatus(null);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-300">Verificar Estado de Transacción</CardTitle>
        <CardDescription className="text-emerald-200/70">
          Introduce el hash de una transacción para consultar su estado en la blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-4 mb-6">
            <div className="flex-grow w-full">
                <Label htmlFor="transaction-hash" className="text-emerald-200">Hash de la Transacción</Label>
                <Input
                    id="transaction-hash"
                    type="text"
                    placeholder="0x..."
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    className="bg-black/50 border-emerald-500/30 focus:border-emerald-400 font-mono"
                />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white w-full md:w-auto" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                {isLoading ? "Verificando..." : "Verificar Estado"}
            </Button>
        </form>
        
        <div className="mt-8">
            {transactionStatus ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="bg-black/30 border-emerald-500/20 text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <StatusIcon status={transactionStatus.status} />
                            </div>
                            <CardTitle className="text-3xl font-bold text-emerald-400">{transactionStatus.status}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-emerald-200/80">
                                {transactionStatus.message || `La transacción ha sido procesada.`}
                            </p>
                            {transactionStatus.receipt && (
                                <div className="mt-4 text-left text-xs font-mono bg-black/50 p-4 rounded-lg overflow-x-auto">
                                    <p><span className="text-emerald-300">Block Number:</span> {transactionStatus.receipt.blockNumber}</p>
                                    <p><span className="text-emerald-300">Gas Used:</span> {transactionStatus.receipt.gasUsed.toString()}</p>
                                    <p><span className="text-emerald-300">From:</span> {transactionStatus.receipt.from}</p>
                                    <p><span className="text-emerald-300">To:</span> {transactionStatus.receipt.to}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <div className="text-center p-8 bg-black/30 rounded-lg mt-8">
                    <p className="text-emerald-200/70">
                        {isLoading ? "Consultando la blockchain..." : "Introduce un hash para verificar el estado de una transacción."}
                    </p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}