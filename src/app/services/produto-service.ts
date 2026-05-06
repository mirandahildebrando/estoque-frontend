import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  private readonly API = 'https://kronos-api-ck9x.onrender.com/products';

  constructor(private http: HttpClient) {}

  listar() {
  return this.http.get<any[]>(this.API);
}

criar(produto: any) {
  return this.http.post(this.API, produto);
}

atualizar(produto: any) {
  return this.http.put(`${this.API}/${produto.id}`, produto);
}

deletar(id: number) {
  return this.http.delete(`${this.API}/${id}`);
}
}