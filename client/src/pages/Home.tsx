import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { useTitle } from '@hooks/title.hook';
import { UserState } from '@/store/types/user';
import { RootState } from '@/store/reducers';
import { NoWalletConnect } from '@components/NoWalletConnect';
import { WalletConnectorModal } from '@components/WalletConnectorModal';
import { requestCreateDepositTransaction } from '@/store/actions/contract';
import { requestGetInitialInfoEth } from '@storage/actions/user';
import { ContractState } from '@/store/types/contract';

const mapDispatch = {
    requestCreateDepositTransaction,
    requestGetInitialInfoEth
}

type Props = ContractState & typeof mapDispatch & UserState & any;

const DEFAULT_ETH = 1;
const DEFAULT_DUCAT = 2500;

const HomeComponent: React.FC<Props> = (props: Props) => {
    const { accountAddress, collected, collectedInUsd, requestCreateDepositTransaction, requestGetInitialInfoEth } = props;

    const [valueEth, setValueEth] = useState(DEFAULT_ETH);
    const [valueDucat, setValueDucat] = useState(DEFAULT_DUCAT);

    const [showedValue, setShowedValue] = useState(`${DEFAULT_ETH} ETH`)
    const onFocus = () => setShowedValue(`${valueEth}`);
    const onBlur = () => setShowedValue(`${valueEth} ETH`);

    useTitle('Ducat sales');

    useEffect(() => {
        requestGetInitialInfoEth();
    }, []);

    const handleChangeEthValue = (e: any) => {
        const currentValue = e.target.value.trim();

        if(!currentValue) {
            setValueEth(0);
            setValueDucat(e.target.value * DEFAULT_DUCAT);
            setShowedValue(`${e.target.value}`);
        }

        if(currentValue.match(RegExp('^\\d+\\.?\\d*$', 'gi'))) {
            setValueEth(currentValue);
            setValueDucat(currentValue * DEFAULT_DUCAT);
            setShowedValue(`${currentValue}`);
        }

    }

    const handleSendToContract = async (e: any) => {
        e.preventDefault();
        await requestCreateDepositTransaction(valueEth);
    };

    return (
        <main>
            <WalletConnectorModal />
            <div className='content'>
                <div className='home-container'>
                    <div className='details'>
                        <div className='details-item'>
                            <h2>Collected</h2>
                            <span>ETH {collected ? collected.toFixed(2) : '?'} / ${collectedInUsd ? collectedInUsd.toFixed(2) : '?'}</span>
                        </div>
                    </div>
                    {
                        accountAddress ? <div className='form-container'>
                            <div className='coin-info-container'>
                                <img src={require(`@assets/imgs/icons/ducat`).default} alt="table" />
                                <div>{Math.round(valueDucat * (10 ** 12)) / (10 ** 12)} <span>DUCAT</span></div>
                            </div>
                            <form className='coin-container' action='' onSubmit={handleSendToContract}>
                                <img src={require(`@assets/imgs/coins/eth`).default} alt="eth" />
                                <input type='text' autoComplete='off' value={showedValue} onFocus={onFocus} onBlur={onBlur} onChange={handleChangeEthValue} maxLength={18} />
                            </form>
                            <input type='submit' value='Send' disabled={valueEth <= 0} onClick={handleSendToContract}/>
                        </div> : <NoWalletConnect/>
                    }
                </div>
            </div>
        </main>
    );
};

export const Home = connect<UserState, typeof mapDispatch>((state: RootState) => ({
    accountAddress: state.user.accountAddress,
    collected: state.user.collected,
    collectedInUsd: state.user.collectedInUsd,
}), mapDispatch)(HomeComponent);