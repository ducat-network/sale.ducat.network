import { UserActionTypes, UserState, UserActions } from '@storage/types/user';

const initialState: UserState = {
    accountAddress: null,
    collected: null,
    collectedInUsd: null,
}

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.REQUEST_META_MASK_CONNECT_TO_WALLET: return state;
        case UserActionTypes.REQUEST_TRUST_CONNECT_TO_WALLET: return state;
        case UserActionTypes.REQUEST_GET_NESTED_ETH: return state;
        case UserActionTypes.CONNECT_WALLET: return { ...state, ...action.payload };
        case UserActionTypes.SET_INITIAL_INFO_VALUE: return { ...state, ...action.payload };
        default: return state;
    }
}