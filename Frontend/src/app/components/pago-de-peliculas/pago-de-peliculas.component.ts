import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/PagoService/pago.service';

@Component({
  selector: 'app-pago-de-peliculas',
  templateUrl: './pago-de-peliculas.component.html',
  styleUrls: ['./pago-de-peliculas.component.css']
})
export class PagoDePeliculasComponent implements OnInit {

  moneda;

  dataPago:pago ={
    Num_tarjeta: '', 
    Nombre_tarjeta: '',
    Fecha_vencimiento: '',
    cvv: null,
    Total: null,
    Id_usuario: null
}

  constructor(private pagoService:PagoService, private router:Router) { }

  ngOnInit(): void {
    //Aqui debo de setear el total que obtengo desde el carrito de compras de peliculas 


    //Consulto la api del aux para obtener el tipo de cambio actual.
    this.pagoService.obtenerMoneda().subscribe(
      res=>{
        this.moneda = res[0].total;
      },err=>{
        alert(err.respuesta);
      }
    );

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
    //let salida = "La tarjeta tiene 16 digitos " + this.validarTarjeta16Digitos(this.dataPago.Num_tarjeta) + " el cvv tiene 3 digitos " + this.validarCodigoCVV(this.dataPago.cvv)+
    //" validacion de fecha "+ this.validarFecha(this.dataPago.Fecha_vencimiento) ;
    //console.log(salida);
    //console.log(this.aplicarExchangeRate(this.moneda,this.dataPago.Total));
    //console.log(this.dataPago);
    this.dataPago.Id_usuario = 10; //Esta quemado para pruebas porque no han implementado localstorage para obtenerlos al momento que se loguea el usuario

    if (this.validarTarjeta16Digitos(this.dataPago.Num_tarjeta) && this.validarCodigoCVV(this.dataPago.cvv) && this.validarFecha(this.dataPago.Fecha_vencimiento)) {
      //Encripto la tarjeta
      this.dataPago.Num_tarjeta = this.encriptarTarjeta(this.dataPago.Num_tarjeta);
      //Aplico el tipo de cambio al total
      this.aplicarExchangeRate(this.moneda,this.dataPago.Total);
      //Almaceno el pago en la base de datos
      this.pagoService.ingresarPago(this.dataPago).subscribe(
        res=>{
          alert(res.message);
            this.router.navigate(['/']);
        },err=>{
          alert(err.respuesta);
        }
      ) 
    } else {
      alert('No se pudo completar el pago, revisar informacion de pago');
    }

    



  }
 
  

}
