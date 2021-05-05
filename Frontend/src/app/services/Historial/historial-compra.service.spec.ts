import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HistorialCompraService } from './historial-compra.service';

describe('HistorialCompraService', () => {
  let service: HistorialCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(HistorialCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
