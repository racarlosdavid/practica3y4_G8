import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { peliculaService } from 'src/app/services/peliculaService/pelicula.service';

import { CatalogoComponent } from './catalogo.component';

describe('Prueba de Mock 2', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let catalogoMock;

  beforeEach(async () => {
    catalogoMock=jasmine.createSpyObj(['insertarPelicula']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CatalogoComponent ]
    });
    TestBed.overrideProvider(peliculaService,{useValue:catalogoMock});
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    catalogoMock.insertarPelicula.and.returnValue(of('abc'));
    fixture.detectChanges();
  });

  it('Prueba con mock para insertarPelicual(), verifica que se muestre un mensaje al ingresar nuevas peliculas', () => {
    var spy = spyOn(window.console, 'log').and.callThrough();
    component.insertarPeliculas();
    expect(spy).toHaveBeenCalledWith('abc');
  });



});

describe('Catalogo Mock 2', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let catalogoMock;
  let peliculaAux ={
    id:10,
    name: 'a',
    image: 'b',
    chargerate: 10,
    active: 1,
    availabilities: null,
    languages: null
  }

  beforeEach(async () => {
    catalogoMock=jasmine.createSpyObj(['obtenerPelicula']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CatalogoComponent ]
    });
    TestBed.overrideProvider(peliculaService,{useValue:catalogoMock});
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    catalogoMock.obtenerPelicula.and.returnValue(of(peliculaAux));
    fixture.detectChanges();
  });

  it('Prueba con mock para obtenerPelicual(), verifica que se retorne el valor del objeto de prueba', () => {
    component.obtenerPeliculas();
    expect(component.peliculaAux.name).not.toBeUndefined();
  });
});


describe('Catalogo Mock 3', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let catalogoMock;
  let peliculaAux2 ={
    name: 'a2',
    image: 'b2',
    chargerate: 44,
    active: 1
  }

  beforeEach(async () => {
    catalogoMock=jasmine.createSpyObj(['obtenerUltima']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CatalogoComponent ]
    });
    TestBed.overrideProvider(peliculaService,{useValue:catalogoMock});
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    catalogoMock.obtenerUltima.and.returnValue(of(peliculaAux2));
    fixture.detectChanges();
  });

  it('Prueba con mock para actualizarPeliculas(), verifica que se retorne el valor del objeto de prueba', () => {
    component.actualizarPeliculas();
    expect(component.peliculaAux.name).not.toBeUndefined();
  });

  /*it('Prueba con mock para actualizarPeliculas(), verifica que se llame el metodo nuevos datos al actualizar las peliculas', () => {
    var spy = spyOn(component, 'nuevosDatos');
    component.actualizarPeliculas();
    expect(spy).toHaveBeenCalledTimes(1);
  });*/

});

describe('Catalogo Mock 4', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let catalogoMock;
  let peliculaAux2 ={
    name: 'a2',
    image: 'b2',
    chargerate: 44,
    active: 1
  }

  beforeEach(async () => {
    catalogoMock=jasmine.createSpyObj(['editarPelicula']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CatalogoComponent ]
    });
    TestBed.overrideProvider(peliculaService,{useValue:catalogoMock});
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    catalogoMock.editarPelicula.and.returnValue(of('abcde'));
    fixture.detectChanges();
  });

  it('Prueba con mock para nuevosDatos(), verifica que se llame un mensaje de confirmacion al actualizar los datos', () => {
    var spy = spyOn(window.console, 'log').and.callThrough();
    component.nuevosDatos(peliculaAux2);
    expect(spy).toHaveBeenCalled();
  });


});