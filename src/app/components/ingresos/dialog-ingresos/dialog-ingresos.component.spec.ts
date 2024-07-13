import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIngresosComponent } from './dialog-ingresos.component';

describe('DialogIngresosComponent', () => {
  let component: DialogIngresosComponent;
  let fixture: ComponentFixture<DialogIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
