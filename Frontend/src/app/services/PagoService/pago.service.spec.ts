import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PagoService } from './pago.service';
import { pago } from 'src/app/models/pago';

describe('PagoService', () => {
  let service: PagoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PagoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  
  it('prueba para validar que se este posteando un pago', () => {
    const dataPago:pago ={
      Id_transaccion:'132321',
      Num_tarjeta: '1111222233334444', 
      Nombre_tarjeta: 'CARLOS DAVID',
      Fecha_vencimiento: '12/24',
      CVV: 345,
      Total: 900,
      dpi: 123456789
    }
    service.ingresarPago(dataPago).subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts).toEqual(dataPago);
    });
  });
/*
  it('comprobar que no ingresen datos ya que este servicio no tiene parametros', () => {
  
    service.obtenerMoneda().subscribe(gets => {
        expect(gets.length).toBe(0);
        expect(gets).toEqual(null);
    });

    const request = httpMock.expectOne( `${service.API_AUX}/ExchangeRate`);
    expect(request.request.method).toBe('GET');
    request.flush(null);
  });
  */
});
