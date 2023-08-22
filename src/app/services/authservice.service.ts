import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  isLoggedIn$ : Subject<boolean>;
  userName$ : Subject<string>;
  constructor(private _router: Router) {
    this.isLoggedIn$ = new BehaviorSubject<any>(window.localStorage.getItem('accesstoken') !== null);
    this.userName$ = new BehaviorSubject<any>('');
  }
  public login(userData: any){
    this.isLoggedIn$.next(true);
    window.localStorage.setItem('email', userData.email);
    this.userName$.next(userData.email)
    window.localStorage.setItem('accesstoken', userData.access_token);
    this._router.navigate(['/movies']);
  }

  public logout(){
    this.isLoggedIn$.next(false);
    this.userName$.next('');
    window.localStorage.removeItem('accesstoken');
    window.localStorage.removeItem('email');
    this._router.navigateByUrl('/')
  }
}
