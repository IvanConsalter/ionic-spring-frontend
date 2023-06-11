import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from '../models/categoria.model';
import { environment } from '../environments/environment';

@Injectable()
export class CategoriaService {

  private categoriasBaseUrl = `${environment.baseUrl}/categoriass`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<ICategoria>> {
    return this.http.get<Array<ICategoria>>(`${this.categoriasBaseUrl}`);
  }
}
