import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.staging';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_Key}`,{
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      catchError(this.handleError),
      tap(resData =>{
        this.handleAuthentication(resData);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_Key}`,{
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      catchError(this.handleError),
      tap(resData =>{
        this.handleAuthentication(resData);
    }));
  }

  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logOut();
    }, expirationDuration);
  }

  private handleAuthentication(resData: AuthResponseData){
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate);
    this.user.next(user);
    this.autoLogOut(resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }



  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      };
      console.log(errorRes.error)
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'this  email exists already.';
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist.';
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.'; 
      }
      return throwError(errorMessage);
  }
}

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}