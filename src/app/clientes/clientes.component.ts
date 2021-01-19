import { Component, OnInit } from '@angular/core';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  paginador: any;
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  // cuando inicia el component
  ngOnInit(): void {
    // se suscribio para obtener los parametros
    this.activatedRoute.params.subscribe((params) => {
      let page: number = +params['page'];
      console.log(page);
      if (!page) {
        page = 0;
      }

      this.clienteService.getClients(page).subscribe((response: any) => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    });
  }
  delete(client: Cliente): void {
    swal
      .fire({
        title: '¿Esta seguro de borrarlo?',
        text: 'Este borrado es irrevertible!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero borrarlo!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(client.id).subscribe((e) => {
            this.clientes = this.clientes.filter((cli) => cli.id !== client.id);
            swal.fire(
              'Borrado!',
              `El usuario ${client.nombre} ha sido borrado`,
              'success'
            );
          });
        }
      });
  }
}
