import React from 'react';
    import { Copy, Hexagon, Sun, PlusCircle, Trash2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { toast } from '@/components/ui/use-toast';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from '@/components/ui/alert-dialog';
    import { supabase } from '@/lib/customSupabaseClient';
    import { useTranslation } from 'react-i18next';

    export default function WalletTab({ userProfile, onWalletDeleted }) {
      const { t } = useTranslation();

      const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast({
          title: `📋 ${t('profile.walletTab.copied')}`,
          description: `${label} ${t('profile.walletTab.copiedDesc')}`,
        });
      };

      const handleDeleteWallet = async (walletId) => {
        const { error } = await supabase.from('user_wallets').delete().eq('id', walletId);

        if (error) {
          toast({
            title: t('profile.notifications.walletDeleteErrorTitle'),
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: t('profile.notifications.walletDeletedTitle'),
            description: t('profile.notifications.walletDeletedDesc'),
          });
          onWalletDeleted();
        }
      };

      const getNetworkIcon = (networkType) => {
        if (networkType === 'solana') {
          return <Sun className="w-5 h-5 text-blue-500 flex-shrink-0" />;
        }
        return <Hexagon className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
      };

      return (
        <div className="bg-card p-8 rounded-xl border">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('profile.walletTab.title')}</h2>

          <div className="space-y-4">
            {userProfile.wallets && userProfile.wallets.length > 0 ? (
              userProfile.wallets.map((wallet) => (
                <div
                  key={wallet.id || wallet.wallet_address}
                  className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg border"
                >
                  {getNetworkIcon(wallet.network_type)}
                  <span className="text-foreground mono flex-1 overflow-x-auto break-all">
                    {wallet.wallet_address}
                  </span>
                  <Button
                    onClick={() => copyToClipboard(wallet.wallet_address, 'Wallet address')}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-accent hover:text-foreground flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-destructive/10 hover:text-red-600 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('profile.walletTab.deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('profile.walletTab.deleteDialog.description')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteWallet(wallet.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          {t('profile.walletTab.deleteDialog.confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">{t('profile.walletTab.noWallets')}</p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('profile.walletTab.addNew')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('profile.walletTab.addNewDesc')}
            </p>
            <Button disabled className="w-full cursor-not-allowed">
              <PlusCircle className="w-4 h-4 mr-2" />
              {t('profile.walletTab.autoProcess')}
            </Button>
          </div>
        </div>
      );
    }