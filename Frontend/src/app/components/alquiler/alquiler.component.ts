import { Component, IterableDiffers, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { listaPelicula } from 'src/app/models/alquiler';

import { alquilerService } from '../../services/alquilerService/alquiler.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})

export class AlquilerComponent {
  constructor (private alquilerService: alquilerService){};

  ngOnInit(): void {
    //Al iniciar se obtienen los juegos o errores
    this.listaPeliculas();
  }

  npelicula: listaPelicula={
    name:'',
    chargerate: 0
  }
  npelicula2:any=[];

  //---ACA VAN LAS PELICULAS
  listadoPeliculas = [
    {nombre:'Pelicula', precio:0}
  ];
  seleccionada2: string = this.listadoPeliculas[0].nombre;
  
  //--VARIABLES AUXILIARES, cambian cada vez que se agrega una pelicula a la lista
    idAux=0;
    nombreAux="";
    precioAux=0;
    cantidadAux=0;
    imgAux="";
  //--------

  //--LLAVE DE LA TRANSACCION
    llaveAux="";
  
  columnas: string[] = ['codigo', 'descripcion', 'precio', 'borrar','subtotal'];

  datos: Articulo[] = [
    //Aqui van las pelioculas que se van agregando
  ];

  articuloselect: Articulo = new Articulo("", 0,0,0);

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
          this.nombreAux=this.listadoPeliculas[_i].nombre;
          this.precioAux=this.listadoPeliculas[_i].precio;
        }
      }
      //this.datos.push(this.crearArticulo(this.articuloselect.nombre, this.articuloselect.precio, this.articuloselect.cantidad, this.calcularsubTotal(this.articuloselect.precio, this.articuloselect.cantidad)));
      this.datos.push(this.crearArticulo(this.nombreAux, this.precioAux, this.articuloselect.cantidad, this.calcularsubTotal(this.precioAux, this.articuloselect.cantidad)));
      this.renderizarColumnas();
      this.articuloselect = new Articulo("", 0,0,0);  
    }else{
      alert('Debe llenar todos los campos');
    }
  }

  mostrarTotal(){
    alert('El total es de Q'+this.sumaSubtotales(this.datos));
    this.listaPeliculas();
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

  crearArticulo(a1:string,a2:number,a3:number,a4:number):Articulo{
    return new Articulo(a1,a2,a3,a4);
  }

  renderizarColumnas(){
    this.tabla1.renderRows();
  }

  confirmaBorrar():boolean{
    return confirm("Realmente quiere borrarlo?");    
  }

  listaPeliculas(){
    this.alquilerService.getPelicula().subscribe(
      res=> {
        console.log(res);
        this.npelicula2=res;
        
        for (var _i = 0; _i < this.npelicula2.length; _i++){
          var aux ={
            nombre:this.npelicula2[_i].name,
            precio:this.npelicula2[_i].chargerate,
          }
          this.listadoPeliculas.push(aux);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  
}

export class Articulo {
  constructor(public nombre: string, public precio: number, public cantidad:number, public subtotal:number) {
  }
}

export class Pelicula {
  constructor(public nombre: string,public precio:number) {
  }
}
