import { stringify } from '@angular/compiler/src/util';
import { Component, IterableDiffers, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { Router } from '@angular/router';

import { alquilerService } from '../../services/alquilerService/alquiler.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})

export class AlquilerComponent {
  constructor (private alquilerService: alquilerService,private router: Router){};

  ngOnInit(): void {
    //Al iniciar se obtienen los juegos o errores
    this.listaPeliculas();
  }

  npelicula: listaPelicula={
    idPelicula: 0,
    name:'',
    image: '',
    chargerate: 0,
    active: '0'
  }
  npelicula2:any=[];

  //---ACA VAN LAS PELICULAS
  listadoPeliculas = [
    {idpelicula: 0, nombre:'Pelicula',imagen:'', precio:0, activo:'0'}
  ];
  seleccionada2: string = this.listadoPeliculas[0].nombre;
  
  //--VARIABLES AUXILIARES, cambian cada vez que se agrega una pelicula a la lista
    idAux=0;
    nombreAux='';
    imgAux='';
    precioAux=0;
    activeAux='0';
    
    cantidadAux=0;

  //--------

  //--LLAVES DE LOCAL STORAGE DE LA TRANSACCION
    lsTotal=0;
    lsLlave="";

    //Para insertar datos en la tabla alquiler
    newAlquiler: alquiler ={
      idalquiler:0,
      llave:'',
      fecha:'',
      Usuario_dpi:0,
      Pago_Id_transaccion:0,
      Pelicula_idpelicula:0
    }
  

  //Para mostrar los datos en pantalla
  columnas: string[] = ['codigo', 'descripcion', 'precio', 'borrar','subtotal'];

  datos: Articulo[] = [
    //Aqui van las peliculas que se van agregando al carrito
  ];
  articuloselect: Articulo = new Articulo(0,"", 0,0,0);

  listaAlquiler: alquiler[] = [
    //Aqui van los alquileres a insertar
  ];

  @ViewChild(MatTable) tabla1: MatTable<Articulo>;
  
  
  borrarFila(cod: number) {
    if (this.confirmaBorrar()) {
      this.datos.splice(cod, 1);
      this.renderizarColumnas();
    }
  }

  agregar() {
    var verificar:boolean=this.verificarCampos(this.seleccionada2,this.articuloselect.cantidad);
    if (verificar){
      for (var _i = 0; _i < this.listadoPeliculas.length; _i++){
        if (this.listadoPeliculas[_i].nombre==this.seleccionada2){
          this.idAux=this.listadoPeliculas[_i].idpelicula;
          this.nombreAux=this.listadoPeliculas[_i].nombre;
          this.imgAux=this.listadoPeliculas[_i].imagen;
          this.precioAux=this.listadoPeliculas[_i].precio;
          this.activeAux=this.listadoPeliculas[_i].activo;
        }
      }
      
      //this.datos.push(this.crearArticulo(this.articuloselect.nombre, this.articuloselect.precio, this.articuloselect.cantidad, this.calcularsubTotal(this.articuloselect.precio, this.articuloselect.cantidad)));
      this.datos.push(this.crearArticulo(this.idAux,this.nombreAux, this.precioAux, this.articuloselect.cantidad, this.calcularsubTotal(this.precioAux, this.articuloselect.cantidad)));
      this.renderizarColumnas();
      this.articuloselect = new Articulo(0,"", 0,0,0);  
    }else{
      alert('Debe llenar todos los campos');
    }
  }

  mostrarTotal(){
    this.lsTotal=this.sumaSubtotales(this.datos);
    localStorage.setItem('total', this.lsTotal.toString());
    alert('El total es de Q'+this.lsTotal);
  }

  verificarCampos(valor1,valor2): boolean {
    if (
      (valor1==null)||(valor2==null)||(valor1=='')||(valor2==0)
    ){
      return false;
    }else{
      return true;
    }
  }

  calcularsubTotal(valor1:number, valor2:number): number {
    return valor1*valor2;
  }

  sumaSubtotales(datos: Articulo[]):number{
    var resultado:number=0;
    for (let i in datos) {
      resultado+=datos[i].subtotal;
    }
    return resultado;
  }

  crearArticulo(a0:number,a1:string,a2:number,a3:number,a4:number):Articulo{
    return new Articulo(a0,a1,a2,a3,a4);
  }

  renderizarColumnas(){
    this.tabla1.renderRows();
  }

  confirmaBorrar():boolean{
    return confirm("Quitar pelicula?");
  }

  listaPeliculas(){
    this.alquilerService.getPelicula().subscribe(
      res=> {
        console.log(res);
        this.npelicula2=res;
        for (var _i = 0; _i < this.npelicula2.length; _i++){
          var aux ={
            idpelicula:this.npelicula2[_i].idpelicula,
            nombre:this.npelicula2[_i].name,
            imagen:this.npelicula2[_i].image,
            precio:this.npelicula2[_i].chargerate,
            activo:this.npelicula2[_i].active
          }
        
          this.listadoPeliculas.push(aux);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  

  alquilar(){
    let date: Date = new Date();
    let dpi_actual = (localStorage.getItem('dpi'));
    var llave:string;
    llave=dpi_actual+""+date.getFullYear()+""+date.getMonth()+""+date.getDay()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
    //llave=dpi_actual+Number(date);
    console.log(llave);
    localStorage.setItem('llave_pago', llave);

    var fechaSQL = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    console.log(fechaSQL);

    

    for (let i in this.datos){
      var alquilerAux:alquiler={
        idalquiler:0,
        llave:llave,
        fecha:fechaSQL,
        Usuario_dpi:Number(dpi_actual),
        Pago_Id_transaccion:Number(llave),
        Pelicula_idpelicula:this.datos[i].idPel
      };
      this.listaAlquiler.push(alquilerAux);
    }
    localStorage.setItem('listaAlquileres', JSON.stringify(this.listaAlquiler));
    this.router.navigate(['/pago']);
    localStorage.setItem('datosAlquileres', JSON.stringify(this.datos));
    //this.router.navigate(['/pago']);
    /*for (let i in this.datos){
      this.newAlquiler.llave=llave;
      this.newAlquiler.fecha=fechaSQL;
      this.newAlquiler.Usuario_dpi=Number(dpi_actual);
      this.newAlquiler.Pago_Id_transaccion=1;
      this.newAlquiler.Pelicula_idpelicula=this.datos[i].idPel;
      
      
      this.alquilerService.saveAlquiler(this.newAlquiler).subscribe(
        res=>{
          alert(res.message);
        },err=>{
          alert(err.respuesta);
        }
      ) 
    }*/

      

//------
  }

  


}

export class Articulo {
  constructor(public idPel:number,public nombre: string, public precio: number, public cantidad:number, public subtotal:number) {
  }
}

export class Alquiler {
  constructor(public nombre: string,public precio:number) {
  }
}
