import {Reducer} from 'redux';
import {ReadAction, ReadActionTypes} from '../actions/read-actions';
import {List} from 'immutable';
import {ReadItem} from '../models/read-item';

// State Definition
export interface IReadState {
    readList: List<ReadItem>;
}

// Initial State
export const initialReadState: IReadState = {
    readList: List<ReadItem>(),
};

// Reducer
export let reducer: Reducer<IReadState, ReadAction> = (
    state: IReadState = initialReadState,
    action: ReadAction
) => {
    switch (action.type) {
        case ReadActionTypes.GET_READ_LIST:
            return state;
        case ReadActionTypes.GET_READ_LIST_ERROR:
            return state;
        case ReadActionTypes.GET_READ_LIST_SUCCESS:
            return {
                ...state,
                readList: action.payload.readList,
            };
        default:
            return state;
    }
};
