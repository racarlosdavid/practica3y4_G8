import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PagoDePeliculasComponent } from './pago-de-peliculas.component';

import { ComponentFixture, fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { alquilerService } from 'src/app/services/alquilerService/alquiler.service';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { DateAdapter } from '@angular/material/core';
import { of } from 'rxjs';
import { pago } from 'src/app/models/pago';


import { PagoService } from 'src/app/services/PagoService/pago.service';


describe('PagoDePeliculasComponent', () => {
  let component: PagoDePeliculasComponent;
  let fixture: ComponentFixture<PagoDePeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoDePeliculasComponent ],
      imports: [ HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDePeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('PagoDePeliculasMocks', () => {
  class MockPagoDePeliculasComponent extends PagoDePeliculasComponent {
    //Le seteo datos de un pago para hacer las validaciones
    dataPago:pago ={
      Id_transaccion:'132321',
      Num_tarjeta: '1111222233334444', 
      Nombre_tarjeta: 'CARLOS DAVID',
      Fecha_vencimiento: '12/24',
      CVV: 345,
      Total: 900,
      dpi: 123456789
    }

    ngOnInit(): void {}

    procesar(){}
    
  }

  let component: PagoDePeliculasComponent;
  let mock: MockPagoDePeliculasComponent;
  let spy:any;
  
  //Servicios
  let router : Router;
  let pago_service : PagoService;
  let alquiler_service : alquilerService

  let httpClientSpy: { get: jasmine.Spy };
  
  beforeEach(async () => {
    mock = new MockPagoDePeliculasComponent(pago_service,router,alquiler_service);  
    component = new PagoDePeliculasComponent( pago_service,router,alquiler_service);
  });

  
  it('Validar que la tarjeta se encripte correctamente', () => {   
    expect(mock.encriptarTarjeta(mock.dataPago.Num_tarjeta)).toEqual('1111XXXXXXXX4444');
  });

  it('Validar que la tarjeta tenga 16 digitos, se va a forzar que sea falso, se espera falso', () => 
  {
    spy = spyOn(mock, 'validarTarjeta16Digitos').and.returnValue(false);
    expect(mock.validarTarjeta16Digitos(mock.dataPago.Num_tarjeta)).toEqual(false);
      
  });

  it('Validar que la tarjeta tenga 16 digitos', () => {   
    expect(mock.validarTarjeta16Digitos(mock.dataPago.Num_tarjeta)).toBeTrue();
  });

  it('Validar que la tarjeta tenga 16 digitos', () => {   
    mock.dataPago.Num_tarjeta = '12341234';
    expect(mock.validarTarjeta16Digitos(mock.dataPago.Num_tarjeta)).toBeFalsy();
  });

  
  it('Validar que el formato de la fecha sea correcto', () => {   
    expect(mock.validarFecha(mock.dataPago.Fecha_vencimiento)).toBeTrue();
  });

  it('Validar que la fecha 13/19 se invalida, se espera false', () => {   
    mock.dataPago.Fecha_vencimiento = '13/19';
    expect(mock.validarFecha(mock.dataPago.Fecha_vencimiento)).toBeFalse();
  });

  it('Validar que el codigo cvv tengo solamente 3 digitos', () => {   
    expect(mock.validarCodigoCVV(mock.dataPago.CVV)).toBeTrue();
  });

  it('Validar que el codigo cvv 51234 es invalido , se espera false', () => {   
    mock.dataPago.CVV = 51234;
    expect(mock.validarCodigoCVV(mock.dataPago.CVV)).toBeFalse();
  });

  it('Calcular el total una vez aplicado el tipo de cambio, se espera 850', () => {
    expect(component.aplicarExchangeRate(100,8.5)).toEqual(850);
  });

  it('should return expected exchange (HttpClient called once)', () => {
    const exchange = [{ total: 2 }];

    httpClientSpy.get.and.returnValue(exchange);

    pago_service.obtenerMoneda().subscribe(
      res=>{
        expect(res).toEqual({ total: 2 });
      },fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('Caso de prueba con Mock para verificar mensaje de alerta, total obtenido', () => 
  {
      mock.dataPago.Total = 500;
      spy = spyOn(window, 'alert').and.callThrough();
      mock.validarTolalObtenido();
      expect(spy).toHaveBeenCalledWith('El total de la compra es 500');
   
  });

  it('Caso de prueba para getExchange(), se espera una respuesta exitosa con el mensaje "Usuario ingresado con éxito"', () => {
    //Espía
    var spy = spyOn(console, 'log').and.callThrough();

    //Se ejecuta el componente donde se llama al servicio
    component.getExchange();

    //El resultado activa una alerta
    expect(spy).toHaveBeenCalledOnceWith('exchange obtenido');
  });
  
  /*
  it('Validar que la tarjeta tenga 16 digitos, se va a forzar que sea falso, se espera falso', () => {
    spy = spyOn(window, 'alert').and.callThrough();
    mock.procesar();
    expect(spy).toHaveBeenCalledWith('No se pudo completar el pago, revisar informacion de pago');  
  });
*/


});

/*
describe('RegistrouserComponent - Mock servicio "obtenerMoneda"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: PagoDePeliculasComponent;
  let fixture: ComponentFixture<PagoDePeliculasComponent>;
  
  //Mock para el servicio a probar
  let mockservicio;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['obtenerMoneda']);
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        }
      ],
      declarations: [ PagoDePeliculasComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(PagoService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDePeliculasComponent);
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.obtenerMoneda.and.returnValue(of(5));
    fixture.detectChanges();
  });

  //-------------Prueba para SaveUser() .toBe
  it('Caso de prueba para SaveUser(), se espera una respuesta exitosa con el mensaje "Usuario ingresado con éxito"', () => {
    //Espía
    var spy = spyOn(window, 'alert').and.callThrough();

    //Se ejecuta el componente donde se llama al servicio
    component.getExchange();

    //El resultado activa una alerta
    expect(spy).toHaveBeenCalledOnceWith('Usuario ingresado con éxito');
  });
});




//-------------------
//----------Prueba con Mock ALQUILER
/*
describe('Crear Alquiler - Mock servicio "saveAlquiler"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: PagoDePeliculasComponent;
  let fixture: ComponentFixture<PagoDePeliculasComponent>;
  
  //Mock para el servicio a probar
  let mockservicio;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['saveAlquiler']);
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        }
      ],
      declarations: [ PagoDePeliculasComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(alquilerService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDePeliculasComponent);
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.saveAlquiler.and.returnValue(of('ALQUILER insertado en la base de datos'));
    fixture.detectChanges();
  });

  //-------------Prueba para SaveUser() .toBe
  it('Caso de prueba para SaveUser(), se espera una respuesta exitosa con el mensaje "Usuario ingresado con éxito"', () => {
    //Espía
    var spy = spyOn(window, 'alert').and.callThrough();

    //Se ejecuta el componente donde se llama al servicio
    component.insertarAlquiler();

    //El resultado activa una alerta
    expect(spy).toHaveBeenCalledOnceWith('ALQUILER insertado en la base de datos');
  });
});*/