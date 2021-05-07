import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { API_URL } from '../URL';

//Constantes que simulan el manejo de datos
const usuariores = {
  data: [
    { dpi: 1, usuario: 'User1', correo: 'correo1', contrasenia: '1', nombre: 'Nom1', apellido: 'Ape1', edad: 1 },
    { dpi: 2, usuario: 'User2', correo: 'correo2', contrasenia: '2', nombre: 'Nom2', apellido: 'Ape2', edad: 2 },
  ],
}
const resadmin = {
  data: [
    { dpi: 1, usuario: 'User1', correo: 'correo1', contrasenia: '1', nombre: 'Nom1', apellido: 'Ape1', edad: 1 }
  ]
}
const newuser = {
  dpi: 1,
  usuario: "Testuser",
  correo: "Testing",
  contrasenia: "Testcontra",
  nombre: "Nom1",
  apellido: "Ape1",
  edad: 1
}
const loguser = {
  usuario: "Testuser",
  contrasenia: "Testcontra",
  correo: "Testuser"
}
const logres = {
  id: 0
}

describe('UsersService', () => {

  //TestBed para utilizar el testing
  let injector: TestBed;
  //Se guarda el servicio a utilizar
  let service: UsersService;
  //Variable que se utilizará para crear el mock
  let httpmock: HttpTestingController;

  //Se utiliza un mock de HttpClientModule
  //Ya que no se pretende utilizar quest de tipo http al realizar testing
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    //Se instancian los objetos
    injector = getTestBed();
    service = injector.get(UsersService);
    httpmock = injector.get(HttpTestingController);
  });

  //Se verifica que no existan llamadas http pendientes
  afterEach(() => {
    httpmock.verify();
  });

  //-------------Prueba para getUser() .toBe()
  it('Caso de prueba para: getUser(), se espera una petición GET', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.getUser().subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual(usuariores);
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/obtenerusuarios`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('GET');

    //Se espera a que las tareas terminen
    req.flush(usuariores);
  });
  //-------------Prueba para getUser() .toBe()
  it('Caso de prueba para: getAdmin(), se espera una petición GET', () =>
  {
    service.getAdmin().subscribe((res) => {
      expect(res).toEqual(resadmin);
    })

    const req = httpmock.expectOne(`${API_URL}/admincheck`);
    
    expect(req.request.method).toBe('GET');

    req.flush(resadmin);
  });
  //-------------Prueba para saveUser() .toBe()
  it('Caso de prueba para: saveUser(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.saveUser(newuser).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Inserción exitosa'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/registrousuario`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Inserción exitosa'});
  });
  //-------------Prueba para logByUser() .toBe()
  it('Caso de prueba para: logByUser(), se espera una petición POST', () =>
  {
    service.logByUser(loguser).subscribe((res) => {
      expect(res).toEqual(logres);
    })

    const req = httpmock.expectOne(`${API_URL}/logusuario`);
    
    expect(req.request.method).toBe('POST');

    req.flush(logres);
  });
  //-------------Prueba para logByMail() .toBe()
  it('Caso de prueba para: logByMail(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.logByMail(loguser).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual(logres);
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/logusuariomail`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush(logres);
  });
});
