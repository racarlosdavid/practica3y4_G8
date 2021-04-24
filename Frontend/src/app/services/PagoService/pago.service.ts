import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pago } from 'src/app/models/pago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, API_URL_AUX } from '../URL';

@Injectable({
  providedIn: 'root'
})

export class PagoService {
  API = API_URL+'/pagoDePeliculas';
  API_AUX = API_URL_AUX+'/ExchangeRate';

  constructor( private http: HttpClient) { }
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  ingresarPago(dataPago: pago): Observable<any> {
    return this.http.post(`${this.API}`, dataPago);
  }

  obtenerMoneda(): Observable<any> {
    return this.http.get(`${this.API_AUX}`);
  }
}
