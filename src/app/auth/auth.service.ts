import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshtoken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEol81V17s6LbXmmprGqOKfNBcPmPcwf8',
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEol81V17s6LbXmmprGqOKfNBcPmPcwf8',
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'email not found';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'incorrect credentials';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
