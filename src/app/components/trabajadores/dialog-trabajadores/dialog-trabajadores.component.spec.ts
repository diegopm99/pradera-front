import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTrabajadoresComponent } from './dialog-trabajadores.component';

describe('DialogTrabajadoresComponent', () => {
  let component: DialogTrabajadoresComponent;
  let fixture: ComponentFixture<DialogTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTrabajadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
