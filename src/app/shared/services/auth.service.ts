import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public isAuthenticated = new BehaviorSubject<boolean>(false);
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public checkAuthenticated(): boolean {
      if (this.userSubject.value && this.userSubject.value.userName) {
        this.isAuthenticated.next(true);
        return true;
      }
      this.isAuthenticated.next(false);
      return false;
    }

    public fetchCurrentUser(): Observable<User> {
      if (this.user) {
        return this.user;
      }
      return null;
    }

    public login(userName: string, password: string): Observable<void> {
      const encryptedPassword = window.btoa(password);
      return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { userName, password: encryptedPassword })
            .pipe(map(user => {
                // adding loggedin user data in local storage to keep user logged in between page refreshes
                this.isAuthenticated.next(true);
                user.authdata = window.btoa(userName + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    public register(userName: string, password: string): Observable<void> {
      const encryptedPassword = window.btoa(password);
      return this.http.post<any>(`${environment.apiUrl}/users`, { userName, password: encryptedPassword })
            .pipe(map(user => {
                // adding loggedin user data in local storage to keep user logged in between page refreshes
                this.isAuthenticated.next(true);
                user.authdata = window.btoa(userName + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    public logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.isAuthenticated.next(false);
        this.router.navigate(['/login']);
    }
}
