import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PagoDePeliculasComponent } from './pago-de-peliculas.component';

import { ComponentFixture, fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { alquilerService } from 'src/app/services/alquilerService/alquiler.service';
import { alquiler, listaPelicula } from 'src/app/models/alquiler';
import { DateAdapter } from '@angular/material/core';
import { of } from 'rxjs';


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