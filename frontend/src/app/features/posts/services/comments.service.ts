import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/comments';

  getCommentsByPost(
    postId: string,
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}?postId=${postId}`,
    );
  }

  createComment(
    comment: any,
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      comment,
    );
  }

  deleteComment(
    id: string,
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
    );
  }
}