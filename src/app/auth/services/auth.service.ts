import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { authResponse } from '../interfaces/auth.interface';
import { Auth } from '../interfaces/user.interface';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private _auth!: Auth;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const url = `${this.baseUrl}api/auth/login`;
    const body = { username, password };

    return this.http.post<authResponse>(url, body)
      .pipe(
        tap((resp: authResponse) => this.saveJWT(resp.token) ),
        switchMap( (resp: authResponse) => this.getAuthByToken(resp.token)),
        tap((auth: Auth) => this._auth = auth),
        map((auth: Auth) => auth ? true : false),
        catchError(_ => of(false))
      );
  }

  getAuthByToken(token: string): Observable<Auth> {
    const url = `${this.baseUrl}api/auth`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    return this.http.get<Auth>(url, httpOptions );
  }

  get auth() {
    return this._auth;
  }

  validateToken() {
    const token = localStorage.getItem('token') || '';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };

    return this.http.get<authResponse>(`${this.baseUrl}api/auth/renew-token`,httpOptions)
      .pipe(
        tap((resp: authResponse) => this.saveJWT(resp.token) ),
        switchMap((resp: authResponse) => this.getAuthByToken(resp.token)),
        tap( (auth: Auth) => this._auth = auth ),
        map( (auth: Auth) => auth ? true : false ),
        catchError(_ => of(false)),
      );
  }

  saveJWT(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
