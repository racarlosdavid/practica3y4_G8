import { Injectable } from '@angular/core';

//Servicio que permite realizar peticiones http
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Import de rutas
import { API_URL } from '../URL';
//Import del modelo de dato alquiler
import { alquiler } from '../../models/alquiler'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class alquilerService {
  //Se obtiene la ruta
  API_URI = API_URL;

  constructor(private http: HttpClient) { }

  //Se indican las cabeceras para indicar el tipo de dato del recurso
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //Método para inserción de nuevo alquiler
  saveAlquiler(alquiler: alquiler): Observable<any>
  {
    return this.http.post(`${this.API_URI}/crearAlquiler`, alquiler);
  }

  //metodos para obtener lista de peliculas
  getPelicula(){
    return this.http.get(`${this.API_URI}/alquiler`);
  }


}
