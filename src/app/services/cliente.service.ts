import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ICliente } from '../models/cliente.model';

@Injectable()
export class ClienteService {

  private clienteBaseUrl = `${environment.baseUrl}/clientes`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  findByEmail(email: string) : Observable<ICliente> {

    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

    return this.http.get<ICliente>(
        `${this.clienteBaseUrl}/email?email=${email}`,
        {'headers': authHeader});
}
}
