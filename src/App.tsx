import React, { useMemo, useState } from 'react';
import type { Adapter, WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import {
    WalletModalProvider,
} from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { TronLinkAdapter, TokenPocketAdapter, BitKeepAdapter, OkxWalletAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';

import Navbar from './pages/Navbar';
import Staking from './pages/Staking';


export function App() {
    function onError(e: WalletError) {
        console.log(e);
        if (e instanceof WalletNotFoundError) {
            toast.error(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            toast.error(e.message);
        } else toast.error(e.message);
    }
    const adapters = useMemo(function () {
        const tronLink1 = new TronLinkAdapter();
        const walletConnect1 = new WalletConnectAdapter({
            network: 'Nile',
            options: {
                relayUrl: 'wss://relay.walletconnect.com',
                // example WC app project ID
                projectId: '5fc507d8fc7ae913fff0b8071c7df231',
                metadata: {
                    name: 'Test DApp',
                    description: 'JustLend WalletConnect',
                    url: 'https://your-dapp-url.org/',
                    icons: ['https://your-dapp-url.org/mainLogo.svg'],
                },
            },
            web3ModalConfig: {
                themeMode: 'dark',
                themeVariables: {
                    '--w3m-z-index': '1000'
                },
                // explorerRecommendedWalletIds: 'NONE',
                enableExplorer: true,
                explorerRecommendedWalletIds: [
                    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
                    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
                    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
                ]
            }
        });
        const ledger = new LedgerAdapter({
            accountNumber: 2,
        });
        const tokenPocket = new TokenPocketAdapter();
        const bitKeep = new BitKeepAdapter();
        const okxWalletAdapter = new OkxWalletAdapter();
        return [tronLink1, walletConnect1, ledger, tokenPocket, bitKeep, okxWalletAdapter];
    }, []);
    function onConnect() {
        console.log('onConnect');
    }
    async function onAccountsChanged() {
        console.log('onAccountsChanged')
    }
    async function onAdapterChanged(adapter: Adapter | null) {
        console.log('onAdapterChanged', adapter)
    }
    return (
        <WalletProvider onError={onError} onConnect={onConnect} onAccountsChanged={onAccountsChanged} onAdapterChanged={onAdapterChanged} autoConnect={true} adapters={adapters} disableAutoConnectOnLoad={true}>
            <WalletModalProvider>
                <div className="flex items-center flex-col bg-[#000000] text-stone-900 dark:text-stone-300 min-h-screen font-inter">
                    <Navbar />
                    <div className="px-4 w-full md:w-[95%] xl:w-3/4 ">
                        <Staking />
                    </div>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    );
}

export default App;
