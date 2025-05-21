import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({ providedIn: 'root' })
export class FuncionariosService {
  private apiUrl = 'https://localhost:7185/funcionario';

  constructor(private http: HttpClient) {}

  listar(params: any): Observable<any> {
    let queryParams = new HttpParams();
    for (const key in params) {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]);
      }
    }

    return this.http.get<any>(this.apiUrl, { params: queryParams });
  }
}
