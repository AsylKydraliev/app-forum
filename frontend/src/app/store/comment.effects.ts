import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
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
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { CommentApi } from '../models/comment.model';

@Injectable()
export class CommentsEffects {
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
      tap(() => {
        this.store.dispatch(fetchCommentsRequest({id: this.id}))
      }),
      catchError(() => {
        return of(createCommentFailure({error: 'Something went wrong!'}));
      })
    ))
  ))

  id!: string;
  comments!: Observable<CommentApi[] | null>;

  constructor(
    private commentsService: CommentsService,
    private actions: Actions,
    private store: Store<AppState>
  ) {
    this.comments = store.select(state => state.comments.comments)
    this.comments.subscribe(item => {
      item?.forEach(comment => {
        this.id = comment.post;
      })
    })
  }
}
