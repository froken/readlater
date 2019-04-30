import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {ReadItem} from '../models/read-item';
import readService from '../services/read-service';
import {List} from 'immutable';

// Action Type Enum
export enum ReadActionTypes {
    GET_READ_LIST = '[read] GET_READ_LIST',
    GET_READ_LIST_SUCCESS = '[read] GET_READ_LIST_SUCCESS',
    GET_READ_LIST_ERROR = '[read] GET_READ_LIST_ERROR',
}

// Action Interfaces
export interface IGetReadList extends Action {
    type: ReadActionTypes.GET_READ_LIST;
    payload: {};
}

export interface IGetReadListSuccess extends Action {
    type: ReadActionTypes.GET_READ_LIST_SUCCESS;
    payload: {
        readList: List<ReadItem>;
    };
}

export interface IGetReadListError extends Action {
    type: ReadActionTypes.GET_READ_LIST_ERROR;
    payload: {
        error: string;
    };
}

// Action Type
export type ReadAction = IGetReadList | IGetReadListError | IGetReadListSuccess;

// Action Creators
export function getReadList(d: ThunkDispatch<any, any, Action>) {
    return async (dispatch: ThunkDispatch<any, any, Action>) => {
        try {
            dispatch({type: ReadActionTypes.GET_READ_LIST});

            var list = await readService.getReadList();
            var action = {
                type: ReadActionTypes.GET_READ_LIST_SUCCESS,
                payload: {
                    readList: list,
                },
            };
            dispatch(action);
        } catch (e) {
            dispatch({
                type: ReadActionTypes.GET_READ_LIST_ERROR,
                payload: {error: e.message},
            });
        }
    };
}
