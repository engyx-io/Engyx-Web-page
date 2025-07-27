import { FileText, Wallet, Info, Network, CircleDollarSign, Check } from 'lucide-react';

    export const STEPS = [
      { id: 'network', title: 'Seleccionar Red Blockchain', icon: Network },
      { id: 'payment', title: 'Seleccionar Token de Pago', icon: CircleDollarSign },
      { id: 'wallet', title: 'Conectar Wallet', icon: Wallet },
      { id: 'assetInfo', title: 'Información del Activo', icon: Info },
      { id: 'offerInfo', title: 'Información de la Oferta', icon: CircleDollarSign },
      { id: 'legalDocs', title: 'Documentación Legal', icon: FileText },
      { id: 'summary', title: 'Resumen y Emisión', icon: Check },
    ];

    export const networkOptions = [
        { 
            label: 'Sepolia', 
            value: 'sepolia', 
            chainId: 'aa36a7',
            factoryAddress: '0x933ABAA95a7Fd0Bc683bDe2adB89f4C5EA64897b',
            bknAddress: '0x97a13487f889dc770Ac925Be2d3b6c833FA7746a',
            usdtAddress: '0x28d2B01854D0aBec267a3DDcad9163580E6E8604',
            usdcAddress: '0xb10cE8e28aEb1ae27b968Fb3bfed2FD7dd52daCb'
        },
        { 
            label: 'Ethereum Mainnet', 
            value: 'ethereum', 
            chainId: '1',
            factoryAddress: '0x91af681C85Ca98Efc5D69C1B62E6F435030969Db',
            bknAddress: '0x0A638F07ACc6969abF392bB009f216D22aDEa36d',
            usdtAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            usdcAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
        },
        { 
            label: 'Base Mainnet', 
            value: 'base', 
            chainId: '2105',
            factoryAddress: '0x278D7bdc2451B0Fa4087A68ce084a86cB91D4d83',
            bknAddress: '0xddB293BB5C5258F7484A94a0fBd5c8B2F6E4e376',
            usdtAddress: null,
            usdcAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
        },
        { 
            label: 'BNB Smart Chain Mainnet', 
            value: 'bnb', 
            chainId: '38',
            factoryAddress: '0xCe4529Fe88df480BD777d3e32dfD7032e6C685ff',
            bknAddress: '0x0e28bC9B03971E95acF9ae1326E51ecF9C55B498',
            usdtAddress: '0x55d398326f99059fF775485246999027B3197955',
            usdcAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
        },
        { 
            label: 'Amoy Polygon Testnet', 
            value: 'amoy', 
            chainId: '13882',
            factoryAddress: '0x1Ac791365E59C0F8A375F2404B4B00396923CC8c',
            bknAddress: 'TBD',
            usdtAddress: '0x636E726D3405EB64f323AB35B06bC8c335064BE8',
            usdcAddress: '0x3bA5d6278bB3072c37CeD840d644e4f49125A929'
        },
    ];

    export const paymentTokenOptions = ['USDT', 'USDC', 'EURC'];