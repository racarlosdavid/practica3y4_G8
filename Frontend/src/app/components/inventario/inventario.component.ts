import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario'
import { InventarioService } from 'src/app/services/Inventario/inventario.service'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario = []
  dpi:number

  constructor(private lectura:InventarioService) {
    this.dpi = Number(localStorage.getItem('dpi'))
   }

  ngOnInit(): void {
    this.cargarPeliculas()
  }

  cargarPeliculas(){
    this.lectura.getInventario(this.dpi).subscribe((res) =>{
      let alquiler = <Inventario[]>res
      for(let item of alquiler){
        if(item.llave != null){
          this.inventario.push(item)
        }
      }
    })
  }
}