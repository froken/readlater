import {Reducer} from 'redux';
import {PocketAction, PocketActionTypes} from '../actions/pocket-actions';

// State Definition
export interface IPocketState {
    isAuthorized: boolean;
    requestToken: string | undefined;
    accessToken: string | undefined;
}

// Initial State
export const initialPocketState: IPocketState = {
    isAuthorized: false,
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
            return state;
        case PocketActionTypes.LOGIN_WITH_POCKET_ERROR:
            return state;
        case PocketActionTypes.GET_POCKET_ACCOUNT_SUCCESS:
            return {
                ...state,
                requestToken: action.payload.account.requestToken,
                accessToken: action.payload.account.accessToken,
                isAuthorized: action.payload.account.isAuthorized,
            };

        default:
            return state;
    }
};
