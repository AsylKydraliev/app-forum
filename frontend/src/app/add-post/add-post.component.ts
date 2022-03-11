import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../store/types';
import { Store } from '@ngrx/store';
import { createPostsRequest } from '../store/posts.actions';
import { PostData } from '../models/post.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.sass']
})
export class AddPostComponent {
  @ViewChild('f') form!: NgForm;
  user: Observable<User | null>;
  newUser!: User;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.posts.createLoading);
    this.user.subscribe(user => {
      this.newUser = <User>user;
    });
  }

  onSubmit() {
    const postData = this.form.value;
    const post: PostData = {
      title: postData.title,
      description: postData.description,
      image: postData.image,
      user: {
        _id: this.newUser._id,
        name: this.newUser.name,
        token: this.newUser.token
      }
    }
    this.store.dispatch(createPostsRequest({postData: post}));
  }
}
