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

const peliculares2 = {
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

const idiomares = {
  data: [
    {
      id:10,
      Code: 'a',
      Description: 'b'
    },
    {
      id:20,
      Code: 'a2',
      Description: 'b2'
    }
  ],
}
const idiomares2 = {
  data: [
    {
      idlenguaje:10,
      Code: 'a',
      Description: 'b'
    },
    {
      idlenguaje:20,
      Code: 'a2',
      Description: 'b2'
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
const idiomaAux ={
  id:10,
  Code: 'a',
  Description: 'b',
}

const peliculaAux2 ={
  name:'A',
  image:'B',
  chargerate:10,
  active:10
}
const idiomaAux2 ={
  Code: 'a',
  Description: 'b',
}

describe('PeliculaService Pruebas Mocks', () => {
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

  it('Caso de prueba para: obtenerIdioma(), se espera una petición GET', () =>
  {
    service.obtenerIdioma().subscribe((res)=>{
      expect(res).toEqual(idiomares);
    });
    const req =httpmock.expectOne(`${API_URL_AUX}/Language`);
    expect(req.request.method).toBe('GET');
    //Se espera a que las tareas terminen
    req.flush(idiomares);
  });
  it('Caso de prueba para: obtenerUltima(), se espera una petición GET', () =>
  {
    service.obtenerUltima().subscribe((res)=>{
      expect(res).toEqual(peliculares2);
    });
    const req = httpmock.expectOne(`${API_URL}/ultimaIteracion`);
    expect(req.request.method).toBe('GET');
    //Se espera a que las tareas terminen
    req.flush(peliculares2);
  });
  it('Caso de prueba para: obtenerUltimoIdioma(), se espera una petición GET', () =>
  {
    service.obtenerUltimoIdioma().subscribe((res)=>{
      expect(res).toEqual(idiomares2);
    });
    const req = httpmock.expectOne(`${API_URL}/ultimoLenguaje`);
    expect(req.request.method).toBe('GET');
    //Se espera a que las tareas terminen
    req.flush(idiomares2);
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

  it('Caso de prueba para: saveIdioma(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.saveIdioma(idiomaAux).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Pelicula insertada en la base de datos'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/temporalLenguaje`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Pelicula insertada en la base de datos'});
  });

  it('Caso de prueba para: insertarPelicula(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.insertarPelicula().subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Pelicula insertada en la base de datos.'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/crearPelicula`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Pelicula insertada en la base de datos.'});
  });

  it('Caso de prueba para: insertarIdioma(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.insertarIdioma().subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Lenguaje insertado en la base de datos'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/crearLenguaje`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Lenguaje insertado en la base de datos'});
  });

  it('Caso de prueba para: editarPelicula(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.editarPelicula(peliculaAux2).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Datos de peliculas actualizados'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/editarPelicula`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Datos de peliculas actualizados'});
  });

  it('Caso de prueba para: editarLenguaje(), se espera una petición POST', () =>
  {
    //Se llama al servicio y se inyecta la respuesta correcta
    service.editarLenguaje(idiomaAux2).subscribe((res) => {
      //Se coloca la respuesta pregenerada
      expect(res).toEqual({msg: 'Datos de idioma actualizados'});
    })

    //En request se asigna la ruta del servicio
    const req = httpmock.expectOne(`${API_URL}/editarLenguaje`);
    
    //Se realiza la prueba del método
    expect(req.request.method).toBe('POST');

    //Se espera a que las tareas terminen
    req.flush({msg: 'Datos de idioma actualizados'});
  });


});
