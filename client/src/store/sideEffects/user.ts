import { put, call } from '@redux-saga/core/effects';
import axios from 'axios';

import { closeWalletConnector } from '@storage/actions/modals';
import { connectWallet, setInitialInfoValue } from '@storage/actions/user';
import { isMobileDevice } from '@utils/prototypes';
import { WalletControllerInstance } from '@utils/wallet_controller';
import { CONTRACTS } from '@utils/contracts/mainnet';
import { ethers } from 'ethers';
import { ICoinContracts } from "@interfaces/Contracts/ICoinContracts";

export function * tryToGetAccountAddressWorker(): Generator<any> {
    try {
        const accountAddress: any = yield call(WalletControllerInstance.getAccountAddress);
        yield put(connectWallet(accountAddress));
    } catch (e) {
        console.log('[ERROR]: tryToGetAccountAddress error');
    }
}

export function * connectToMetaMaskWalletWorker(): Generator<any> {
    try {
        if(isMobileDevice() && !WalletControllerInstance.isExtensionEnable) {
            location.href = 'https://metamask.app.link/dapp/sale.ducat.network/';
        } else {
            const accountAddress: any = yield call(connectToMetaMaskWalletProcess);
            yield put(connectWallet(accountAddress));
            yield put(closeWalletConnector());
        }
    } catch (e) {
        console.log('[ERROR]: connectToMetaMaskWallet error');
    }
}

export function * connectToTrustWalletWorker(): Generator<any> {
    try {
        location.href = 'https://link.trustwallet.com/open_url?coin_id=60&url=https://sale.ducat.network/';
    } catch (e) {
        console.log('[ERROR]: connectToTrustWallet error');
    }
}

const connectToMetaMaskWalletProcess: () => Promise<string | null> = async () => {
    try {
        return (await WalletControllerInstance.ethereum.request({ method: 'eth_requestAccounts' }))[0];
    } catch {
        throw new Error();
    }
};

export function * requestGetInitialInfoEthWorker(): Generator<any> {
    try {
        const { collected, collectedInUsd } : any = yield call((<any> requestGetInitialInfoProcess));
        yield put(setInitialInfoValue(collected, collectedInUsd));
    } catch (e) {
        console.log('[ERROR]: requestGetNestedEthWorker error');
    }
}

const requestGetInitialInfoProcess: () => Promise<any | null> = async () => {
    try {
        const contractCoinAddress = Object.keys(CONTRACTS)[0];
        let ducatContract = new ethers.Contract(contractCoinAddress, (<ICoinContracts> CONTRACTS)[contractCoinAddress].abi, ethers.getDefaultProvider());
        const currentValue = await ducatContract.weiRaised();
        const { data: { collected } } = await axios.get('https://data.ducat.network/additional-info');
        const { data: { USD } } = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
        return {
            collected: (collected + parseFloat(ethers.utils.formatEther(currentValue))),
            collectedInUsd: (collected + parseFloat(ethers.utils.formatEther(currentValue))) * USD,
        };
    } catch {
        throw new Error();
    }
};
