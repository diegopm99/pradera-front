import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SnackbarSuccessComponent } from './snackbar-success.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('SnackbarSuccessComponent', () => {
  let component: SnackbarSuccessComponent;
  let fixture: ComponentFixture<SnackbarSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarSuccessComponent ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatMenuModule,
      ],
      providers:[   { provide: MAT_SNACK_BAR_DATA, useValue: {} },   ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});