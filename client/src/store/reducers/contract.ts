import { ContractActionTypes, ContractState, ContractActions } from '@/store/types/contract';

const initialState: ContractState = {
    depositValue: null
}

export function contractReducer(state: ContractState = initialState, action: ContractActions): ContractState {
    switch (action.type) {
        case ContractActionTypes.REQUEST_CREATE_DEPOSIT_TRANSACTION: return { ...state, ...action.payload };
        default: return state;
    }
}