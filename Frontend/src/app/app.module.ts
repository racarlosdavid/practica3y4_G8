import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HistorialcompraComponent } from './components/historialcompra/historialcompra.component';
import { PagoDePeliculasComponent } from './components/pago-de-peliculas/pago-de-peliculas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HistorialcompraComponent,
    PagoDePeliculasComponent,
    AlquilerComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
