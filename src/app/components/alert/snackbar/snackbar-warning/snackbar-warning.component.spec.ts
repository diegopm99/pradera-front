import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarWarningComponent } from './snackbar-warning.component';

describe('SnackbarWarningComponent', () => {
  let component: SnackbarWarningComponent;
  let fixture: ComponentFixture<SnackbarWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarWarningComponent ],
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
    fixture = TestBed.createComponent(SnackbarWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});