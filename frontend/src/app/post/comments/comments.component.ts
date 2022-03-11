import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { CommentClass, CommentData } from '../../models/comment.model';
import { createCommentRequest, fetchCommentsRequest } from '../../store/comment.actions';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  comments: Observable<CommentClass[] | null>;
  loading: Observable<boolean>;
  user: Observable<User | null>;
  userObj!: User | null;
  comment!: CommentData;
  postId!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.comments = store.select(state => state.comments.comments);
    this.loading = store.select(state => state.posts.fetchLoading);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(){
    this.route.params.subscribe(post => {
      this.postId = post['id'];
      this.store.dispatch(fetchCommentsRequest({id: post['id']}))
    });

    this.user.subscribe(user => {
      this.userObj = user;
    });
  }

  onSubmit() {
    this.comment = {
      text: this.form.value.text,
      token: <string>this.userObj?.token,
      user: <string>this.userObj?._id,
      post: this.postId
    }

    this.store.dispatch(createCommentRequest({commentData: this.comment}));
    this.store.dispatch(fetchCommentsRequest({id: this.comment.post}));
  }
}
