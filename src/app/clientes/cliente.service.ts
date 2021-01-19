import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
// import { clientesData } from './ClienteData';
//ncesaria para las peticiones
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// necesario para el formateo de fechas
import { formatDate, DatePipe } from '@angular/common';
//indica que es service
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //se inyecto http client http://localhost:8080/api/clientes
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}
  getClients(page: number): Observable<any> {
    // patron observable , of convierte a string nuestra data
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http
      .get(`${this.urlEndPoint}/page/${page}`)
      .pipe(map((response: any) => response));
  }

  //header necesario para especificar que es un json
  //se modifico el backend y ahora
  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.client as Cliente),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.msg);
          Swal.fire(e.error.msg, this.getMessages(e.error), 'error');
          return throwError(e);
        })
      );
  }

  getClient(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.msg);
        Swal.fire('Error al Editar', e.error.msg, 'error');
        return throwError(e);
      })
    );
  }

  update(client: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${client.id}`, client, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            //la vista lo captura y podra manejar este objeto
            return throwError(e);
          }
          console.error(e.error.msg);
          Swal.fire(e.error.msg, this.getMessages(e.error), 'error');
          return throwError(e);
        })
      );
  }
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.msg);
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getMessages(e: any) {
    if (e.errors) {
      return e.errors
        .map((e: any) => e.defaultMessage)
        .reduce((a: any, b: any) => `<p>${a}</p><p>${b}</p>`);
    } else {
      return e.error;
    }
  }
}
