import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiPostData, Post, PostData } from '../models/post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(){
    return this.http.get<Post[]>(environment.apiUrl + '/posts').pipe(
        map(response => {
          return response.map(post => {
            return new ApiPostData(
              post._id,
              post.title,
              post.user,
              post.date,
              post.description,
              post.image,
            );
          });
        })
    );
  }

  getPostById(id: string){
    return this.http.get<Post>(environment.apiUrl + '/posts/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

  createPost(postData: PostData){
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('user', postData.user._id);

    if (postData.image) {
      formData.append('image', postData.image);
    }

    if (postData.description) {
      formData.append('description', postData.description);
    }

    return this.http.post<Post>(environment.apiUrl + '/posts', formData, {
      headers: new HttpHeaders({'Authorization': postData.user.token})
    });
  }
}
