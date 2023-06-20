import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IProduto } from '../models/produto.model';

@Injectable()
export class ProdutoService {

  private produtoBaseUrl = `${environment.baseUrl}/produtos`;

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoriaId : string) {
    return this.http.get(`${this.produtoBaseUrl}?idCategorias=${categoriaId}`);
  }

  findById(produtoId : number) {
    return this.http.get<IProduto>(`${this.produtoBaseUrl}/${produtoId}`);
  }
}
