// @flow
import type State from '../reducers';

type GetState = () => State;
type Dispatch = (action: Action | ThunkAction | Promise<*>) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Action =
  | { type: 'AUTHENTICATE_PENDING' }
  | { type: 'AUTHENTICATE_FULFILLED', payload: { response: Promise<*>, username: string } }
  | { type: 'AUTHENTICATE_REJECTED', payload: Promise<*> };
