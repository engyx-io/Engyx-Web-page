import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuGroup
    } from '@/components/ui/dropdown-menu';
    import { useWallet } from '@/contexts/WalletContext';
    import { useTranslation } from 'react-i18next';
    import { Wallet, LogOut, ChevronDown, User, LayoutDashboard, Hexagon, Loader2 } from 'lucide-react';

    export default function AuthNavButton({ variant = 'desktop' }) {
      const { t, i18n } = useTranslation('common');
      const {
        authStatus,
        walletAddress,
        networkType,
        disconnectWallet,
        isAdmin,
        isLoading
      } = useWallet();

      const getLocalizedPath = (path) => {
        return i18n.language === 'es' ? '/comenzar' : '/get-started';
      };

      const userMenuItems = [
        { name: t('header.profile'), path: '/profile', icon: <User className="mr-2 h-4 w-4" /> },
        { name: t('header.dashboard'), path: '/dashboard', icon: <LayoutDashboard className="mr-2 h-4 w-4" /> },
      ];

      if (isAdmin) {
        userMenuItems.push({ name: t('header.admin'), path: '/admin', icon: <Hexagon className="mr-2 h-4 w-4" /> });
      }

      const getNetworkIcon = () => {
        if (networkType === 'solana') {
          return '☀️';
        }
        return '♦️';
      };

      if (variant === 'mobile') {
        if (authStatus === 'authenticated') {
          return (
            <div className="text-center w-full">
              <p className="text-emerald-300 text-sm mono flex items-center justify-center space-x-2">
                <span className="text-lg">{getNetworkIcon()}</span>
                <span>{`${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`}</span>
              </p>
              {userMenuItems.map(item => (
                 <Link key={item.name} to={item.path} className="w-full mt-4 block">
                   <Button variant="outline" className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">{item.name}</Button>
                 </Link>
              ))}
              <Button onClick={disconnectWallet} variant="outline" size="sm" className="mt-4 border-red-500/50 text-red-400 hover:bg-red-500/10 w-full">{t('header.signOut')}</Button>
            </div>
          );
        }
        
        return (
            <Link to={getLocalizedPath('/get-started')} className="w-full">
              <Button
                className="w-full text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 border-0"
                style={{
                  background: 'linear-gradient(135deg, #30d3a2 0%, #14b8a6 100%)',
                  boxShadow: '0 4px 24px 0 rgba(48,211,162,0.15)',
                }}
              >
                Connect Wallet
              </Button>
            </Link>
        );
      }

      // Desktop variant
      if (isLoading && authStatus === 'pending') {
        return (
          <Button disabled variant="outline" className="border-slate-700 text-slate-300">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('wallets.loading')}
          </Button>
        );
      }

      if (authStatus === 'authenticated') {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass-card p-2 rounded-lg flex items-center justify-between gap-2 border border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 pr-3">
                 <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-xl flex-shrink-0">{getNetworkIcon()}</span>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs text-slate-400 truncate">{networkType === 'solana' ? 'Solana' : 'EVM'} Wallet</p>
                      <p className="font-mono text-sm text-emerald-300 truncate">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</p>
                    </div>
                  </div>
                <ChevronDown className="w-4 h-4 text-emerald-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                {userMenuItems.map(item => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.path} className="flex items-center w-full">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('header.signOut')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      
      if (authStatus === 'connected_unauthenticated') {
        return (
          <Link to={getLocalizedPath('/get-started')}>
            <Button variant="outline" className="glass-card p-2 rounded-lg flex items-center justify-between gap-2 border border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 px-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-sm">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</span>
              </div>
            </Button>
          </Link>
        );
      }
      
      // Not connected, not authenticated
      return (
        <Link to={getLocalizedPath('/get-started')}>
          <Button
            className="text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 border-0"
            style={{
              background: 'linear-gradient(135deg, #30d3a2 0%, #14b8a6 100%)',
              boxShadow: '0 4px 24px 0 rgba(48,211,162,0.15)',
            }}
          >
            Connect Wallet
          </Button>
        </Link>
      );
    }