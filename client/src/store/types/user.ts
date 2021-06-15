export const UserActionTypes = {
    TRY_TO_GET_ACCOUNT_ADDRESS: 'TRY_TO_GET_ACCOUNT_ADDRESS',
    REQUEST_META_MASK_CONNECT_TO_WALLET: 'REQUEST_META_MASK_CONNECT_TO_WALLET',
    REQUEST_TRUST_CONNECT_TO_WALLET: 'REQUEST_TRUST_CONNECT_TO_WALLET',
    CONNECT_WALLET: 'CONNECT_WALLET',
    REQUEST_GET_NESTED_ETH: 'REQUEST_GET_NESTED_ETH',
    SET_INITIAL_INFO_VALUE: 'SET_INITIAL_INFO_VALUE',
} as const;

interface UserStateProperties {
    accountAddress?: string | null,
    collected?: number | null,
    collectedInUsd?: number | null,
}

interface TryToGetAccountAddressAction {
    type: typeof UserActionTypes.TRY_TO_GET_ACCOUNT_ADDRESS;
}

interface RequestMetaMaskConnectToWalletAction {
    type: typeof UserActionTypes.REQUEST_META_MASK_CONNECT_TO_WALLET;
}

interface RequestTrustConnectToWalletAction {
    type: typeof UserActionTypes.REQUEST_TRUST_CONNECT_TO_WALLET;
}

interface ConnectToWalletAction {
    type: typeof UserActionTypes.CONNECT_WALLET;
    payload: any
}

interface RequestGetNestedETHAction {
    type: typeof UserActionTypes.REQUEST_GET_NESTED_ETH;
}

interface SetInitialValueAction {
    type: typeof UserActionTypes.SET_INITIAL_INFO_VALUE;
    payload: any
}

export type UserState = UserStateProperties;
export type UserActions = ConnectToWalletAction | SetInitialValueAction | RequestGetNestedETHAction | RequestMetaMaskConnectToWalletAction | TryToGetAccountAddressAction | RequestTrustConnectToWalletAction;