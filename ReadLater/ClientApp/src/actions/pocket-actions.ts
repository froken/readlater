import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import pocketService from '../services/pocket-service';
import {PocketAccount} from '../models/pocket-account';
import readService from '../services/read-service';

// Action Type Enum
export enum PocketActionTypes {
    LOGIN_WITH_POCKET = '[pocket] LOGIN_WITH_POCKET',
    LOGIN_WITH_POCKET_ERROR = '[pocket] LOGIN_WITH_POCKET_ERROR',
    GET_POCKET_ACCOUNT = '[pocket] GET_POCKET_ACCOUNT',
    GET_POCKET_ACCOUNT_SUCCESS = '[pocket] GET_POCKET_ACCOUNT_SUCCESS',
    GET_POCKET_ACCOUNT_ERROR = '[pocket] GET_POCKET_ACCOUNT_ERROR',
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

export interface IGetPocketAccount extends Action {
    type: PocketActionTypes.GET_POCKET_ACCOUNT;
    payload: {};
}

export interface IGetPocketAccountSuccess extends Action {
    type: PocketActionTypes.GET_POCKET_ACCOUNT_SUCCESS;
    payload: {
        account: PocketAccount;
    };
}

export interface IGetPocketAccountError extends Action {
    type: PocketActionTypes.GET_POCKET_ACCOUNT_ERROR;
    payload: {
        error: string;
    };
}

// Action Type
export type PocketAction =
    | ILoginWithPocket
    | ILoginWithPocketError
    | IGetPocketAccount
    | IGetPocketAccountError
    | IGetPocketAccountSuccess;

// Action Creators
export function loginWithPocket(d: ThunkDispatch<any, any, Action>) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        try {
            var code = await pocketService.getRequestToken();
            var url = await pocketService.getAuthorizeUrl(code);
            var action = {
                type: PocketActionTypes.LOGIN_WITH_POCKET,
                payload: {
                    code: code,
                },
            };
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

export function getPocketAccount(d: ThunkDispatch<any, any, Action>) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        try {
            dispatch({type: PocketActionTypes.GET_POCKET_ACCOUNT});
            var account = await pocketService.getPocketAccount();
            var action = {
                type: PocketActionTypes.GET_POCKET_ACCOUNT_SUCCESS,
                payload: {
                    account,
                },
            };
            var list = await readService.getReadList();

            dispatch(action);

            
        } catch (e) {
            dispatch({
                type: PocketActionTypes.GET_POCKET_ACCOUNT_ERROR,
                payload: {error: e.message},
            });
        }
    };
}
