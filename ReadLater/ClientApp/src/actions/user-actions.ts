import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import history from '../history';
import {User} from '../models/user';
import authService from '../services/auth-service';

// Action Type Enum
export enum UserActionTypes {
    REGISTER_USER = '[user] REGISTER_USER',
    REGISTER_USER_SUCCESS = '[user] REGISTER_USER_SUCCESS',
    REGISTER_USER_ERROR = '[user] REGISTER_USER_ERROR',
    LOGIN_USER = '[user] LOGIN_USER',
    LOGIN_USER_SUCCESS = '[user] LOGIN_USER_SUCCESS',
    LOGIN_USER_ERROR = '[user] LOGIN_USER_ERROR',
    AUTHENTICATE_USER = '[user] AUTHENTICATE_USER',
    AUTHENTICATE_USER_SUCCESS = '[user] AUTHENTICATE_USER_SUCCESS',
    AUTHENTICATE_USER_ERROR = '[user] AUTHENTICATE_USER_ERROR',
}

// Action Interfaces
export interface IRegisterUser extends Action {
    type: UserActionTypes.REGISTER_USER;
    payload: {
        user: User;
    };
}

export interface IRegisterUserSuccess extends Action {
    type: UserActionTypes.REGISTER_USER_SUCCESS;
    payload: {
        user: User;
    };
}

export interface IRegisterUserError extends Action {
    type: UserActionTypes.REGISTER_USER_ERROR;
    payload: {
        error: string;
    };
}

export interface ILoginUser extends Action {
    type: UserActionTypes.LOGIN_USER;
}

export interface ILoginUserSuccess extends Action {
    type: UserActionTypes.LOGIN_USER_SUCCESS;
    payload: {
        userName: string;
    };
}

export interface ILoginUserError extends Action {
    type: UserActionTypes.LOGIN_USER_ERROR;
    payload: {
        error: string;
    };
}

export interface IAuthenticate extends Action {
    type: UserActionTypes.AUTHENTICATE_USER;
}

export interface IAuthenticateSuccess extends Action {
    type: UserActionTypes.AUTHENTICATE_USER_SUCCESS;
    payload: {
        userName: string | undefined;
    };
}

export interface IAuthenticateError extends Action {
    type: UserActionTypes.AUTHENTICATE_USER_ERROR;
    payload: {
        error: string;
    };
}

// Action Type
export type UserAction =
    | IRegisterUser
    | IRegisterUserError
    | IRegisterUserSuccess
    | ILoginUser
    | ILoginUserError
    | ILoginUserSuccess
    | IAuthenticate
    | IAuthenticateError
    | IAuthenticateSuccess;

// Action Creators
export function register(user: User, d: ThunkDispatch<any, any, Action>) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        dispatch({type: UserActionTypes.REGISTER_USER});

        try {
            await authService.register(user);

            const action: IRegisterUserSuccess = {
                payload: {
                    user,
                },
                type: UserActionTypes.REGISTER_USER_SUCCESS,
            };

            dispatch(action);
            sessionStorage.setItem('userName', user.userName as string);
            history.push('/');
        } catch (e) {
            dispatch({
                type: UserActionTypes.REGISTER_USER_ERROR,
                payload: {error: e.message},
            });
        }
    };
}

export function login(
    userName: string,
    password: string,
    d: ThunkDispatch<any, any, Action>
) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        dispatch({type: UserActionTypes.REGISTER_USER});

        try {
            await authService.login(userName, password, "/");

            const action: ILoginUserSuccess = {
                payload: {
                    userName,
                },
                type: UserActionTypes.LOGIN_USER_SUCCESS,
            };

            dispatch(action);
            sessionStorage.setItem('userName', userName);
            history.push('/');
        } catch (e) {
            dispatch({
                type: UserActionTypes.REGISTER_USER_ERROR,
                payload: {error: e.message},
            });
        }
    };
}

export function authenticate(
    d: ThunkDispatch<any, any, Action>
) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        dispatch({type: UserActionTypes.AUTHENTICATE_USER});

        try {
            var response = await authService.authenticate();
            
            const action: IAuthenticateSuccess = {
                payload: {
                    userName: response,
                },
                type: UserActionTypes.AUTHENTICATE_USER_SUCCESS,
            };

            dispatch(action);
            history.push('/');
        } catch (e) {
            dispatch({
                type: UserActionTypes.AUTHENTICATE_USER_ERROR,
                payload: {error: e.message},
            });
            history.push('/login');
        }
    };
}
