import { RegisterError, User } from '../models/user.model';
import { ApiPostData, Post } from '../models/post.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError
};

export type PostsState = {
  posts: ApiPostData[],
  fetchLoading: boolean,
  fetchError: null | {},
  createLoading: boolean,
  createError: null | {}
};

export type AppState = {
  users: UserState,
  posts: PostsState
};
