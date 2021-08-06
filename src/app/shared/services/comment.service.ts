import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly API_ENDPOINT = `${environment.apiUrl}/comments`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public listAllCommentsByBlog(blogId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.API_ENDPOINT}/${blogId}`);
  }

  public createComment(commentRequest: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.API_ENDPOINT, commentRequest);
  }
}
