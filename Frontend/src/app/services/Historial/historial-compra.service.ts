import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, API_URL_AUX } from '../URL';
@Injectable({
  providedIn: 'root'
})
export class HistorialCompraService {
  API = API_URL+'/historialcompra';
  constructor( private http: HttpClient) { }
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  HistorialPago(id: any): Observable<any> {
    return this.http.post(`${this.API}`, id);
  }

  HistorialPagoAdmin(): Observable<any> {
    return this.http.get(`${this.API}`);
  }
}
