import { combineReducers, Reducer } from "redux";
import * as ReadReducer from "./read-reducer";
import * as UserReducer from "./user-reducer";
import * as PocketReducer from "./pocket-reducer";

// Root State Definition
export interface IRootState {
    readState: ReadReducer.IReadState,
    userState: UserReducer.IUserState,
    pocketState: PocketReducer.IPocketState
}

// Initial State
export const initialState: IRootState = {
    readState: ReadReducer.initialReadState,
    userState: UserReducer.initialUserState,
    pocketState: PocketReducer.initialPocketState
}

// Reducer
export const reducer: Reducer<IRootState> = combineReducers<IRootState>({
    readState: ReadReducer.reducer,
    userState: UserReducer.reducer,
    pocketState: PocketReducer.reducer
});