import { combineReducers } from 'redux';

import { userReducer } from '@storage/reducers/user';
import { contractReducer } from '@/store/reducers/contract';
import { modalsReducer } from '@storage/reducers/modals';

export const rootReducer = combineReducers<any>({
    user: userReducer,
    contract: contractReducer,
    modals: modalsReducer
});

export type RootState = ReturnType<typeof rootReducer>