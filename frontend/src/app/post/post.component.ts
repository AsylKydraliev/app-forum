import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { ApiPostData, Post } from '../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchPostByIdRequest } from '../store/posts.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent {
  post: Observable<ApiPostData | null>;
  loading: Observable<boolean>;
  postData!: ApiPostData;
  apiUrl = environment.apiUrl;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.post = store.select(state => state.posts.post);
    this.loading = store.select(state => state.posts.fetchLoading);
  }

  ngOnInit(){
    this.route.params.subscribe(post => {
      this.store.dispatch(fetchPostByIdRequest({_id: post['id']}));
    });
    this.post.subscribe(post => {
      this.postData = <ApiPostData>post;
    })
  }
}
