import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import pocketService from '../services/pocket-service';

// Action Type Enum
export enum PocketActionTypes {
    LOGIN_WITH_POCKET = '[user] LOGIN_WITH_POCKET',
    LOGIN_WITH_POCKET_ERROR = '[user] LOGIN_WITH_POCKET_ERROR',
}

// Action Interfaces
export interface ILoginWithPocket extends Action {
    type: PocketActionTypes.LOGIN_WITH_POCKET;
    payload: {
        code: string;
    };
}

export interface ILoginWithPocketError extends Action {
    type: PocketActionTypes.LOGIN_WITH_POCKET_ERROR;
    payload: {
        error: string;
    };
}

// Action Type
export type PocketAction = ILoginWithPocket | ILoginWithPocketError;

// Action Creators
export function loginWithPocket(d: ThunkDispatch<any, any, Action>) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        try {
            var code = await pocketService.getRequestToken();
            var url = await pocketService.getAuthorizeUrl(code);
            var action = {
                type: PocketActionTypes.LOGIN_WITH_POCKET, 
                payload: {
                    code: code
                }
            }
            dispatch(action);
            window.open(url);
        } catch (e) {
            dispatch({
                type: PocketActionTypes.LOGIN_WITH_POCKET_ERROR,
                payload: {error: e.message},
            });
        }
    };
}
