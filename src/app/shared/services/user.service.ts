import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';


@Injectable()
export class UserService {

  //Represents a value that changes over time. Observers can subscribe to it. (doc)
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }


  //Verify JWT in localstorage with server & load user's info
  //This runs once on application startup
  populate() {
    //If JWT detected, attempt to get and store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
        );
    }
    else {
      this.purgeAuth();
    }
  }


  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }


  attempAuth(type, credentials): Observable<User> {
    let route = (type == 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials })
      .map(data => {
        console.log(data.json());
        this.setAuth(data.json().user);
        return data;
      });
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
