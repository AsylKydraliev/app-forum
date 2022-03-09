import { RegisterError, User } from '../models/user.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError
};

export type AppState = {
  users: UserState
};
