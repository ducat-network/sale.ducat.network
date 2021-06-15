import { call, select } from '@redux-saga/core/effects';
import { ethers, BigNumber } from 'ethers';

import { getProposeGasPrice } from '@utils/etherscan';
import { WalletControllerInstance } from '@utils/wallet_controller';
import { ICoinContracts } from '@interfaces/Contracts/ICoinContracts';
import { CONTRACTS } from '@utils/contracts/mainnet';

export function * createDepositTransactionWorker({ payload: { depositValue } }: any): Generator<any> {
    try {
        const accountAddress = yield select(state => state.user.accountAddress);
        yield call((<any> createDepositTransactionProcess), depositValue, accountAddress);
    } catch (e) {
        console.log('[ERROR]: createDepositTransaction error');
    }
}

const createDepositTransactionProcess: (depositValue: string, accountAddress: string) => Promise<string | null> = async (depositValue: string, accountAddress: string) => {
    const { gasPrice } = await getProposeGasPrice();

    const approveOptions = { gasPrice, gasLimit: BigNumber.from(150000).toHexString() };
    const ethersSigner = WalletControllerInstance.signer;

    const contractCoinAddress = Object.keys(CONTRACTS)[0];
    let ducatContract = new ethers.Contract(contractCoinAddress, (<ICoinContracts> CONTRACTS)[contractCoinAddress].abi, ethersSigner);

    depositValue = ethers.utils.parseUnits(depositValue.toString(), 18).toString();
    await ducatContract.buyTokens(accountAddress, { value:  depositValue, ...approveOptions });

    return "";
};