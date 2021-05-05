import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Import de rutas
import { API_URL, API_URL_AUX } from '../URL';
//Import del modelo de dato alquiler
import { Pelicula,Pelicula2 } from '../../models/pelicula'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class peliculaService {
  //Se obtiene la ruta
  API_URI = API_URL;
  API_AUX = API_URL_AUX+'/Movie';

  constructor(private http: HttpClient) { }

  //Se indican las cabeceras para indicar el tipo de dato del recurso
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //Método para inserción de nuevo alquiler
  savePelicula(pelicula: Pelicula): Observable<any>
  {
    return this.http.post(`${this.API_URI}/tablaTemporal`, pelicula);
  }
  
  obtenerPelicula(): Observable<any> {
    return this.http.get(`${this.API_AUX}`);
  }

  insertarPelicula(): Observable<any>
  {
    return this.http.post(`${this.API_URI}/crearPelicula`, null);
  }

  obtenerUltima(){
    return this.http.get(`${this.API_URI}/ultimaIteracion`);
  }

  editarPelicula(pelicula: Pelicula2): Observable<any>
  {
    return this.http.post(`${this.API_URI}/editarPelicula`, pelicula);
  }

}
