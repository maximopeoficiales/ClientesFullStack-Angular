import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator-nav.component.html',
})
export class PaginatorNavComponent implements OnInit {
  @Input() paginador: any;
  paginas: number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages)
      .fill(0)
      .map((_valor, index) => index + 1);
  }
}
