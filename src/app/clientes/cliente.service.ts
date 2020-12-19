import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
// import { clientesData } from './ClienteData';
import { Observable, of } from 'rxjs';
//ncesaria para las peticiones
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
//indica que es service
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //se inyecto http client http://localhost:8080/api/clientes
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient) {}
  getClients(): Observable<Cliente[]> {
    // patron observable , of convierte a string nuestra data
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Cliente[]));
  }
}
