import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  fetchPostByIdFailure,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess
} from './posts.actions';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  fetchPostById = createEffect(() => this.actions.pipe(
    ofType(fetchPostByIdRequest),
    mergeMap(id => this.postsService.getPostById(id._id).pipe(
      map(post => fetchPostByIdSuccess({post})),
      catchError(requestError => {
        return of(fetchPostByIdFailure({error: 'Something went wrong!'}));
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
