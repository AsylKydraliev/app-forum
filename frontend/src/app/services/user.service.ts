import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserData } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userData: UserData){
    return this.http.post(environment.apiUrl + '/users', userData);
  }
}
