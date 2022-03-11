import { CommentsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comment.actions';

const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
};

export const commentsReducer = createReducer(
  initialState,
  on(fetchCommentsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCommentsSuccess, (state, {comments}) => ({...state, fetchLoading: false, comments})),
  on(fetchCommentsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createCommentRequest, state => ({...state, createLoading: true, createError: null})),
  on(createCommentSuccess, (state, {comment})  => ({...state, createLoading: false, comment})),
  on(createCommentFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
)
