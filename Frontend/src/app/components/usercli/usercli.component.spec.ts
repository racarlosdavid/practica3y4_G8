import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercliComponent } from './usercli.component';

describe('UsercliComponent', () => {
  let component: UsercliComponent;
  let fixture: ComponentFixture<UsercliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
