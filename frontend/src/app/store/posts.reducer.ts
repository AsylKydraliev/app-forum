import { PostsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createPostsFailure,
  createPostsRequest,
  createPostsSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess
} from './posts.actions';

const initialState: PostsState = {
  posts: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true})),
  on(fetchPostsSuccess, (state, {posts}) => ({...state, fetchLoading: false, posts})),
  on(fetchPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createPostsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(createPostsSuccess, state  => ({...state, fetchLoading: false})),
  on(createPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
