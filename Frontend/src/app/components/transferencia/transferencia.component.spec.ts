import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransferenciaComponent } from './transferencia.component';
import { InventarioService } from 'src/app/services/Inventario/inventario.service'
import { UsersService } from 'src/app/services/Userservice/users.service'
import { Router } from '@angular/router'

describe('TransferenciaComponent', () => {
  let component: TransferenciaComponent;
  let fixture: ComponentFixture<TransferenciaComponent>;
  let transferenciaC : TransferenciaComponent;
  let lectura : InventarioService;
  let lecturaUser : UsersService;
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
    transferenciaC = new TransferenciaComponent(lectura,lecturaUser,router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('prueba para selectPelicula(valor:String), se espera que retorne un valor true'), async(()=>{
    expect(transferenciaC.selectPelicula('1')).toEqual(true)
  });

  it('prueba para selectPelicula(valor:String), se espera que retorne un valor false'), async(()=>{
    expect(transferenciaC.selectPelicula('Seleccione')).toEqual(false)
  });

  it('Caso de prueba para: selectPelicula(valor:String), se espera una alerta.', () =>
  {
    //Objeto espía
    var spy = spyOn(window,'alert').and.callThrough();

    //Llamado del método con sus condiciones
    component.selectPelicula('Seleccione');

    expect(spy).toHaveBeenCalledOnceWith("Debe seleccionar una pelicula!");
  });
});
