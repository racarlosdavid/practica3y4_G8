import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialcompraComponent } from './components/historialcompra/historialcompra.component'
import { PagoDePeliculasComponent } from './components/pago-de-peliculas/pago-de-peliculas.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';


const routes: Routes = [
{
  path:'historial',
  component:HistorialcompraComponent
},
{
  path:'pago',
  component:PagoDePeliculasComponent
},
{
  path:'alquiler',
  component:AlquilerComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
