import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { registerUsersRequest } from '../store/users.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | RegisterError>;
  errorSubscription!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.users.registerLoading);
    this.error = store.select(state => state.users.registerError);
  }

  ngAfterViewInit() {
    this.errorSubscription = this.error.subscribe(error => {
      if(error){
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
      }else{
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  onSubmit() {
    const userData = this.form.value;
    this.store.dispatch(registerUsersRequest({users: userData}));
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }
}
