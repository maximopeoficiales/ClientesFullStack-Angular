import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';

//necesario para las rutas
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormBuilder, FormsModule } from '@angular/forms';

//cambiando el locale para fechas en español
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginatorNavComponent } from './components/paginator-nav/paginator-nav.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
registerLocaleData(localeES);

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'clientes/ver/:id', component: DetalleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorNavComponent,
    DetalleComponent,
  ],
  /* se agregan rutas al router */
  //se agrego http client
  // se agregos formsModule para manejegar formularios
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  /* aqui se registran los servicios globales */
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-US',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
