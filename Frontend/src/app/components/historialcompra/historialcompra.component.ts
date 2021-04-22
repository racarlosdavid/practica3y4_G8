import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historialcompra',
  templateUrl: './historialcompra.component.html',
  styleUrls: ['./historialcompra.component.css']
})
export class HistorialcompraComponent implements OnInit {

  constructor() { }
  transacciones: any = [];
  ngOnInit(): void {
    //aqui se llamara al servicion para el historial de compras
  }

}
