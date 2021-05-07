import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatadminComponent } from './catadmin.component';

describe('CatadminComponent', () => {
  let component: CatadminComponent;
  let fixture: ComponentFixture<CatadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
