import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly API_ENDPOINT = `${environment.apiUrl}/blogs`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public listAllBlogs(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(this.API_ENDPOINT);
  }

  public listAllBlogsByUser(userName: string): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(`${this.API_ENDPOINT}?userName=${userName}`);
  }

  public viewBlog(blogId: string): Observable<Blog> {
    return this.httpClient.get<Blog>(`${this.API_ENDPOINT}/${blogId}`);
  }

  public createBlog(blogRequest: Blog): Observable<Blog> {
    return this.httpClient.post<Blog>(this.API_ENDPOINT, blogRequest);
  }

}
