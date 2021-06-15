import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { UserState } from '@storage/types/user';
import { tryToGetAccountAddress } from '@storage/actions/user';
import { openWalletConnector } from '@storage/actions/modals';

const mapDispatch = {
    openWalletConnector,
    tryToGetAccountAddress
}

type Props = UserState & typeof mapDispatch;

const WalletController: React.FC<Props> = (props: Props) => {
    const { openWalletConnector, tryToGetAccountAddress } = props;

    useEffect(() => {
        tryToGetAccountAddress();
    }, [])

    return (
        <div className='wallet-controller' onClick={openWalletConnector}>
            <span>Connect wallet</span>
        </div>
    );
};

export default connect<null, Props>(null, mapDispatch)(WalletController);