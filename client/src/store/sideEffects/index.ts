import { takeEvery } from '@redux-saga/core/effects';

import { UserActionTypes } from '@storage/types/user';
import { connectToMetaMaskWalletWorker, tryToGetAccountAddressWorker, connectToTrustWalletWorker, requestGetInitialInfoEthWorker } from '@storage/sideEffects/user';
import { ContractActionTypes } from '@/store/types/contract';
import { createDepositTransactionWorker } from '@/store/sideEffects/contract';

export function * rootSagaWatcher() {
    yield takeEvery(UserActionTypes.TRY_TO_GET_ACCOUNT_ADDRESS, tryToGetAccountAddressWorker);
    yield takeEvery(UserActionTypes.REQUEST_META_MASK_CONNECT_TO_WALLET, connectToMetaMaskWalletWorker);
    yield takeEvery(UserActionTypes.REQUEST_TRUST_CONNECT_TO_WALLET, connectToTrustWalletWorker);
    yield takeEvery(UserActionTypes.REQUEST_GET_NESTED_ETH, requestGetInitialInfoEthWorker);

    yield takeEvery(ContractActionTypes.REQUEST_CREATE_DEPOSIT_TRANSACTION, createDepositTransactionWorker);
}