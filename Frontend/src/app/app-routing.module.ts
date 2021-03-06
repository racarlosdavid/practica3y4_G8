import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialcompraComponent } from './components/historialcompra/historialcompra.component'
import { PagoDePeliculasComponent } from './components/pago-de-peliculas/pago-de-peliculas.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { LoginComponent } from './components/login/login.component';
import { UsercliComponent } from './components/usercli/usercli.component';
import { UseradminComponent } from './components/useradmin/useradmin.component';
import { InventarioComponent } from './components/inventario/inventario.component'
import { TransferenciaComponent } from './components/transferencia/transferencia.component'
import { RegistrouserComponent } from './components/registrouser/registrouser.component';
import { Catalogo2Component } from './components/catalogo2/catalogo2.component';
import { CatadminComponent } from './components/catadmin/catadmin.component';
import { HistorialAdminComponent } from './components/historial-admin/historial-admin.component';


const routes: Routes = [
{
  path:'historial',
  component:HistorialcompraComponent
},
{
  path:'historialAdmin',
  component:HistorialAdminComponent
},
{
  path:'pago',
  component:PagoDePeliculasComponent
},
{
  path:'alquiler',
  component:AlquilerComponent
},
{
  path:'',
  component:LoginComponent
},
{
  path:'cliente',
  component:UsercliComponent
},
{
  path:'admin',
  component:UseradminComponent
},
{
  path: 'inventario',
  component: InventarioComponent
},
{
  path: 'transferencia',
  component: TransferenciaComponent
},
{
  path: 'registro',
  component: RegistrouserComponent
},
{
  path: 'catalogo',
  component: Catalogo2Component
},
{
  path: 'catadmin',
  component: CatadminComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
