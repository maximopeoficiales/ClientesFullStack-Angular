import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { clientesData } from './ClienteData';
import { Observable, of } from 'rxjs';
//indica que es service
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}
  getClients(): Observable<Cliente[]> {
    // patron observable , of convierte a string nuestra data
    return of(clientesData);
  }
}
