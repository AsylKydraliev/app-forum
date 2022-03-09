import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import { registerUsersFailure, registerUsersRequest, registerUsersSuccess } from './users.actions';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null
};

export const userReducer = createReducer(
  initialState,
  on(registerUsersRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUsersSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUsersFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),
)
