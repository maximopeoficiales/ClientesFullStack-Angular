import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  cliente!: Cliente;
  fotoSeleccionado!: File;
  progreso: number = 0;
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id: number = +params['id'];
      if (id) {
        this.clienteService
          .getClient(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionado = event.target.files[0];
    // cuando seleccione la barra estara en oculta
    this.progreso = 0;
    console.log(this.fotoSeleccionado);
    if (this.fotoSeleccionado.type.indexOf('image') < 0) {
      swal.fire(
        `Error al seleccionar una imagen`,
        `El archivo debe de ser de tipo imagne`,
        'error'
      );
      this.fotoSeleccionado = null!;
    }
  }

  subirFoto() {
    if (this.fotoSeleccionado) {
      this.clienteService
        .subirFoto(this.fotoSeleccionado, this.cliente.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            // asi calculo el porcentaje que va
            this.progreso = Math.round((event.loaded / event.total!) * 100);
          } else if (event.type === HttpEventType.Response) {
            // guardo el cliente cuando el servidor responda
            let response: any = event.body;
            this.cliente = response.client as Cliente;
            swal.fire(
              `La foto se ha subido completamente`,
              `La foto se ha subido con exito ${this.cliente.photo}`,
              'success'
            );
          }
        });
    } else {
      swal.fire(`Error en el envio de foto`, `Seleccione una foto`, 'error');
    }
  }
}
