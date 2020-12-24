import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';
  // activatedRoute necesario para obtener parametros url
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }
  create(): void {
    //  crea el cliente, luego le redirije
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      swal.fire(
        'Nuevo Cliente',
        `Cliente ${cliente.nombre} ha sido registrado`,
        'success'
      );
    });
  }
  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getClient(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }
}
