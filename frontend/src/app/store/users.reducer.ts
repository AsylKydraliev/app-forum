import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  loginUsersFailure,
  loginUsersRequest,
  loginUsersSuccess, logoutUser,
  registerUsersFailure,
  registerUsersRequest,
  registerUsersSuccess
} from './users.actions';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};

export const userReducer = createReducer(
  initialState,
  on(registerUsersRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUsersSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUsersFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),

  on(loginUsersRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUsersSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUsersFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),

  on(logoutUser, state => ({...state, user: null})),
)
