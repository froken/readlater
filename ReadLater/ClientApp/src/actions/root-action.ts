import { Action } from 'redux';

export interface IRootAction extends Action {
    type: 'ROOT_ACTION';
}

export type RootAction = IRootAction;