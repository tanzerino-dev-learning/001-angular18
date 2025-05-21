import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({ providedIn: 'root' })
export class FuncionariosService {
  private apiUrl = 'https://localhost:7185/funcionario';

  constructor(private http: HttpClient) {}

  listar(params: any): Observable<any> {
    let query = new HttpParams();
    for (let key in params) {
      if (params[key] != null && params[key] !== '') {
        query = query.set(key, params[key]);
      }
    }

    return this.http.get<any>(this.apiUrl, { params: query });
  }
}


/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor() { }
}
*/