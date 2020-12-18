import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css'],
})
export class DirectivaComponent {
  listCourses: string[] = ['TypeScript', 'Java', 'Php', 'Javascript'];
  habilitar: boolean = true;
  setHabilitar(): void {
    this.habilitar = this.habilitar ? false : true;
  }
}
