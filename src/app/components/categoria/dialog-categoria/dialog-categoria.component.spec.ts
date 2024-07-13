import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoriaComponent } from './dialog-categoria.component';

describe('DialogCategoriaComponent', () => {
  let component: DialogCategoriaComponent;
  let fixture: ComponentFixture<DialogCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
