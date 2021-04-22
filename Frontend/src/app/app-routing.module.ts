import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialcompraComponent } from './components/historialcompra/historialcompra.component'

const routes: Routes = [
{
  path:'historial',
  component:HistorialcompraComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
