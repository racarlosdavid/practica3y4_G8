import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario'
import { InventarioService } from 'src/app/services/Inventario/inventario.service'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario:any
  dpi:number

  constructor(private lectura:InventarioService) {
    this.dpi = 1
   }

  ngOnInit(): void {
    this.cargarPeliculas()
  }

  cargarPeliculas(){
    this.lectura.getInventario(this.dpi).subscribe((res) =>{
      this.inventario = <Inventario[]>res
    })
  }
}