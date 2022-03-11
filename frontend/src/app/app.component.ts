import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/types';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { logoutUser } from './store/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  user: Observable<null | User>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  logout(){
    this.store.dispatch(logoutUser());
  }
}
