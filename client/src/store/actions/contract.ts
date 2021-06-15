import { ContractActionTypes, ContractState, ContractActions } from '@/store/types/contract';

export const requestCreateDepositTransaction = (depositValue: ContractState): ContractActions => {
    return {
        type: ContractActionTypes.REQUEST_CREATE_DEPOSIT_TRANSACTION,
        payload: {
            depositValue
        }
    }
};