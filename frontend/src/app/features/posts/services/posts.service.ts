import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/posts';

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPostById(
    id: string,
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`,
    );
  }

  createPost(
    post: Partial<Post>,
  ): Observable<any> {
    return this.http.post(
      this.apiUrl,
      post,
    );
  }

  updatePost(
    id: string,
    post: Partial<Post>,
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      post,
    );
  }

  deletePost(
    id: string,
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
    );
  }

  bulkCreatePosts(
    posts: Partial<Post>[],
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/bulk`,
      posts,
    );
  }
}