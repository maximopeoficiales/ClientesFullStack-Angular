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
  errores: string[] = [];
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
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        swal.fire(
          'Nuevo Cliente',
          `Cliente ${cliente.nombre} ha sido registrado`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Error del servidor:' + err.status);
        console.log(this.errores);
      }
    );
  }
  update(): void {
    //  crea el cliente, luego le redirije
    this.clienteService.update(this.cliente).subscribe(
      (data: any) => {
        this.router.navigate(['/clientes']);
        console.log(data);

        swal.fire(
          'Cliente Actualizado',
          `Cliente ${data.client.nombre} ha sido actualizado`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Error del servidor:' + err.status);
        console.log(this.errores);
      }
    );
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
