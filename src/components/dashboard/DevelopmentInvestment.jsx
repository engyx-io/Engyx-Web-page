import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import WalletConnection from './WalletConnection';

export default function InvestmentModal({ project, onClose, onSuccess }) {
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress } = useWallet();
  const { user } = useAuth();

  const handleCoinbasePayment = async () => {
    setIsProcessing(true);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('create-coinbase-charge', {
        body: JSON.stringify({
          amount: investmentAmount,
          currency: 'USD',
          metadata: {
            project_id: project.id,
            project_name: project.name,
            user_id: user.id,
            wallet_address: walletAddress || 'not_connected',
            investment_amount: investmentAmount,
          }
        }),
      });

      if (functionError) throw functionError;

      if (data && data.hosted_url) {
        const { error: insertError } = await supabase
          .from('user_investments')
          .insert({
            user_id: user.id,
            project_id: project.id,
            amount_usd: investmentAmount,
            tokens_purchased: calculateTokens()
          });

        if (insertError) {
          throw new Error(`Error al guardar la inversión: ${insertError.message}`);
        }
        
        toast({
          title: "Redirigiendo a Coinbase...",
          description: "Completa el pago en la nueva pestaña.",
        });
        window.open(data.hosted_url, '_blank', 'noopener,noreferrer');
        onSuccess(); // Refresh dashboard data
        onClose();
      } else {
        throw new Error('No se pudo obtener la URL de pago de Coinbase.');
      }
    } catch (error) {
      console.error('Error creating Coinbase charge for investment:', error);
      
      let title = "Error al procesar el pago";
      let description = "Hubo un problema al crear el cobro. Por favor, inténtalo de nuevo.";

      if (error.context?.error?.type === 'authentication_error') {
        description = "La API Key de Coinbase no es válida. Por favor, contacta al soporte.";
      } else if (error.context?.error) {
        description = `Error de Coinbase: ${error.context.error.message || JSON.stringify(error.context.error)}`;
      } else {
        description = error.message;
      }

      toast({
        title: title,
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTokens = () => Math.floor(investmentAmount / project.token_price);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card rounded-xl tech-border w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
          <h2 className="text-2xl font-bold text-emerald-100">Invertir en {project.name}</h2>
          <Button onClick={onClose} variant="outline" size="icon" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"><X className="w-4 h-4" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 grid md:grid-cols-2 gap-4">
            <div><p className="text-emerald-200/70 text-sm">Tipo de Proyecto</p><p className="text-emerald-100 font-medium capitalize">{project.type}</p></div>
            <div><p className="text-emerald-200/70 text-sm">Ubicación</p><p className="text-emerald-100 font-medium">{project.location}</p></div>
            <div><p className="text-emerald-200/70 text-sm">% Ingresos a Tokenizar</p><p className="text-emerald-400 font-medium">{project.progress}%</p></div>
            <div><p className="text-emerald-200/70 text-sm">Precio Token</p><p className="text-emerald-100 font-medium">${project.token_price}</p></div>
          </div>

          <div className="glass-card p-4 rounded-lg tech-border">
            <WalletConnection />
          </div>

          {isConnected && (
            <div className="space-y-6">
              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">Cantidad a Invertir (USD)</label>
                <div className="relative"><input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full px-4 py-3 bg-black/50 border border-emerald-500/30 rounded-lg text-white focus:border-emerald-400 focus:outline-none pr-20" min="100" step="50" /><span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 font-medium">USD</span></div>
              </div>

              <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <h3 className="text-emerald-100 font-semibold mb-4">Resumen de Inversión</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-emerald-200/70">Inversión:</span><span className="text-emerald-400 font-medium mono">{investmentAmount.toLocaleString()} USD</span></div>
                  <div className="flex justify-between"><span className="text-emerald-200/70">Tokens estimados:</span><span className="text-emerald-400 font-medium mono">{calculateTokens().toLocaleString()} ${project.name.split(' ')[0].toUpperCase()}</span></div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-200/70">ROI por rendimiento (anual):</span>
                      <span className="text-emerald-400 font-medium mono">{project.roi}%</span>
                    </div>
                    <p className="text-xs text-emerald-200/60 text-right">Retornos basados en producción real.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="p-6 border-t border-emerald-500/20">
            <Button onClick={handleCoinbasePayment} disabled={isProcessing || investmentAmount < 100} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3">
              {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Procesando...</span>
                  </div>
              ) : (
                  <div className="flex items-center justify-center space-x-2">
                      <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/4cf330c33eed0c8b67411c19d2977e2e.png" alt="Coinbase Icon" className="w-6 h-6" />
                      <span>Invertir ${investmentAmount.toLocaleString()} con Coinbase</span>
                  </div>
              )}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}