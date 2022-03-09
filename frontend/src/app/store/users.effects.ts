import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { registerUsersFailure, registerUsersRequest, registerUsersSuccess } from './users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UsersEffects {
  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUsersRequest),
    mergeMap(({users}) => this.userService.registerUser(users).pipe(
      map(user => registerUsersSuccess({user})),
      tap(() => {
        this.snackbar.open('Register successful', 'OK', {duration: 3000});
        void this.router.navigate(['/']);
      }),
      catchError(requestError => {
        let registerError = null;

        if(requestError instanceof HttpErrorResponse && requestError.status === 400) {
          registerError = requestError.error;
        }else{
          this.snackbar.open('Server error', 'OK', {duration: 3000});
        }

        return of(registerUsersFailure({error: registerError}));
      })
    ))
  ))

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private actions: Actions
  ) {}
}