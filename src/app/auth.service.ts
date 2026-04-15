import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API = 'https://kronos-api-ck9x.onrender.com'; 

  constructor(private http: HttpClient) {}

  login(dados: any): Observable<any> {
    return this.http.post(`${this.API}/login`, dados);
  }

  cadastrar(dados: any): Observable<any> {
    return this.http.post(`${this.API}/users`, dados);
  }
}