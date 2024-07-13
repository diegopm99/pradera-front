import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DialogSuccessComponent } from './dialog-success.component';

describe('DialogSuccessComponent', () => {
  let component: DialogSuccessComponent;
  let fixture: ComponentFixture<DialogSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuccessComponent ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatMenuModule,
      ],
      providers:[   { provide: MAT_DIALOG_DATA, useValue: {} },   ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});