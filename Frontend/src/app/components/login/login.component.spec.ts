import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { ComponentFixture, fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from 'src/app/services/Userservice/users.service';

import { LoginComponent } from './login.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

//Pruebas normales
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  //Servicios
  let router: Router;
  let servicio: UsersService;

  //Al colocar servicios se deben de colocar en los proveedores:
  //'Servicio' y seguidamente el router con su proveedor utilizando una clase
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ {
        UsersService,
        provide: Router, 
        useClass: class {
          navigate = jasmine.createSpy("navigate");
        }
      }],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //-------------Prueba para radiod() .not.toBe()
  it('Caso de prueba para: radiod(), se espera que el valor de "radioselect" no sea 1', () =>
  {
    //Variable de prueba
    let rselect;

    //Ejecución del método
    component.radiod();
    rselect = component.radioselect;

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(rselect).not.toBe(1);
  });
  //-------------Prueba para radiod2() .toBe()
  it('Caso de prueba para: radiod2(), se espera que el valor de "radioselect" sea 1', () =>
  {
    //Variable de prueba
    let rselect;

    //Ejecución del método
    component.radiod2();
    rselect = component.radioselect;

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(rselect).toBe(1);
  });
  //-------------Prueba para Veriftipousuario() .toBeThruthy()
  it('Caso de prueba para: Veriftipousuario(), se espera recibir verdadero', () =>
  {
    expect(component.Veriftipousuario('1')).toBeTruthy();
  });
  //-------------Prueba para Veriftipousuario() .toHaveBeenCalledOnceWith()
  it('Caso de prueba para: Veriftipousuario(), se espera una alerta con mensaje de corrección si el tipo de usuario es inválido', () =>
  {
    //Objeto espía
    var spy = spyOn(window, 'alert').and.callThrough();

    //Llamado del método con sus condiciones
    component.Veriftipousuario('0');

    expect(spy).toHaveBeenCalledOnceWith("Debe seleccionar un tipo de usuario");
  });
  //-------------Prueba para Verifcamposllenos() .not.toBeFalsy()
  it('Caso de prueba para: Verifcamposllenos(), se espera no recibir falso', () =>
  {
    expect(component.Verifcamposllenos('user', 'contra')).not.toBeFalsy();
  });
  //-------------Prueba para Verifcamposllenos() .not.toBeTruthy()
  it('Caso de prueba para: Verifcamposllenos(), se espera no recibir verdadero', () =>
  {
    expect(component.Verifcamposllenos('', '')).not.toBeTruthy();
  });
  //-------------Prueba para Capturatipo() .toBeLessThanOrEqual()
  it('Caso de prueba para: Capturatipo(), se espera que el tipo de usuario sea menor o igual que 0', () =>
  {
    //Variable de prueba
    let tipouser = component.tipouser;

    //Ejecución del método
    component.Capturatipo();
    tipouser = component.opselected;

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(tipouser).toBeLessThanOrEqual(0);
  });
  //-------------Prueba para Verifcliente() .toHaveBeenCalled()
  it('Caso de prueba para: Verifcliente(), se espera que se llame el método del login por usuario', () =>
  {
    //Espía
    var spy = spyOn(component, 'getByUser');
    
    //Se colocan las condiciones y se llama a los métodos
    component.radioselect = 0;
    component.Verifcliente('', '');

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(spy).toHaveBeenCalled();
  });
  //-------------Prueba para Verifcliente() .toHaveBeenCalledTimes()
  it('Caso de prueba para: Verifcliente(), se espera que se llame el método del login por correo', () =>
  {
    //Espía
    var spy = spyOn(component, 'getByMail');
    
    //Se colocan las condiciones y se llama a los métodos
    component.radioselect = 1;
    component.Verifcliente('', '');

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(spy).toHaveBeenCalledTimes(1);
  });
  //-------------Prueba para Capturadatos() .toHaveBeenCalled()
  it('Prueba para: Capturadatos(), se espera que se llame al método Verifcliente()', () => 
  {
    //Objeto espía 
    var spy = spyOn(component, 'Verifcliente');

    //Condiciones para que nuestro código llegue al método a verificar
    component.tipouser = '1';
    component.Capturadatos('usertest', '1234');

    expect(spy).toHaveBeenCalled();
  });
  //-------------Prueba para Capturadatos() .toHaveBeenCalledTimes()
  it('Prueba para: Capturadatos(), se espera que se llame al método Verifadmi() una vez', () => 
  {
    //Objeto espía 
    var spy = spyOn(component, 'Verifadmi');

    //Condiciones para que nuestro código llegue al método a verificar
    component.tipouser = '2';
    component.Capturadatos('usertest', '1234');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

//Pruebas con Mocks
describe('LoginComponent - Mock servicio "getUser"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  //Mock para el servicio a probar
  let mockservicio;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['getUser']);
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
      declarations: [ LoginComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(UsersService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.getUser.and.returnValue(of('Prueba exitosa'));
    fixture.detectChanges();
  });

  //-------------Prueba para Listarusuarios() .toBe
  it('Caso de prueba para Listarusuarios(), se espera que retorne el mensaje "Prueba exitosa"', () => {
    //Se ejecuta el componente donde se llama al servicio
    component.Listarusuarios();

    //El resultado se refleja en nuser2 que guarda el retorno del servicio
    expect(component.nuser2).toBe('Prueba exitosa');
  });
});
describe('LoginComponent - Mock servicio "logByUser"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  //Mock para el servicio a probar
  let mockservicio;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['logByUser']);
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
      declarations: [ LoginComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(UsersService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.logByUser.and.returnValue(of('Login exitoso'));
    fixture.detectChanges();

    //Se limpia el localStorage antes de ir a la prueba
    window.localStorage.clear();
  });

  //-------------Prueba para getByUser() .toHaveBeenCalledTimes()
  it('Caso de prueba para getByUser(), se espera que el localStorage sea llamado una vez desde la respuesta del servicio', () => {
    var spy = spyOn(localStorage, 'setItem').and.callThrough();
    //Se ejecuta el componente donde se llama al servicio
    component.getByUser();

    //Se verifica que se llamó el localStorage desde la respuesta del servicio
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
describe('LoginComponent - Mock servicio "logByMail"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  
  //Mock para el servicio a probar
  let mockservicio;

  //Servicio de router
  let router: Router;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['logByMail']);
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [
        
      ],
      declarations: [ LoginComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(UsersService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    //TestBed otorga el comportamiento del router
    router = TestBed.get(Router);

    //Instancia de nuestro componente
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.logByMail.and.returnValue(of('Login exitoso'));
    fixture.detectChanges();
  });

  //-------------Prueba para getByMail() .toHaveBeenCalledWith()
  it('Caso de prueba para getByMail(), se espera que el router redireccione a "/cliente" luego de la respuesta del servicio', () => {
    //Objeto espía para el router
    const routerspy = spyOn(router, 'navigate');

    //Se ejecuta el componente donde se llama al servicio
    component.getByMail();

    //Se verifica que se llamó el localStorage desde la respuesta del servicio
    expect(routerspy).toHaveBeenCalledWith(['/cliente']);
  });
});
describe('LoginComponent - Mock servicio "getAdmin"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  
  //Mock para el servicio a probar
  let mockservicio;

  //Servicio de router
  let router: Router;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['getAdmin']);
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [
        
      ],
      declarations: [ LoginComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(UsersService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    //TestBed otorga el comportamiento del router
    router = TestBed.get(Router);

    //Instancia de nuestro componente
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.getAdmin.and.returnValue(of('Testuser', 'Testcontra'));
    fixture.detectChanges();
  });

  //-------------Prueba para Verifadmi() .toHaveBeenCalledWith()
  it('Caso de prueba para Verifadmi(), se espera que se muestre una alerta con el mensaje "Datos incorrectos" luego de la respuesta del servicio', () => {
    //Objeto espía
    var spyalert = spyOn(window, 'alert').and.callThrough();

    //Se ejecuta el componente donde se llama al servicio
    component.radioselect = 0;
    component.Verifadmi('Testuser', 'Testcontra');

    //Se verifica que se haya mostrado una alerta desde la respuesta del servicio
    expect(spyalert).toHaveBeenCalledWith("Datos incorrectos");
  });
  //-------------Prueba para Verifadmi() .toHaveBeenCalledWith()
  it('Caso de prueba para Verifadmi(), se espera que se muestre sola alerta por datos incorrectos', () => {
    //Objeto espía
    var spyalert = spyOn(window, 'alert').and.callThrough();

    //Se ejecuta el componente donde se llama al servicio
    component.radioselect = 1;
    component.Verifadmi('Testuser', 'Testcontra');

    //Se verifica que se haya mostrado una alerta desde la respuesta del servicio
    expect(spyalert).toHaveBeenCalledWith("Datos incorrectos");
  });
});
describe('LoginComponent - Mock servicio "getAdmin"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  //Mock para el servicio a probar
  let mockservicio;

  //Servicio de router
  let router: Router;

  //Simulación del objeto de retorno de la consulta
  let objretorno = [{
    usuario: "Testuser",
    contrasenia: "Testcontra",
    correo: "Testuser"
  }]
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['getAdmin']);
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [
        
      ],
      declarations: [ LoginComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(UsersService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    //TestBed otorga el comportamiento del router
    router = TestBed.get(Router);

    //Instancia de nuestro componente
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno con el objeto antes declarado
    mockservicio.getAdmin.and.returnValue(of(objretorno));
    fixture.detectChanges();
  });

  //-------------Prueba para Verifadmi() .not.toBeUndefined()
  it('Caso de prueba para Verifadmi(), se espera que el objeto admin tenga definida la credencial dpi', () => {
    //Se ejecuta el componente donde se llama al servicio
    component.radioselect = 0;
    component.Verifadmi('Testuser', 'Testcontra');
    
    //Se espera que las credenciales del objeto de prueba definan el objeto administrador
    expect(component.obadmin.dpi).not.toBeUndefined();
  });
  //-------------Prueba para Verifadmi() .toHaveBeenCalledWith()
  it('Caso de prueba para Verifadmi(), se espera que las credenciales del servicio redireccionen a la pestaña "/admin"', () => {
    //Objeto espía para nuestro objeto router.navigate
    const routerSpy = spyOn(router, 'navigate');

    //Se ejecuta el componente donde se llama al servicio
    component.radioselect = 1;
    component.Verifadmi('Testuser', 'Testcontra');
    
    //Con las credenciales del objeto de prueba se espera una redirección
    expect(routerSpy).toHaveBeenCalledWith(['/admin']);
  });
  
});

//Prueba para navegación por Router
describe('LoginComponent - Router', () => {
  
  //Instanciamos variables de control
  //ComponentFixture es un manejador para probar el entorno de nuestro componente
  let fixture: ComponentFixture<LoginComponent>;
  //Servicio de router
  let router: Router;

  //En los imports se agrega el RouterTestingModule con sus rutas
  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [UsersService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    //Inicializamos las variables de control
    //Indicamos a fixture el componente a manejar testeo
    fixture = TestBed.createComponent(LoginComponent);
    //TestBed otorga el comportamiento del router
    router = TestBed.get(Router);
  });

  //-------------Prueba para Registro() .toHaveBeenCalledWith
  it('Prueba para: Registro(), se espera que router redireccione a "/registro"', () => 
  {
    //Se llama una instancia de nuestro componente
    const component = fixture.componentInstance;
    //Objeto espía para nuestro objeto router.navigate
    const routerSpy = spyOn(router, 'navigate');

    component.Registro();

    expect(routerSpy).toHaveBeenCalledWith(['/registro']);
  });
});