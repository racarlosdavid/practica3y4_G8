import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDePeliculasComponent } from './pago-de-peliculas.component';

describe('PagoDePeliculasComponent', () => {
  let component: PagoDePeliculasComponent;
  let fixture: ComponentFixture<PagoDePeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoDePeliculasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDePeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
