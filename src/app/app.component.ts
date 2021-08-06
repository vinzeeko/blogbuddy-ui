import { Component, OnInit } from '@angular/core';
import { User } from './shared/model/user';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blogbuddy';
  isAuthenticated = false;
  user!: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.checkAuthenticated();
  }

  public logout(): void {
    this.authService.logout();
  }

  public register(): void {
    this.router.navigate(['register']);
  }

  public createNewBlog(): void {
    this.router.navigate(['new-blog']);
  }
}
