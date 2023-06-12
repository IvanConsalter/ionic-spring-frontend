import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ICliente } from '../models/cliente.model';

@Injectable()
export class ClienteService {

  private clienteBaseUrl = `${environment.baseUrl}/clientes`;

  constructor(
    private http: HttpClient
  ) { }

  findByEmail(email: string) : Observable<ICliente> {
    return this.http.get<ICliente>(`${this.clienteBaseUrl}/email?email=${email}`);
}
}
