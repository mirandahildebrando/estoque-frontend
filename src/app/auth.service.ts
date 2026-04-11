import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // SUBSTITUA PELA URL DO SEU RENDER
  private readonly API = 'https://seu-backend.onrender.com'; 

  constructor(private http: HttpClient) {}

  login(dados: any): Observable<any> {
    return this.http.post(`${this.API}/auth/login`, dados);
  }

  cadastrar(dados: any): Observable<any> {
    return this.http.post(`${this.API}/auth/register`, dados);
  }
}