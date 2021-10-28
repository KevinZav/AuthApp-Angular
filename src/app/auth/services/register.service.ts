import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createAuth, createUser, User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { authResponse } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    const url = `${this.baseUrl}api/users`;
    return this.http.post<createUser>(url, user)
      .pipe(
        switchMap((resp: createUser) => this.getTokenPublic(resp.newUser.email)),
        tap((resp: authResponse) => this.saveJWTPublic(resp.token)),
        map((resp: authResponse) => resp.token ? true : false),
        catchError(_ => of(false)),
      );
  }

  getTokenPublic(email: string): Observable<authResponse> {
    return this.http.get<authResponse>(`${this.baseUrl}api/users/token-auth/${email}`);
  }

  saveJWTPublic(token: string) {
    localStorage.setItem('token-public', token);
  }



  createAuth(username: string, password: string) {
    const tokenPublic = localStorage.getItem('token-public') || '';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${tokenPublic}`
      }),
    }
    return this.http.post<createAuth>(`${this.baseUrl}api/users/create-auth`,
      {username, password}, httpOptions)
      .pipe(
        map( (resp: createAuth) => (resp.user) ? true : false),
        tap((resp: boolean) => {
          if (resp) localStorage.removeItem('token-public')
        }),
        catchError(_ => of(false)),
      )
  }
}
