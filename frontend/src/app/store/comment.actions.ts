import { createAction, props } from '@ngrx/store';
import { CommentApi, CommentData } from '../models/comment.model';

export const fetchCommentsRequest = createAction('[Comments] Fetch Request', props<{id: string}>());
export const fetchCommentsSuccess = createAction('[Comments] Fetch Success', props<{comments: CommentApi[]}>());
export const fetchCommentsFailure = createAction('[Comments] Fetch Failure', props<{error: string}>());

export const createCommentRequest = createAction(
  '[Comments] Create Request',
  props<{commentData: CommentData}>()
);
export const createCommentSuccess = createAction('[Comments] Create Success', props<{comment: CommentApi}>());
export const createCommentFailure = createAction('[Comments] Create Failure', props<{error: {}}>());

