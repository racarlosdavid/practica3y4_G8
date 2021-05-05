import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/components/alquiler/alquiler.component';
import { peliculaService } from 'src/app/services/peliculaService/pelicula.service';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-usercli',
  templateUrl: './usercli.component.html',
  styleUrls: ['./usercli.component.css']
})
export class UsercliComponent implements OnInit {

  constructor(private peliculaService:peliculaService) { }

  ngOnInit(): void {
      //Aqui van las peliculas que se van agregando al carrito
      localStorage.setItem('listaDatos', JSON.stringify(this.datos));
      //this.obtenerPeliculas();
  }

  datos: Articulo[] = [
    //Aqui van las peliculas que se van agregando al carrito
  ];


  obtenerPeliculas(){
    //Consulto la api del aux para obtener el tipo de cambio actual.
    this.peliculaService.obtenerPelicula().subscribe(
      res=>{
        //console.log(res);
        for(var i = 0; i < res.length; i++){
          var peliculaAux: Pelicula={
            id:res[i].id,
            name: res[i].name,
            image: res[i].image,
            chargerate: res[i].chargeRate,
            active: Number(res[i].active),
            availabilities: res[i].availabilities,
            languages: res[i].languages
          }
          //console.log(peliculaAux);
          this.peliculaService.savePelicula(peliculaAux).subscribe(
            res=>{
              //alert(res.message);
            },err=>{
              //alert(err.respuesta);
            }
          )
        }
      },err=>{
        alert(err.respuesta);
      }
    );
  }



}
