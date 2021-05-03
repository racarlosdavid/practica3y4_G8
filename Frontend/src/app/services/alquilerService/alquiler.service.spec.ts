import { TestBed } from '@angular/core/testing';

import { alquilerService } from './alquiler.service';

describe('AlquilerService', () => {
  let service: alquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(alquilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
