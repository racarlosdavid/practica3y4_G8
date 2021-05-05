import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/components/alquiler/alquiler.component';

@Component({
  selector: 'app-usercli',
  templateUrl: './usercli.component.html',
  styleUrls: ['./usercli.component.css']
})
export class UsercliComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      //Aqui van las peliculas que se van agregando al carrito
      localStorage.setItem('listaDatos', JSON.stringify(this.datos));
  }

  datos: Articulo[] = [
    //Aqui van las peliculas que se van agregando al carrito
  ];

}
