import { Injectable } from '@angular/core';
import { Cliente } from './cliente';

import { clientesData } from './ClienteData';
//indica que es service
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}
  getClients(): Cliente[] {
    return clientesData;
  }
}
