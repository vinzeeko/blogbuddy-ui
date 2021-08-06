import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../shared/model/blog';
import { BlogService } from '../shared/services/blog.service';
import { CommentService } from '../shared/services/comment.service';
import { Comment } from '../shared/model/comment';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  public blogId: string;
  public blogData: Blog;
  public userData: User;
  public isAuthenticated: boolean;
  public commentsData: Comment[];
  public newCommentData: Comment;
  public displayedColumns: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService) {
    this.newCommentData = {
      comment: '',
      blogId: '',
      createdOn: '',
      userName: ''
    };
    this.displayedColumns = ['comment', 'userName'];
    this.blogId = this.route.snapshot.paramMap.get('blogId');
  }

  ngOnInit(): void {
    this.newCommentData.comment = '';
    this.newCommentData.blogId = this.blogId;

    // verify if the user is authenticated

    this.isAuthenticated = this.authService.checkAuthenticated();

    // loading blog data for view
    this.blogService.viewBlog(this.blogId).subscribe((result: Blog) => {
      this.blogData = result;
    });

    this.commentService.listAllCommentsByBlog(this.blogId).subscribe((result: Comment[]) => {
      this.commentsData = result;
    });

  }

  public onSubmit(): void {

    // fetching current user
    this.authService.fetchCurrentUser().subscribe((result: User) => {
      this.userData = result;
    });
    this.newCommentData.userName = this.userData.userName;
    this.commentService.createComment(this.newCommentData).subscribe((result: Comment) => {
      window.location.reload();
    });
  }

}
