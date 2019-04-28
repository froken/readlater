import { combineReducers, Reducer } from "redux";
import * as UserReducer from "./user-reducer";
import * as PocketReducer from "./pocket-reducer";

// Root State Definition
export interface IRootState {
    userState: UserReducer.IUserState,
    pocketState: PocketReducer.IPocketState
}

// Initial State
export const initialState: IRootState = {
    userState: UserReducer.initialUserState,
    pocketState: PocketReducer.initialPocketState
}

// Reducer
export const reducer: Reducer<IRootState> = combineReducers<IRootState>({
    userState: UserReducer.reducer,
    pocketState: PocketReducer.reducer
});