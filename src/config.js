import { sepolia as wagmiSepolia } from 'wagmi/chains';

    export const ADMIN_EMAILS = ['admin@engyx.io', 'em.aravenai@gmail.com', 'exequiel@engyx.io'];

    export const sepoliaCustom = {
      ...wagmiSepolia,
      id: 11155111,
      rpcUrls: {
        default: { http: ['https://rpc.sepolia.org'] },
        public: { http: ['https://rpc.sepolia.org'] },
      },
      nativeCurrency: {
        name: 'Sepolia Ether',
        symbol: 'SEP',
        decimals: 18,
      },
      blockExplorers: {
        default: { name: 'Sepolia Etherscan', url: 'https://sepolia.etherscan.io' },
      },
      testnet: true,
    };