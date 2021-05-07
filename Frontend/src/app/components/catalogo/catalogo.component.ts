import { Component, OnInit } from '@angular/core';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { alquilerService } from 'src/app/services/alquilerService/alquiler.service'
import { peliculaService } from 'src/app/services/peliculaService/pelicula.service';
import { Pelicula,Pelicula2,Idioma,Plan,Plan2 } from 'src/app/models/pelicula';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  inventario = [];
  lista =[];
  resultadoConsulta:any=[];
  
  constructor(private lectura:alquilerService,private peliculaService:peliculaService) {
  }

  ngOnInit(): void {
    //this.idioma();
    //this.mostrarPeliculas();
    this.cargarPeliculas();
  }

  cargarPeliculas(){
      this.lectura.getPelicula().subscribe((res)=>{
        let alquiler = <listaPelicula[]>res
        for(let item of alquiler){
          if (item.active==1){
            this.inventario.push(item)
          }  
        }
    })
  }

  /*obtenerIdioma(){
    this.peliculaService.obtenerIdioma().subscribe(
      res=>{
        //console.log(res);
        for(var i = 0; i < res.length; i++){
          var idiomaAux: Idioma={
            Code:res[i].Code,
            Description: res[i].Description,
          }
          //Insertando lenguajes en la tabla aux
          this.peliculaService.saveIdioma(idiomaAux).subscribe(
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
  insertarIdioma(){
    this.peliculaService.insertarIdioma().subscribe(
      res=> {
        //console.log(res);
      },
      err => {
        //console.log(err);
      }
    )
  }
  actualizarIdiomas(){
    this.peliculaService.obtenerUltimoIdioma().subscribe(
      res=> {
        //console.log(res);
        this.resultadoConsulta=res;
        for(let item of this.resultadoConsulta){
          var aux:Idioma ={
            Code:item.code,
            Description:item.descripcion,
          }
          this.peliculaService.editarLenguaje(aux).subscribe(
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
  }*/

  peliculaAux: Pelicula={
    id:0,
    name: '',
    image: '',
    chargerate: 0,
    active: 0,
    availabilities: null,
    languages: null
  }

  obtenerPeliculas(){
    //Consulto la api del aux para obtener las peliculas
    this.peliculaService.obtenerPelicula().subscribe(
      res=>{
        //console.log(res);
        for(var i = 0; i < res.length; i++){
          /*var peliculaAux: Pelicula={
            id:res[i].id,
            name: res[i].name,
            image: res[i].image,
            chargerate: res[i].chargeRate,
            active: Number(res[i].active),
            availabilities: res[i].availabilities,
            languages: res[i].languages
          }*/
          this.peliculaAux.id=res[i].id;
          this.peliculaAux.name= res[i].name;
          this.peliculaAux.image= res[i].image;
          this.peliculaAux.chargerate= res[i].chargeRate;
          this.peliculaAux.active= Number(res[i].active);
          this.peliculaAux.availabilities= res[i].availabilities;
          this.peliculaAux.languages= res[i].languages;

          //Insertando las peliculas en la tabla aux
          this.peliculaService.savePelicula(this.peliculaAux).subscribe(
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

  insertarPeliculas(){
    this.peliculaService.insertarPelicula().subscribe(
      res=> {
        console.log(res);
      },
      err => {
        //console.log(err);
      }
    )
  }

  nuevosDatos(peli:Pelicula2){
    this.peliculaService.editarPelicula(peli).subscribe(
      res=>{
        console.log(res.message);
        //alert(res.message);
      },err=>{
        //alert(err.respuesta);
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
          this.nuevosDatos(aux);
          /*this.peliculaService.editarPelicula(aux).subscribe(
            res=>{
              //alert(res.message);
            },err=>{
              //alert(err.respuesta);
            }
          )*/
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
    window.alert('Datos actualizados. Refresque la pagina para visualizar los cambios');
  }

  /*idioma(){
    this.obtenerIdioma();
    this.insertarIdioma();
    this.actualizarIdiomas();
  }*/

}
