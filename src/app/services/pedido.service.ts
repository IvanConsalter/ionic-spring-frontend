import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IPedido } from '../models/pedido.model';

@Injectable()
export class PedidoService {

  private pedidoBaseUrl = `${environment.baseUrl}/pedidos`;

  constructor(private http: HttpClient) {
  }

  insert(pedido: IPedido) {
      return this.http.post(
          `${this.pedidoBaseUrl}`,
          pedido,
          {
              observe: 'response',
              responseType: 'text'
          }
      );
  }
}
