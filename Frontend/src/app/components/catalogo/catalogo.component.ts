import { Component, OnInit } from '@angular/core';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { alquilerService } from 'src/app/services/alquilerService/alquiler.service'

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  inventario = [];
  lista =[];
  npelicula2:any=[];
  
  constructor(private lectura:alquilerService) {
  }

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(){
      this.lectura.getPelicula().subscribe((res)=>{
        let alquiler = <listaPelicula[]>res
        for(let item of alquiler){
            this.inventario.push(item)
        }
    })
  }

}
