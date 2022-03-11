import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { CommentApi, CommentClass, CommentData } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(id: string){
    return this.http.get<CommentApi[]>(environment.apiUrl + '/comments?post=' + id).pipe(
      map(response => {
        return response.map(comments => {
          return new CommentClass(
            comments._id,
            comments.post,
            comments.user,
            comments.text
          );
        });
      })
    );
  }

  createComment(comment: CommentData){
    return this.http.post<CommentApi>(environment.apiUrl + '/comments', comment, {
      headers: new HttpHeaders({'Authorization': comment.token})
    });
  }
}
