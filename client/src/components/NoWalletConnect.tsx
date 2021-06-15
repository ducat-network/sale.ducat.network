import React from 'react';

import WalletController from '@components/Wallet/Controller';

export const NoWalletConnect: React.FC = () => (
    <section className='no-wallet-connect'>
        <div className='no-wallet-connect__block'>
            <div className='no-wallet-connect__welcome'>
                <img src={require('@assets/imgs/icons/wallet').default} alt='no_wallets' />
                <h3>Hello!</h3>
            </div>
            <span>Log in to your wallet to continue</span>
            <WalletController />
        </div>
    </section>
);