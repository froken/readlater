
import { Reducer } from "redux";
import { UserAction, UserActionTypes } from "../actions/user-actions";
import { UserAccount } from "../models/user-account";

// State Definition
export interface IUserState {
    userAccount: UserAccount | undefined,
    isAuthenticated: boolean
};

// Initial State
export const initialUserState: IUserState = {
    userAccount: undefined,
    isAuthenticated: false
};

// Reducer
export let reducer: Reducer<IUserState, UserAction> = 
    (state: IUserState = initialUserState, action: UserAction) => {
        switch (action.type) {
            case UserActionTypes.REGISTER_USER_SUCCESS:
                return { ...state, userName: action.payload.user.userName };
            case UserActionTypes.LOGIN_USER_SUCCESS:
                return { ...state, userName: action.payload.userName };
            case UserActionTypes.AUTHENTICATE_USER_SUCCESS:
                return { ...state, userAccount: action.payload.userAccount, isAuthenticated: true };
            case UserActionTypes.AUTHENTICATE_USER_ERROR:
                return { ...state, userName: undefined, isAuthenticated: false };
            default:
                return state;
        }
    };