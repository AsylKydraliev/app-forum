import { LoginError, RegisterError, User } from '../models/user.model';
import { ApiPostData } from '../models/post.model';
import { CommentApi } from '../models/comment.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError
};

export type PostsState = {
  post: null | ApiPostData,
  posts: ApiPostData[],
  fetchLoading: boolean,
  fetchError: null | {},
  createLoading: boolean,
  createError: null | {}
};

export type CommentsState = {
  comments: null | CommentApi[],
  fetchLoading: boolean,
  fetchError: null | {},
  createLoading: boolean,
  createError: null | {}
}

export type AppState = {
  users: UserState,
  posts: PostsState,
  comments: CommentsState
};
