import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventarioComponent } from './inventario.component';
import { InventarioService } from 'src/app/services/Inventario/inventario.service'

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;
  let inventario : InventarioComponent;
  let lectura: InventarioService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioComponent] ,
        imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
    inventario = new InventarioComponent(lectura);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Caso de prueba para: cargarPeliculas(), se espera que se carguen las peliculas.', () =>
  {
    localStorage.setItem('dpi','1');
    //Objeto espía
    var spy = spyOn(inventario.inventario,'push').and.callThrough();

    //Llamado del método con sus condiciones
    component.cargarPeliculas();

    expect(spy).toBeTruthy();
  });
});
