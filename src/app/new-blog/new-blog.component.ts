import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../shared/model/blog';
import { BlogService } from '../shared/services/blog.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {
  form: FormGroup;
  blogData: Blog;
  userData: User;

  constructor(public blogService: BlogService,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit(): void {
    this.blogData = {
      title: '',
      content: '',
      userName: '',
      blogId: '',
      createdOn: ''
    };
  }

  get f(): any { return this.form.controls; }

  public onSubmit(): void {

    // fetching current user
    this.authService.fetchCurrentUser().subscribe((result: User) => {
      this.userData = result;
    });

    // assigning user data
    this.blogData.userName = this.userData.userName;

    this.blogService.createBlog(this.blogData).subscribe((result: Blog) => {
      this.blogData = result;
    });
    // routing back to home
    this.router.navigate(['home']);
  }

}
