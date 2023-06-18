import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IEstado } from '../models/estado.model';
import { ICidade } from '../models/cidade.model';

@Injectable()
export class EstadoService {

  private estadoBaseUrl = `${environment.baseUrl}/estados`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<IEstado>> {
    return this.http.get<Array<IEstado>>(`${this.estadoBaseUrl}`);
  }

  findCidadeByEstado(estadoId: number): Observable<Array<ICidade>> {
    return this.http.get<Array<ICidade>>(`${this.estadoBaseUrl}/${estadoId}/cidades`);
  }
}
