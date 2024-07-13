import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalidasComponent } from './dialog-salidas.component';

describe('DialogSalidasComponent', () => {
  let component: DialogSalidasComponent;
  let fixture: ComponentFixture<DialogSalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSalidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
