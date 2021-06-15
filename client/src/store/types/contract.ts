export const ContractActionTypes = {
    REQUEST_CREATE_DEPOSIT_TRANSACTION: 'REQUEST_CREATE_DEPOSIT_TRANSACTION'
} as const;

interface ContractStateProperties {
    depositValue?: string | null
}

interface RequestCreateDepositTransactionAction {
    type: typeof ContractActionTypes.REQUEST_CREATE_DEPOSIT_TRANSACTION,
    payload: any
}

export type ContractState = ContractStateProperties;
export type ContractActions = RequestCreateDepositTransactionAction;