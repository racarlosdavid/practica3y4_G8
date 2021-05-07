import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Import de rutas
import { API_URL, API_URL_AUX } from '../URL';
//Import del modelo de dato alquiler
import { Pelicula,Pelicula2,Idioma,Plan,Plan2 } from '../../models/pelicula'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class peliculaService {
  //Se obtiene la ruta
  API_URI = API_URL;
  API_AUX = API_URL_AUX+'/Movie';
  API_AUX2 = API_URL_AUX+'/Language';
  API_AUX3 = API_URL_AUX+'/Availability';
  

  constructor(private http: HttpClient) { }

  //Se indican las cabeceras para indicar el tipo de dato del recurso
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  obtenerPelicula(): Observable<any> {
    return this.http.get(`${this.API_AUX}`);
  }
  
  obtenerIdioma(): Observable<any> {
    return this.http.get(`${this.API_AUX2}`);
  }
  
  //Método para inserción de pelicula temporal
  savePelicula(pelicula: Pelicula): Observable<any>
  {
    return this.http.post(`${this.API_URI}/tablaTemporal`, pelicula);
  }
  //Método para inserción de idioma temporal
  saveIdioma(idioma: Idioma): Observable<any>
  {
    return this.http.post(`${this.API_URI}/temporalLenguaje`, idioma);
  }

  insertarPelicula(): Observable<any>
  {
    return this.http.post(`${this.API_URI}/crearPelicula`, null);
  }
  insertarIdioma(): Observable<any>
  {
    return this.http.post(`${this.API_URI}/crearLenguaje`, null);
  }

  obtenerUltima(){
    return this.http.get(`${this.API_URI}/ultimaIteracion`);
  }
  obtenerUltimoIdioma(){
    return this.http.get(`${this.API_URI}/ultimoLenguaje`);
  }

  editarPelicula(pelicula: Pelicula2): Observable<any>
  {
    return this.http.post(`${this.API_URI}/editarPelicula`, pelicula);
  }
  editarLenguaje(idioma: Idioma): Observable<any>
  {
    return this.http.post(`${this.API_URI}/editarLenguaje`, idioma);
  }

}
