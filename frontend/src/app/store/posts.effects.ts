import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  createPostsFailure,
  createPostsRequest,
  createPostsSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess
} from './posts.actions';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PostsEffects {
  fetchPosts = createEffect(() => this.actions.pipe(
    ofType(fetchPostsRequest),
    mergeMap(() => this.postsService.getPosts().pipe(
      map(posts => fetchPostsSuccess({posts})),
      catchError(requestError => {
        return of(fetchPostsFailure({error: 'Something went wrong!'}));
      })
    ))
  ));
  //
  // createPost = createEffect(() => this.actions.pipe(
  //   ofType(createPostsRequest),
  //   mergeMap(post => this.postsService.createPost({post}).pipe(
  //     map(() => createPostsSuccess()),
  //     tap(() => {
  //       this.snackbar.open('Register successful', 'OK', {duration: 3000});
  //       void this.router.navigate(['/']);
  //     }),
  //     catchError(requestError => {
  //       let registerError = null;
  //
  //       if(requestError instanceof HttpErrorResponse && requestError.status === 400) {
  //         registerError = requestError.error;
  //       }else{
  //         this.snackbar.open('Server error', 'OK', {duration: 3000});
  //       }
  //
  //       return of(createPostsFailure({error: registerError}));
  //     })
  //   ))
  // ))

  constructor(
    private postsService: PostsService,
    private actions: Actions,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
