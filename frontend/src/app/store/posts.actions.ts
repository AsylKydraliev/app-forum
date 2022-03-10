import { createAction, props } from '@ngrx/store';
import { ApiPostData, PostData } from '../models/post.model';

export const fetchPostsRequest = createAction('[Posts] Fetch Request');
export const fetchPostsSuccess = createAction('[Posts] Fetch Success', props<{posts: ApiPostData[]}>());
export const fetchPostsFailure = createAction('[Posts] Fetch Failure', props<{error: string}>());

export const createPostsRequest = createAction('[Posts] Create Request', props<{post: PostData}>());
export const createPostsSuccess = createAction('[Posts] Create Success');
export const createPostsFailure = createAction('[Posts] Create Failure', props<{error: {}}>());

export const fetchPostByIdRequest = createAction('[Posts] FetchById Request', props<{_id: string}>());
export const fetchPostByIdSuccess = createAction('[Posts] FetchById Success', props<{post: ApiPostData}>());
export const fetchPostByIdFailure = createAction('[Posts] FetchById Failure', props<{error: string}>());
