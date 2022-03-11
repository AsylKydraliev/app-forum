import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { ApiPostData } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { fetchPostByIdRequest } from '../store/posts.actions';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent {
  @ViewChild('f') form!: NgForm;
  post: Observable<ApiPostData | null>;
  loading: Observable<boolean>;
  postData!: ApiPostData;
  apiUrl = environment.apiUrl;
  user: Observable<User | null>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.user = store.select(state => state.users.user);
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
