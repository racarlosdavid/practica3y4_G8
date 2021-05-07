import { ComponentFixture, fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { alquilerService } from 'src/app/services/alquilerService/alquiler.service';
import { AlquilerComponent } from './alquiler.component';
import { Articulo } from './alquiler.component';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { DateAdapter } from '@angular/material/core';
import { of } from 'rxjs';


describe('alquilerComponent', () => {
  let component: AlquilerComponent;
  let fecha: Date;
    //Servicios
    let router: Router;
    let servicio: alquilerService;

  beforeEach(async () => {
    component= new AlquilerComponent(servicio,router);
    fecha=new Date();
  });

  it('Prueba para verificarCampos(): Se espera recibir false', async (()=>{
    var x1=null;
    var x2=0;
    expect (component.verificarCampos(x1,x2)).toEqual(false);
  }));

  it('Prueba para verificarCampos(): Se espera recibir true', async (()=>{
    var x1='a';
    var x2=10;
    expect (component.verificarCampos(x1,x2)).toEqual(true);
  }));

  it('Prueba para generarLlave(): La llave generada debe ser 1234Y2021M2D1H1M1S1', async (()=>{
    var x1:string='1234';
    let x2: Date = new Date(2021,1,1,1,1,1,1);
    
    expect (component.generarLlave(x1,x2)).toEqual("1234Y2021M2D1H1M1S1");
  }));
  it('Prueba para calcularSubTotal(): El subTotal debe ser 44', async (()=>{
    var x1:number=11;
    var x2:number=4;
    
    expect (component.calcularsubTotal(x1,x2)).toEqual(44);
  }));

  it('Prueba para sumarSubtotales(): El total debe ser 4444', async (()=>{
    var datos: Articulo[] = [
      new Articulo(1,"Articulo1", 250,1,component.calcularsubTotal(250,1)),
      new Articulo(2,"Articulo2", 25,4,component.calcularsubTotal(25,4)),
      new Articulo(3,"Articulo3", 47,2,component.calcularsubTotal(47,2)),
      new Articulo(4,"Articulo4", 500,8,component.calcularsubTotal(500,8)),
    ];
    
    expect (component.sumaSubtotales(datos)).toEqual(4444);
  }));

  it('Prueba para crearArticulo(): Debe retornar un objeto Articulo con los datos indicados', async (()=>{
    expect (component.crearArticulo(1,"Articulo1", 1,1,1)).toEqual(
      new Articulo(1,"Articulo1", 1,1,1)
    );
  }));

  it('Prueba para getFfuYear(): Debe retornar 2021', async (()=>{
    expect (fecha.getFullYear()).toEqual(
      2021
    );
  }));

});

describe('AlquilerMocks', () => {
  class MockDatos extends AlquilerComponent {
    verificarCampos(valor1,valor2)
    {
      return true;
    }
    sumaSubtotales(){
      return 100;
    }
    renderizarColumnas(){
      return true;
    }
    confirmaBorrar(){
      return true;
    }
    irAPago(){
      return true;
    }
  }
  let component: AlquilerComponent;
  let mock: MockDatos;
  let router: Router;
  let servicio: alquilerService;
  let listadoPeliculas = [
    {idpelicula: 0, nombre:'Pelicula',imagen:'', precio:0, activo:'0'}
  ];

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          useClass: MockDatos
        }
      ],
      declarations: [ AlquilerComponent ]
    })
    .compileComponents();
    
    component = new AlquilerComponent(servicio,router);
    mock = new MockDatos(servicio,router);
    
  });

  
//Prueba para verificar si se llama el verificarCampos al momento de usar el metodo agregar()
it('Caso de prueba con Mock para verficarCampos(): verificar si se llamo la funcion verificarCampos()', () => 
  {
      var spy = spyOn(mock, 'verificarCampos');
      mock.agregar();
      expect(spy).toHaveBeenCalled();
  });

  it('Caso de prueba con Mock para renderizarColumnas(): verificar si se llamo la funcion renderizarColumnas()', () => 
  {
      var spy = spyOn(mock, 'renderizarColumnas');
      mock.agregar();
      expect(spy).toHaveBeenCalled();
  });

  it('Caso de prueba con Mock para confirmaBorrar(): verificar si se llamo la funcion confirmaBorrar()', () => 
  {
      var spy = spyOn(mock, 'confirmaBorrar');
      mock.borrarFila(1);
      expect(spy).toHaveBeenCalled();
  });

  //Prueba para verificar que la alerta contenga el mensaje correcto
  it('Caso de prueba con Mock para mostrarTotal(): verificar si la alerta con el total se muestra correctamente', () => 
  {
      var spy = spyOn(window, 'alert').and.callThrough();
      mock.mostrarTotal();
      expect(spy).toHaveBeenCalledWith('El total es de 100');
  });

  it('Caso de prueba con Mock para alquilar(): verificar si se llamo la funcion irAPago()', () => 
  {
      var spy = spyOn(mock, 'irAPago');
      mock.irAPago();
      expect(spy).toHaveBeenCalled();
  });
});
