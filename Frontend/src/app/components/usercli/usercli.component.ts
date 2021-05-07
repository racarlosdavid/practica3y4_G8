import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/components/alquiler/alquiler.component';
import { peliculaService } from 'src/app/services/peliculaService/pelicula.service';
import { Pelicula,Pelicula2 } from 'src/app/models/pelicula';

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
      this.mostrarPeliculas();
  }

  datos: Articulo[] = [
    //Aqui van las peliculas que se van agregando al carrito
  ];
  resultadoConsulta:any=[];


  obtenerPeliculas(){
    //Consulto la api del aux para obtener las peliculas
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

          //Insertando las peliculas en la tabla aux
          this.peliculaService.savePelicula(peliculaAux).subscribe(
            res=>{
              //alert(res.message);
            },err=>{
              //alert(err.respuesta);
            }
          )
        }
      },err=>{
        //alert(err.respuesta);
      }
    );
    /*this.insertarPeliculas();
    this.actualizarPeliculas();*/
  }

  insertarPeliculas(){
    this.peliculaService.insertarPelicula().subscribe(
      res=> {
        //console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  actualizarPeliculas(){
    this.peliculaService.obtenerUltima().subscribe(
      res=> {
        //console.log(res);
        this.resultadoConsulta=res;
        for(let item of this.resultadoConsulta){
          var aux:Pelicula2 ={
            name:item.name,
            image:item.image,
            chargerate:item.chargerate,
            active:item.active
          }
          this.peliculaService.editarPelicula(aux).subscribe(
            res=>{
              //alert(res.message);
            },err=>{
              //alert(err.respuesta);
            }
          )
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  mostrarPeliculas(){
    this.obtenerPeliculas();
    this.insertarPeliculas();
    this.actualizarPeliculas();
  }

}
