import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialCompraService } from '../../services/Historial/historial-compra.service';

@Component({
  selector: 'app-historial-admin',
  templateUrl: './historial-admin.component.html',
  styleUrls: ['./historial-admin.component.css']
})
export class HistorialAdminComponent implements OnInit {

  constructor(private historial:HistorialCompraService, private router:Router) { }
  transacciones: any = [];
  ngOnInit(): void {
    this.historial.HistorialPagoAdmin()
      .subscribe(data =>{
        this.transacciones = data;
      })
  }

}
