import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from './models/user.model';
import { logoutUserRequest } from './store/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{
  user: Observable<null | User>;
  userData!: User;
  userSubc!: Subscription;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit()  {
    this.userSubc = this.user.subscribe(user => {
      this.userData = <User>user;
    })
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  ngOnDestroy(){
    this.userSubc.unsubscribe();
  }
}
