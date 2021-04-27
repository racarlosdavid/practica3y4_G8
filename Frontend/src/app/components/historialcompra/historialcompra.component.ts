import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialCompraService } from '../../services/Historial/historial-compra.service';

@Component({
  selector: 'app-historialcompra',
  templateUrl: './historialcompra.component.html',
  styleUrls: ['./historialcompra.component.css']
})
export class HistorialcompraComponent implements OnInit {

  constructor(private historial:HistorialCompraService, private router:Router) { }
  transacciones: any = [];
  ngOnInit(): void {
    //aqui para verificar inicio de sesion

    //aqui se llamara al servicion para el historial de compras
    let envi= {id:""};
      envi.id = "2";
    //this.historial.HistorialPago(localStorage.getItem('id'));
    this.historial.HistorialPago(envi)
      .subscribe(data =>{
        this.transacciones = data;
      })
  }

}
