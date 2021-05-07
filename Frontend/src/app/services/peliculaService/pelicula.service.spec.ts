import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { API_URL } from '../URL';
import { API_URL_AUX } from '../URL';

import { peliculaService } from './pelicula.service';

const peliculares = {
  data: [
    {
      id:10,
      name: 'a',
      image: 'b',
      chargerate: 10,
      active: 1,
      availabilities: null,
      languages: null
    },
    {
      id:20,
      name: 'a2',
      image: 'b2',
      chargerate: 20,
      active: 1,
      availabilities: null,
      languages: null
    }
  ],
}

const peliculaAux ={
  id:10,
  name: 'a',
  image: 'b',
  chargerate: 10,
  active: 1,
  availabilities: null,
  languages: null
}

describe('PeliculaService', () => {
  let service: peliculaService;
  let injector: TestBed;
  let httpmock:HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [peliculaService]
    });
    injector=getTestBed();
    service = injector.get(peliculaService);
    httpmock=injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpmock.verify;
  });
  //GETS
  it('Caso de prueba para: obtenerPelicula(), se espera una petición GET', () =>
  {
    service.obtenerPelicula().subscribe((res)=>{
      expect(res).toEqual(peliculares);
    });
    const req =httpmock.expectOne(`${API_URL_AUX}/Movie`);
    expect(req.request.method).toBe('GET');
    //Se espera a que las tareas terminen
    req.flush(peliculares);
  });
  //gets

  //POST

  it('Caso de prueba para: savePelicula(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.savePelicula(peliculaAux).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Pelicula insertada en la base de datos'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/tablaTemporal`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Pelicula insertada en la base de datos'});
  });

});
