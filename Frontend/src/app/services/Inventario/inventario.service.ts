import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../URL'

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  URL = API_URL
  
  constructor(private http:HttpClient) { }

  public getInventario(dpi:number):Observable<any>{
    return this.http.post(`${this.URL}/inventarioDePeliculas`,{dpi});
  }
  public transferir(dpi:number,idpelicula:number,llave:string,dpiOwner:number){
    return this.http.post(`${this.URL}/transferenciaDePeliculas`,{dpi,idpelicula,llave,dpiOwner})
  }
}
