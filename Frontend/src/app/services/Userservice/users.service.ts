import { Injectable } from '@angular/core';

//Servicio que permite realizar peticiones http
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Import de rutas
import { API_URL } from '../URL';
//Import del modelo de dato newusuario
import { Usuario } from '../../models/Usuario'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //Se obtiene la ruta
  API_URI = API_URL;

  constructor(private http: HttpClient) { }

  //Se indican las cabeceras para indicar el tipo de dato del recurso
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //Método para inserción de nuevo usuario
  saveUser(user: Usuario)
  {
    return this.http.post(`${this.API_URI}/registrousuario`, user);
  }
}
