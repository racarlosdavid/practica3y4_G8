import { Component, OnInit } from '@angular/core';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { alquilerService } from 'src/app/services/alquilerService/alquiler.service'
import { peliculaService } from 'src/app/services/peliculaService/pelicula.service';
import { Pelicula,Pelicula2 } from 'src/app/models/pelicula';

@Component({
  selector: 'app-catadmin',
  templateUrl: './catadmin.component.html',
  styleUrls: ['./catadmin.component.css']
})
export class CatadminComponent implements OnInit {

  inventario = [];
  lista =[];
  npelicula2:any=[];
  resultadoConsulta:any=[];
  
  constructor(private lectura:alquilerService,private peliculaService:peliculaService) {
  }

  ngOnInit(): void {
    this.mostrarPeliculas();
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
  }

  insertarPeliculas(){
    this.peliculaService.insertarPelicula().subscribe(
      res=> {
        console.log(res);
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
