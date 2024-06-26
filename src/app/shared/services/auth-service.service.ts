import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = new BehaviorSubject<boolean>(false);
  baseUrl = 'https://reqres.in';

  constructor() { }

  setUserToken(token: any) {
    localStorage.setItem('userToken', 'custom_Token');
    this.isAuth.next(true) ;
    this.checkUserAuth();
  }
  setUserObj(userObj: any) {
    localStorage.setItem('userObj', JSON.stringify(userObj));
  }
  checkUserAuth():void {
    if (this.getUserToken()) {
      this.isAuth.next(true) ;
    }
  }
  getUserToken():string {
    return localStorage.getItem('userToken') as string;
  }
  getUserObj():any {
    if (localStorage.getItem('userObj')) {
      return JSON.parse(localStorage.getItem('userObj') || '')
    }
    return {};
  }

  isUserAuth():boolean {
    let isAuth = false
     this.isAuth.subscribe((res:boolean)=> {
      isAuth = res
     });
     if(isAuth) return true;else return false
  }

  

}
