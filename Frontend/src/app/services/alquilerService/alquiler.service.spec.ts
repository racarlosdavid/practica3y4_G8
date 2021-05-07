import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { API_URL } from '../URL';
import { API_URL_AUX } from '../URL';
import { alquilerService } from './alquiler.service';


const peliculares = {
  data: [
    {
      idpelicula:10,
      name: 'a',
      image: 'b',
      chargerate: 10,
      active: 1
    },
    {
      idpelicula:20,
      name: 'a2',
      image: 'b2',
      chargerate: 20,
      active: 1
    }
  ],
}

const peliculaAux ={
  idalquiler:10,
  llave: 'a',
  fecha: 'b',
  Usuario_dpi: 11,
  Pago_Id_transaccion: '1',
  Pelicula_idpelicula: 1
}

describe('AlquilerService pruebas Mocks', () => {
  let service: alquilerService;
  let injector: TestBed;
  let httpmock:HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [alquilerService]
    });
    injector=getTestBed();
    service = injector.get(alquilerService);
    httpmock=injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpmock.verify;
  });


  it('Caso de prueba para: getPelicula(), se espera una petición GET', () =>
  {
    service.getPelicula().subscribe((res)=>{
      expect(res).toEqual(peliculares);
    });
    const req = httpmock.expectOne(`${API_URL}/alquiler`);
    expect(req.request.method).toBe('GET');
    //Se espera a que las tareas terminen
    req.flush(peliculares);
  });

  it('Caso de prueba para: saveAlquiler(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.saveAlquiler(peliculaAux).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'ALQUILER insertado en la base de datos'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/crearAlquiler`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'ALQUILER insertado en la base de datos'});
  });

});
