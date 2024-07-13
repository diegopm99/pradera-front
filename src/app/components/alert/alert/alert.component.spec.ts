import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { Overlay } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ModalConfirmData } from 'src/app/interfaces/confirm.interface';
import { DialogWarningComponent } from '../dialog/dialog-warning/dialog-warning.component';
import { SuccessDialogComponent } from 'src/app/others/alert/success-dialog/success-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { ConfirmDialogComponent } from 'src/app/others/alert/confirm-dialog/confirm-dialog.component';

import { DialogInformacionComponent } from 'src/app/others/alert/dialog-informacion/dialog-informacion.component';
import { DialogInformacionInterface } from 'src/app/interfaces/dialog-informacion.interface';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        RouterTestingModule,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        MatSnackBar,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

/**************** TEST DE ALERT SERVICE ************* */

describe('AlertService', () => {
  let service: AlertService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [AlertService, MatDialog]
    });
    service = TestBed.inject(AlertService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  interface LoaderData {
    titulo?: string;
    texto?: string;
    txtCancelar?: string;
    txtGuardar?: string;
  }

  it('should open the alert dialog and return the result of afterClosed', async () => {
    const data: LoaderData = {
      titulo: 'Mensaje de confirmación',
      texto: '¿Está seguro de guardar los cambios?',
      txtCancelar: 'Cancelar',
      txtGuardar: 'Aceptar'
    };
    const result = true;
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    const returnedResult = await service.open(data).toPromise();
    expect(dialog.open).toHaveBeenCalledWith(AlertComponent, {
      disableClose: true,
      backdropClass: 'light-backdrop',
    });
    expect(returnedResult).toBe(result);
  });

  it('should open the alert dialog and return the result of afterClosed Cubre', async () => {
    const data: LoaderData = {
      // titulo: 'Mensaje de confirmación',
      // texto: '¿Está seguro de guardar los cambios?',
      // txtCancelar: 'Cancelar',
      // txtGuardar: 'Aceptar'
    };
    const result = true;
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    const returnedResult = await service.open(data).toPromise();
    expect(dialog.open).toHaveBeenCalledWith(AlertComponent, {
      disableClose: true,
      backdropClass: 'light-backdrop',
    });
    expect(returnedResult).toBe(result);
  });

  it('should open the confirm dialog and invoke the callback function with the result', () => {
    const title = 'Confirmation';
    const message = 'Are you sure?';
    const result = true;
    const callBackFunction = jasmine.createSpy('callBackFunction');
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    service.openModalConfirm(title, message, callBackFunction);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmComponent, {
      data: new ModalConfirmData({
        title: title,
        content: message,
        buttonClose: 'Cancelar',
        buttonAcepted: 'Aceptar'
      })
    });
    dialogRefMock.afterClosed().subscribe(() => {
      expect(callBackFunction).toHaveBeenCalledWith(result);
    });
  });

  it('should open the confirm dialog and invoke the callback function with the result', () => {
    const title = 'Confirmation';
    const message = 'Are you sure?';
    const result = true;
    const callBackFunction = jasmine.createSpy('callBackFunction');
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    service.openModalConfirmSiNo(title, message, callBackFunction);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmComponent, {
      data: new ModalConfirmData({
        title: title,
        content: message,
        buttonClose: 'No',
        buttonAcepted: 'Si'
      })
    });
    dialogRefMock.afterClosed().subscribe(() => {
      expect(callBackFunction).toHaveBeenCalledWith(result);
    });
  });

  // it('should open warning Dialog', () => {
  //   const message = 'Success message';
  //   const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
  //   spyOn(AppComponent.dialogAlert, 'open').and.returnValue(dialogRefMock);
  //   service.warningDialog(message);
  //   expect(AppComponent.dialogAlert.open).toHaveBeenCalledWith(DialogWarningComponent, {
  //     data: {
  //       message: message
  //     }
  //   });
  // });

  it('should close the dialog if dialogRef is defined', () => {
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['close']);
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    service.close();
  });

  it('should open the success dialog', () => {
    const message = 'Success message';
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    service.successDialog(message);
    expect(dialog.open).toHaveBeenCalledWith(SuccessDialogComponent, {
      data: {
        message: message
      }
    });
  });


  it('should open the confirm dialog and resolve with the result of afterClosed', async () => {
    const message = 'Confirmation message';
    const result = true;
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    const promiseResult = service.confirmDialog(message);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      data: {
        message: message
      }
    });
    const resolvedResult = await promiseResult;
    expect(resolvedResult).toBe(result);
  });

  it('should open the confirm dialog and resolve with the result of afterClosed false', async () => {
    const message = 'Confirmation message';
    const result = false;
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    const promiseResult = service.confirmDialog(message);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      data: {
        message: message
      }
    });
    const resolvedResult = await promiseResult;
    expect(resolvedResult).toBe(result);
  });

  it('should open the alert modal and invoke the callback function with the result', () => {
    const title = 'Information';
    const message = 'This is an informational message.';
    const closeButtonLabel = 'Close';
    const callBackFunction = jasmine.createSpy('callBackFunction');
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    service.openAlertModalInformacion(title, message, closeButtonLabel, callBackFunction);
    expect(dialog.open).toHaveBeenCalledWith(DialogInformacionComponent, {
      disableClose: true,
      backdropClass: ['light-backdrop', 'modal_alert_background'],
      width: '500px',
      data: new DialogInformacionInterface({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });
    dialogRefMock.afterClosed().subscribe(() => {
      expect(callBackFunction).toHaveBeenCalledWith(true);
    });
  });
  
  
  it('should open the alert modal and invoke the callback function with the result with ', () => {
    const title = 'Information';
    const message = 'This is an informational message.';
    const closeButtonLabel = 'Close';
    const callBackFunction = jasmine.createSpy('callBackFunction');
    const dialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);
    service.openAlertModalInformacion(title, message, closeButtonLabel, callBackFunction,500);
    expect(dialog.open).toHaveBeenCalledWith(DialogInformacionComponent, {
      disableClose: true,
      backdropClass: ['light-backdrop', 'modal_alert_background'],
      width: '500px',
      data: new DialogInformacionInterface({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });
    dialogRefMock.afterClosed().subscribe(() => {
      expect(callBackFunction).toHaveBeenCalledWith(true);
    });
  });
  

  
  

});
