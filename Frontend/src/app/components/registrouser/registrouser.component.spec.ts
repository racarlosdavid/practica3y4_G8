import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/Userservice/users.service';

import { RegistrouserComponent } from './registrouser.component';

//Pruebas normales
describe('RegistrouserComponent', () => {
  let component: RegistrouserComponent;
  let fixture: ComponentFixture<RegistrouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ {
        UsersService,
        provide: Router, 
        useClass: class {
          navigate = jasmine.createSpy("navigate");
        }
      }],
      declarations: [ RegistrouserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //-------------Prueba para LimpiarForm() .HaveBeenCalled()
  it('Caso de prueba para: LimpiarForm(), se espera un anuncio en consola de formulario limpio', () =>
  {
    //Espía
    var spy = spyOn(window.console, 'log').and.callThrough();

    //Ejecución del método
    component.LimpiarForm();

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(spy).toHaveBeenCalled();
  });
  //-------------Prueba para CastearDatos() .not.toBeNaN()
  it('Caso de prueba para: CastearDatos(), se espera que los datos de retorno sean números', () =>
  {
    //Ejecución del método
    component.newuser.edad = "10";
    component.newuser.dpi = "12345";

    component.CastearDatos();

    //Luego de la ejecución del método el tipouser debe cambiar sí o sí
    expect(component.newuser.edad).not.toBeNaN();
    expect(component.newuser.dpi).not.toBeNaN();
  });
});

//Prueba con Mock
describe('RegistrouserComponent - Mock servicio "saveUser"', () => {

  //Se busca declarar una instancia de cada componente a usar
  let component: RegistrouserComponent;
  let fixture: ComponentFixture<RegistrouserComponent>;
  
  //Mock para el servicio a probar
  let mockservicio;
  
  //Se elimina el await (funciona si se deja)
  beforeEach(async () => {
    //Con el mockservicio se crea un objeto del método a probar
    mockservicio = jasmine.createSpyObj(['saveUser']);
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
      declarations: [ RegistrouserComponent ]
    });

    //Sobreescritura de los proveedores (servicio)
    TestBed.overrideProvider(UsersService, { useValue: mockservicio });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrouserComponent);
    component = fixture.componentInstance;

    //Se utiliza el objeto mock para probar un retorno
    mockservicio.saveUser.and.returnValue(of('Registro exitoso'));
    fixture.detectChanges();
  });

  //-------------Prueba para SaveUser() .toBe
  it('Caso de prueba para SaveUser(), se espera una respuesta exitosa con el mensaje "Usuario ingresado con éxito"', () => {
    //Espía
    var spy = spyOn(window, 'alert').and.callThrough();

    //Se ejecuta el componente donde se llama al servicio
    component.newuser.dpi = "1";
    component.newuser.usuario = "Test";
    component.newuser.correo = "Testing";
    component.newuser.contrasenia = "12345";
    component.newuser.nombre = "Test";
    component.newuser.apellido = "Testing";
    component.newuser.edad = "10";
    component.SaveUser();

    //El resultado activa una alerta
    expect(spy).toHaveBeenCalledOnceWith('Usuario ingresado con éxito');
  });
});
