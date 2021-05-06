import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/PagoService/pago.service';

import { alquiler } from 'src/app/models/alquiler';
import { alquilerService } from '../../services/alquilerService/alquiler.service';


@Component({
  selector: 'app-pago-de-peliculas',
  templateUrl: './pago-de-peliculas.component.html',
  styleUrls: ['./pago-de-peliculas.component.css']
})
export class PagoDePeliculasComponent implements OnInit {

  moneda;
  bandera = false;
  local_dpi:number = 0;
  //local_id_transaccion:number = 0;
  local_id_transaccion:string = '0';
  local_total:number = 0;

  dataPago:pago ={
    Id_transaccion:null,
    Num_tarjeta: '', 
    Nombre_tarjeta: '',
    Fecha_vencimiento: '',
    CVV: null,
    Total: null,
    dpi: null
}

  constructor(private pagoService:PagoService, private router:Router,private alquilerService: alquilerService) { }

  ngOnInit(): void {
    //Aqui debo de setear el total que obtengo desde el carrito de compras de peliculas 


    //Consulto la api del aux para obtener el tipo de cambio actual.
    this.getExchange();

    //Obtengo el dpi del usuario logueado
    this.local_dpi = Number(localStorage.getItem('dpi'));

    //this.local_id_transaccion = Number(localStorage.getItem('llave_pago'));
    this.local_id_transaccion = localStorage.getItem('llave_pago');

    this.local_total = Number(localStorage.getItem('total'));

    if (this.local_dpi != 0) {
      this.dataPago.dpi = this.local_dpi; 
    }else{
      this.dataPago.dpi = 1;
    }

    if (this.local_id_transaccion != '0') {
      this.dataPago.Id_transaccion = this.local_id_transaccion; 
    }else{
      this.dataPago.Id_transaccion = ""+Math.floor((Math.random() * 10000000) + 1);;
    }

    if (this.local_total != 0) {
      this.dataPago.Total = this.local_total; 
    }

    (function () {
      'use strict'
    
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')
    
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated')
          }, false)
        })
      }, false)
    })()
  }

  getExchange(){
    this.pagoService.obtenerMoneda().subscribe(
      res=>{
        this.moneda = res[0].total;
      },err=>{
        alert(err.respuesta);
      }
    );
  }

  encriptarTarjeta(numero_tarjeta:string){
    let tarjeta_encriptada = '';

    for (let index = 0; index < numero_tarjeta.length; index++) {
      const element = numero_tarjeta[index];
      if( ( index >= 0 && index <= 3 ) || ( index >= 12 && index <= 15 )){
        tarjeta_encriptada += element;
      }else{
        tarjeta_encriptada += 'X';
      }
      
    }
    return tarjeta_encriptada;
  }

  validarTarjeta16Digitos(numero_tarjeta:string){
    if(numero_tarjeta.length == 16){
      return true;
    }
    return false;
  }

  validarCodigoCVV(codigo:number){
    if(codigo <= 999)
      return true;
    return false;
  }

  validarFecha(fecha:string){
    var splitted = fecha.split("/"); 
    let mes = new Number(splitted[0]);
    let anio = new Number(splitted[1]);
    if ( ( mes >= 1 && mes <= 12 ) && ( anio >= 21 && anio <= 99 ) ) {
      return true;
    }
    return false;
  }

  aplicarExchangeRate(total_compra:number,tipo_cambio:number){
    return total_compra * tipo_cambio;
  }

  procesar(){
    //console.log(this.local_dpi," local storage del user");
    //let salida = "La tarjeta tiene 16 digitos " + this.validarTarjeta16Digitos(this.dataPago.Num_tarjeta) + " el cvv tiene 3 digitos " + this.validarCodigoCVV(this.dataPago.cvv)+
    //" validacion de fecha "+ this.validarFecha(this.dataPago.Fecha_vencimiento) ;
    //console.log(salida);
    //console.log(this.aplicarExchangeRate(this.moneda,this.dataPago.Total));
    //console.log(this.dataPago);
    


    if (this.validarTarjeta16Digitos(this.dataPago.Num_tarjeta) && this.validarCodigoCVV(this.dataPago.CVV) && this.validarFecha(this.dataPago.Fecha_vencimiento) && this.dataPago.Total != null) {
      //Encripto la tarjeta
      this.dataPago.Num_tarjeta = this.encriptarTarjeta(this.dataPago.Num_tarjeta);
      //Aplico el tipo de cambio al total
      this.dataPago.Total = this.aplicarExchangeRate(this.moneda,this.dataPago.Total);
      //Almaceno el pago en la base de datos
      this.pagoService.ingresarPago(this.dataPago).subscribe(
        res=>{
          alert(res.message);
          this.local_dpi = 0;
          this.local_id_transaccion = '0'; 
          this.local_total = 0; 
          this.insertarAlquiler();
          this.router.navigate(['/cliente']);
        },err=>{
          alert(err.respuesta);
        }
      ) 
    } else {
      alert('No se pudo completar el pago, revisar informacion de pago');
    }

    



  }
 

  newAlquiler: alquiler ={
    idalquiler:0,
    llave:'',
    fecha:'',
    Usuario_dpi:0,
    Pago_Id_transaccion:'0',
    Pelicula_idpelicula:0
  }

  insertarAlquiler(){
    var arreglo:alquiler=JSON.parse(localStorage.getItem('listaAlquileres'));
    for (let i in arreglo){
      this.newAlquiler.llave=arreglo[i].llave;
      this.newAlquiler.fecha=arreglo[i].fecha;
      this.newAlquiler.Usuario_dpi=arreglo[i].Usuario_dpi;
      this.newAlquiler.Pago_Id_transaccion=arreglo[i].Pago_Id_transaccion;
      this.newAlquiler.Pelicula_idpelicula=arreglo[i].Pelicula_idpelicula;
      
      //console.log('****'+this.newAlquiler.Pago_Id_transaccion);
      
      this.alquilerService.saveAlquiler(this.newAlquiler).subscribe(
        res=>{
          alert(res.message);
        },err=>{
          alert(err.respuesta);
        }
      )

    }
  }
  

}
