import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HistorialcompraComponent } from './components/historialcompra/historialcompra.component';
import { PagoDePeliculasComponent } from './components/pago-de-peliculas/pago-de-peliculas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsercliComponent } from './components/usercli/usercli.component';
import { UseradminComponent } from './components/useradmin/useradmin.component';
import { MenuadminComponent } from './components/menuadmin/menuadmin.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RegistrouserComponent } from './components/registrouser/registrouser.component';

import { UsersService } from './services/Userservice/users.service';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    HistorialcompraComponent,
    PagoDePeliculasComponent,
    AlquilerComponent,
    LoginComponent,
    MenuComponent,
    UsercliComponent,
    UseradminComponent,
    MenuadminComponent,
    InventarioComponent,
    TransferenciaComponent,
    RegistrouserComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
