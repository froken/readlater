import {Reducer} from 'redux';
import {PocketAction, PocketActionTypes} from '../actions/pocket-actions';

// State Definition
export interface IPocketState {
    isAuthenticated: boolean;
    requestToken: string | undefined;
    accessToken: string | undefined;
}

// Initial State
export const initialPocketState: IPocketState = {
    isAuthenticated: false,
    requestToken: undefined,
    accessToken: undefined,
};

// Reducer
export let reducer: Reducer<IPocketState, PocketAction> = (
    state: IPocketState = initialPocketState,
    action: PocketAction
) => {
    switch (action.type) {
        case PocketActionTypes.LOGIN_WITH_POCKET:
            return {...state, isAuthenticated: true, code: action.payload.code};
        case PocketActionTypes.LOGIN_WITH_POCKET_ERROR:
            return {...state, isAuthenticated: false};
        case PocketActionTypes.GET_POCKET_ACCOUNT_SUCCESS:
            return {...state, requestToken: action.payload.account.requestToken, accessToken: action.payload.account.accessToken};
      
        default:
            return state;
    }
};
