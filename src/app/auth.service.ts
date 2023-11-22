import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { LoginResponse } from './models/login_model';
import { API_BASE_URL } from './base/base_url';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginInProgress: boolean = false;
  constructor(private http: HttpClient,  private router: Router) { }
  private apiUrl = `${API_BASE_URL}login/`;
  

  login(credentials: any): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<LoginResponse>(this.apiUrl, credentials, httpOptions);
    
  }
}
