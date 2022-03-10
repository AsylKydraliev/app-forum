import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginUserData, User, UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userData: UserData){
    return this.http.post<User>(environment.apiUrl + '/users', userData);
  }

  loginUser(userData: LoginUserData){
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }
}
