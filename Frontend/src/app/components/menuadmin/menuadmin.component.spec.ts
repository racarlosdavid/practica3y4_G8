import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuadminComponent } from './menuadmin.component';

//Pruebas con Mocks
describe('MenuadminComponent - Mock LocalStorage', () => {
  
  //Instanciamos variables de control
  //ComponentFixture es un manejador para probar el entorno de nuestro componente
  let fixture: ComponentFixture<MenuadminComponent>;
  let component;

  //Servicio de router
  let router: Router;

  //En los imports se agrega el RouterTestingModule con sus rutas
  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [],
      declarations: [ MenuadminComponent ]
    })
    .compileComponents();

    //Inicializamos las variables de control
    //Indicamos a fixture el componente a manejar testeo
    fixture = TestBed.createComponent(MenuadminComponent);
    //TestBed otorga el comportamiento del router
    router = TestBed.get(Router);
  });

  //Antes de cada prueba se crea un mock para el LocalStorage
  beforeEach(() => {
    //Variable para control de los datos
    let almacenadora = {};

    //Versión mockeada del localStorage con sus métodos
    const mockLocalStorage = 
    {
      getItem: (key: string): string => 
      {
        return key in almacenadora ? almacenadora[key] : null;
      },
      setItem: (key: string, value: string) => 
      {
        almacenadora[key] = `${value}`;
      },
      removeItem: (key: string) => 
      {
        delete almacenadora[key];
      },
      clear: () => 
      {
        almacenadora = {};
      }
    };

    //Se utilizan espías con llamadas falsas al método mock
    //para cada método del localStorage
    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });
  //-------------Prueba para ngOnInit() .toHaveBeenCalledTimes(1)
  it('Prueba para: ngOnInit(), se espera que se verifique el dpi del usuario al inicio y al estar vacío se redirige al Login', () => 
  {
    //Se llama una instancia de nuestro componente
    const component = fixture.componentInstance;

    //Objeto espía para nuestro objeto router.navigate
    const routerSpy = spyOn(router, 'navigate');

    //Se llama al método
    component.ngOnInit();

    //Al tener vacío el localStorage se redirige hacia otra pestaña
    expect(routerSpy).toHaveBeenCalledOnceWith(['']);
  });
});
