import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
    import { toast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useNavigate, useLocation } from 'react-router-dom';
    import { useTranslation } from 'react-i18next';
    import { ethers } from "ethers";
    import { sepoliaCustom } from '@/config';

    import { useAccount, useDisconnect as useWagmiDisconnect, useSwitchNetwork } from 'wagmi';
    import { useWeb3Modal } from '@web3modal/wagmi/react';

    import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
    import { useWalletModal } from '@solana/wallet-adapter-react-ui';

    const WalletContext = createContext(null);

    export const useWallet = () => {
      const context = useContext(WalletContext);
      if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
      }
      return context;
    };

    export const WalletProvider = ({ children }) => {
      const { user, isAdmin, signOut } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const { t } = useTranslation('common');
      const [activeWallet, setActiveWallet] = useState(null);
      const [walletAddress, setWalletAddress] = useState('');
      const [signerAddress, setSignerAddress] = useState('');
      const [isConnected, setIsConnected] = useState(false);
      const [networkType, setNetworkType] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const [authStatus, setAuthStatus] = useState('pending');

      const { address: evmAddress, isConnected: isEvmConnected, chain } = useAccount();
      const { disconnect: wagmiDisconnect } = useWagmiDisconnect();
      const { open: openWeb3Modal } = useWeb3Modal();
      const { switchNetwork } = useSwitchNetwork();

      const { 
        connected: isSolanaConnected, 
        publicKey: solanaPublicKey, 
        disconnect: solanaDisconnect,
      } = useSolanaWallet();
      const { setVisible: setSolanaModalVisible } = useWalletModal();

      const handleDisconnect = useCallback(() => {
        setActiveWallet(null);
        setWalletAddress('');
        setSignerAddress('');
        setIsConnected(false);
        setNetworkType('');
        setAuthStatus('pending');
      }, []);

      const disconnectWallet = useCallback(async () => {
        if (activeWallet === 'evm') {
          wagmiDisconnect();
        } else if (activeWallet === 'solana') {
          await solanaDisconnect();
        }
        
        handleDisconnect();

        if (user) {
          await signOut();
        }

        toast({
          title: t('notification.walletDisconnectedTitle'),
          description: t('notification.walletDisconnectedDesc'),
        });
        
        navigate('/');
        window.location.reload();
      }, [activeWallet, wagmiDisconnect, solanaDisconnect, signOut, navigate, t, user, handleDisconnect]);

      const getSignerAddress = async () => {
        if (typeof window.ethereum !== 'undefined' && isEvmConnected) {
          try {
            if (chain && chain.id !== sepoliaCustom.id) {
              await switchNetwork?.(sepoliaCustom.id);
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setSignerAddress(address);
            return address;
          } catch (e) {
            console.error("Could not get signer address", e);
            setSignerAddress('');
            return null;
          }
        }
        return null;
      };

      useEffect(() => {
        const newEvmConnected = isEvmConnected && evmAddress;
        const newSolanaConnected = isSolanaConnected && solanaPublicKey;
        const newWalletAddress = newEvmConnected ? evmAddress : (newSolanaConnected ? solanaPublicKey.toBase58() : '');
        const newNetworkType = newEvmConnected ? 'evm' : (newSolanaConnected ? 'solana' : '');

        if (newWalletAddress) {
          setIsConnected(true);
          setWalletAddress(newWalletAddress);
          setNetworkType(newNetworkType);
          if (newEvmConnected) {
            setActiveWallet('evm');
          }
          if (newSolanaConnected) {
            setActiveWallet('solana');
            setSignerAddress(newWalletAddress);
          }
        } else {
          if (isConnected) {
            handleDisconnect();
          }
        }
        setIsLoading(false);
      }, [isEvmConnected, evmAddress, isSolanaConnected, solanaPublicKey, isConnected, handleDisconnect, chain, switchNetwork]);

      useEffect(() => {
        const syncAndValidate = async () => {
          if (!isConnected || !walletAddress) {
            setAuthStatus('pending');
            return;
          }

          if (user) {
            const { data: userWallets, error: fetchError } = await supabase
              .from('user_wallets')
              .select('wallet_address')
              .eq('user_id', user.id);

            if (fetchError) {
              toast({ title: 'Error', description: 'No se pudieron verificar las wallets del perfil.', variant: 'destructive' });
              setAuthStatus('error');
              return;
            }

            const knownWallets = userWallets.map(w => w.wallet_address.toLowerCase());
            const isCurrentWalletKnown = knownWallets.includes(walletAddress.toLowerCase());
            
            setAuthStatus('authenticated');
            
            if (!isCurrentWalletKnown) {
              const { error: insertError } = await supabase
                .from('user_wallets')
                .insert({
                  user_id: user.id,
                  wallet_address: walletAddress,
                  network_type: networkType,
                });

              if (insertError) {
                if (insertError.code === '23505') {
                     toast({
                        title: 'Error de Wallet',
                        description: 'Esta wallet ya está asociada a otra cuenta. Desconectando...',
                        variant: 'destructive',
                      });
                     setTimeout(() => disconnectWallet(), 3000);
                } else {
                     toast({
                        title: 'Error al vincular wallet',
                        description: 'No se pudo añadir la nueva wallet a tu perfil.',
                        variant: 'destructive',
                      });
                }
              } else {
                 toast({
                  title: 'Wallet Vinculada',
                  description: 'Tu nueva wallet ha sido vinculada a tu perfil.',
                });
              }
            }
            
            if (location.pathname === '/get-started' || location.pathname === '/comenzar') {
                navigate('/dashboard', { replace: true });
            }

          } else {
            setAuthStatus('connected_unauthenticated');
          }
        };

        syncAndValidate();
      }, [user, isConnected, walletAddress, networkType, navigate, location, disconnectWallet]);

      const connectEvm = useCallback(() => {
        openWeb3Modal();
      }, [openWeb3Modal]);

      const connectSolana = useCallback(() => {
        setSolanaModalVisible(true);
      }, [setSolanaModalVisible]);

      const value = {
        isLoading,
        isConnected,
        walletAddress,
        signerAddress,
        getSignerAddress,
        networkType,
        connectEvm,
        connectSolana,
        disconnectWallet,
        authStatus,
        isAdmin,
      };

      return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
    };