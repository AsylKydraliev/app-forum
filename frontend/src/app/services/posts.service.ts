import { HttpClient } from '@angular/common/http';
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
    formData.append('description', postData.description);

    if (postData.image) {
      formData.append('image', postData.image);
    }
    return this.http.post(environment.apiUrl + '/posts', formData).subscribe();
  }
}
