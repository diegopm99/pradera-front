import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProveedoresComponent } from './dialog-proveedores.component';

describe('DialogProveedoresComponent', () => {
  let component: DialogProveedoresComponent;
  let fixture: ComponentFixture<DialogProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
