import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  createPostsRequest,
  createPostsSuccess,
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
      catchError(() => {
        return of(fetchPostsFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  fetchPostById = createEffect(() => this.actions.pipe(
    ofType(fetchPostByIdRequest),
    mergeMap(id => this.postsService.getPostById(id._id).pipe(
      map(post => fetchPostByIdSuccess({post})),
      catchError(() => {
        return of(fetchPostByIdFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  createPost = createEffect(() => this.actions.pipe(
    ofType(createPostsRequest),
    mergeMap(({postData}) => this.postsService.createPost(postData).pipe(
      map(post => createPostsSuccess({post})),
      tap(() => {
        void this.router.navigate(['/']);
        this.snackbar.open('Post published', 'OK', {duration: 3000});
      }),
      catchError(() => {
        return of(fetchPostByIdFailure({error: 'Something went wrong!'}));
      })
    ))
  ))

  constructor(
    private postsService: PostsService,
    private actions: Actions,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
