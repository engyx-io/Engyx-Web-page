import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { CheckCircle, Copy, LogOut, Wallet } from 'lucide-react';
import { CoinbaseLogo } from '@/components/icons/CoinbaseLogo';
import { useTranslation } from 'react-i18next';

export default function PurchaseForm({ presaleStats, onPurchase }) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(10);
  const [tokens, setTokens] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { walletAddress, networkType, connectEvm, connectSolana, disconnectWallet } = useWallet();

  useEffect(() => {
    if (presaleStats && presaleStats.current_price > 0) {
      setTokens(amount / presaleStats.current_price);
    }
  }, [amount, presaleStats]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setAmount(Number(value));
    }
  };

  const handlePurchase = async () => {
    if (!walletAddress) {
      toast({ title: t('common.error'), description: t('presale.notification.connectWalletFirst'), variant: "destructive" });
      return;
    }
    if (amount < 10) {
      toast({ title: t('common.error'), description: t('presale.notification.minInvestment', { minAmount: 10 }), variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-coinbase-charge', {
        body: {
          amount: amount,
          currency: 'USD',
          walletAddress: walletAddress,
          network: networkType,
        },
      });

      if (error) throw error;

      if (data.hosted_url) {
        window.open(data.hosted_url, '_blank');
        toast({
          title: t('presale.notification.redirectingToCoinbase'),
          description: t('presale.notification.redirectingToCoinbaseDesc'),
        });
        onPurchase();
      } else {
        throw new Error(t('presale.notification.coinbaseChargeError'));
      }
    } catch (error) {
      console.error("Error creating Coinbase charge:", error);
      toast({
        title: t('common.error'),
        description: error.message || t('presale.notification.paymentError'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: t('presale.notification.copied'),
      description: t('presale.notification.addressCopied'),
    });
  };

  return (
    <motion.div 
      className="glass-card p-8 rounded-2xl presale-highlight w-full max-w-md bg-gradient-to-br from-black via-slate-900/50 to-black"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('presale.purchaseFormTitle')}</h3>
      <p className="text-emerald-200/70 text-sm mb-6 text-center">{t('presale.purchaseFormSubtitle', { price: presaleStats?.current_price || '...' })}</p>

      <div className="space-y-6 bg-black/20 p-6 rounded-xl border border-emerald-500/20 mb-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-emerald-200 mb-2">{t('presale.purchaseFormAmountUSD')}</label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="pl-10 text-lg"
              min="10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200/70 text-lg">$</span>
          </div>
        </div>
        <div>
          <label htmlFor="tokens" className="block text-sm font-semibold text-emerald-200 mb-2">{t('presale.purchaseFormTokensToReceive')}</label>
          <div className="relative">
            <Input
              id="tokens"
              type="text"
              value={`≈ ${tokens.toFixed(2)}`}
              readOnly
              className="pl-12 bg-black/30 text-lg"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/70">
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/76efbe67-454a-4b85-b3ec-3954b6d7f1f8/fa3d60a2b1c0e1afc116ac4da87347e1.png" alt="ENGYX Token" className="w-6 h-6" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {walletAddress ? (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <p className="text-sm text-white">
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyAddress} className="text-emerald-300 hover:text-white transition-colors"><Copy size={16} /></button>
                  <button onClick={disconnectWallet} className="text-red-400 hover:text-red-300 transition-colors"><LogOut size={16} /></button>
                </div>
              </div>
            </div>
            <Button onClick={handlePurchase} size="lg" className="w-full font-bold text-base bg-[#0052FF] hover:bg-[#0045D1] text-white flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('presale.processing')}...</span>
                </>
              ) : (
                <>
                  <CoinbaseLogo />
                  <span>{t('presale.purchaseFormPayWithCoinbase')}</span>
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-sm text-emerald-200/80">{t('presale.purchaseFormConnectPrompt')}</p>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={connectEvm} variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                <Wallet className="w-4 h-4 mr-2" /> {t('presale.purchaseFormConnectEVM')}
              </Button>
              <Button onClick={connectSolana} variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                <Wallet className="w-4 h-4 mr-2" /> {t('presale.purchaseFormConnectSolana')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}