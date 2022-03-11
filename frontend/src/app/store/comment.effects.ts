import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { fetchPostsFailure } from './posts.actions';
import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comment.actions';
import { CommentsService } from '../services/comments.service';

@Injectable()
export class CommentsEffects {
  postId!: string;

  constructor(
    private commentsService: CommentsService,
    private actions: Actions,
  ) {}

  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(id => this.commentsService.getComments(id.id).pipe(
      map(comments => fetchCommentsSuccess({comments})),
      catchError(() => {
        return of(fetchPostsFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  createComment = createEffect(() => this.actions.pipe(
    ofType(createCommentRequest),
    mergeMap(({commentData}) => this.commentsService.createComment(commentData).pipe(
      map(comment => createCommentSuccess({comment})),
      catchError(() => {
        return of(createCommentFailure({error: 'Something went wrong!'}));
      })
    ))
  ))
}
