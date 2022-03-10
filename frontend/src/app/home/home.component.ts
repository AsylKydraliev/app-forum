import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPostData } from '../models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { fetchPostByIdRequest, fetchPostsRequest } from '../store/posts.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  posts: Observable<ApiPostData[]>;
  loading: Observable<boolean>;
  apiUrl = environment.apiUrl;

  constructor(private store: Store<AppState>) {
    this.posts = store.select(state => state.posts.posts);
    this.loading = store.select(state => state.posts.fetchLoading)
  }

  ngOnInit(){
    this.store.dispatch(fetchPostsRequest());
  }
}
