import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator-nav.component.html',
})
export class PaginatorNavComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  paginas: number[] = [];

  desde!: number;
  hasta!: number;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginador'];
    // si el valor a siedo actualizado
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  ngOnInit(): void {
    this.initPaginator();
  }
  initPaginator(): void {
    // numero 4 porque son los resultados que imprime el api
    this.desde = Math.min(
      Math.max(1, this.paginador.number - 4),
      this.paginador.totalPages - 5
    );
    this.hasta = Math.max(
      Math.min(this.paginador.totalPages, this.paginador.number + 4),
      6
    );
    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((_valor, index) => index + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages)
        .fill(0)
        .map((_valor, index) => index + 1);
    }
  }
}
