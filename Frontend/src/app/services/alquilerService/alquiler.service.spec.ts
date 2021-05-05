import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { API_URL } from '../URL';
import { alquilerService } from './alquiler.service';


describe('AlquilerService', () => {
  let service: alquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(alquilerService);
  });

});
