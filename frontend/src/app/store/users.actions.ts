import { createAction, props } from '@ngrx/store';
import { RegisterError, User, UserData } from '../models/user.model';

export const registerUsersRequest = createAction('[Users] Register Request', props<{users: UserData}>());
export const registerUsersSuccess = createAction('[Users] Register Success', props<{user: User}>());
export const registerUsersFailure = createAction('[Users] Register Failure', props<{error: null | RegisterError}>());
