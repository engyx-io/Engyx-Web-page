import React from 'react';
    import { motion } from 'framer-motion';
    import { Wallet, CheckCircle, LogOut, Loader2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { useTranslation } from 'react-i18next';
    import { useWallet } from '@/contexts/WalletContext';

    const WalletOptionButton = ({ icon, title, description, onClick, disabled }) => (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        disabled={disabled}
        className="w-full h-auto text-left p-5 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center space-x-4"
      >
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <p className="font-bold text-white text-lg">{title}</p>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
      </motion.button>
    );
    
    export default function WalletConnection() {
      const { t } = useTranslation('common');
      const {
        isConnected,
        walletAddress,
        networkType,
        connectEvm,
        connectSolana,
        disconnectWallet,
        isLoading,
        authStatus
      } = useWallet();

      const walletOptions = [
        {
          id: 'evm',
          name: t('wallets.evm'),
          icon: '♦️',
          description: t('wallets.evmDescription'),
          action: connectEvm,
        },
        {
          id: 'solana',
          name: t('wallets.solana'),
          icon: '☀️',
          description: t('wallets.solanaDescription'),
          action: connectSolana,
        },
      ];

      if (isConnected) {
        return (
          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-white overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-emerald-300">
                <CheckCircle className="w-6 h-6" />
                <span>{t('wallets.connectedTitle')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {networkType === 'solana' ? '☀️' : '♦️'}
                  </span>
                  <div>
                    <p className="text-sm text-slate-400">{networkType === 'solana' ? 'Solana' : 'EVM'} Wallet</p>
                    <p className="font-mono text-base text-emerald-300 break-all">
                      {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                    </p>
                  </div>
                </div>
                <Button onClick={disconnectWallet} variant="destructive" size="sm" className="bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 w-full sm:w-auto">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('wallets.disconnect')}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      }

      return (
        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-300">
              <Wallet className="w-6 h-6"/>
              <span>{t('wallets.connectTitle')}</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              {t('wallets.connectDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {walletOptions.map((wallet) => (
              <WalletOptionButton
                key={wallet.id}
                icon={wallet.icon}
                title={wallet.name}
                description={wallet.description}
                onClick={wallet.action}
                disabled={isLoading && authStatus==='pending'}
              />
            ))}
            {isLoading && authStatus==='pending' && (
              <div className="flex items-center justify-center text-sm text-slate-400">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>{t('wallets.loading')}</span>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }