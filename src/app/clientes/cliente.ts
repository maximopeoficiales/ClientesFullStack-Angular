export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  createdAt: string;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    createdAt: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.createdAt = createdAt;
  }
}
