import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ModalConfirmData } from 'src/app/interfaces/confirm.interface';
import { DialogInformacionInterface } from 'src/app/interfaces/dialog-informacion.interface';
import { ConfirmDialogComponent } from 'src/app/others/alert/confirm-dialog/confirm-dialog.component';
import { DialogInformacionComponent } from 'src/app/others/alert/dialog-informacion/dialog-informacion.component';
import { ErrorDialogComponent } from 'src/app/others/alert/error-dialog/error-dialog.component';
import { LoadingDialogComponent } from 'src/app/others/alert/loading-dialog/loading-dialog.component';
import { SuccessDialogComponent } from 'src/app/others/alert/success-dialog/success-dialog.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogWarningComponent } from '../dialog/dialog-warning/dialog-warning.component';
import { AlertComponent } from './alert.component';

interface LoaderData {
  titulo?: string;
  texto?: string;
  txtCancelar?: string;
  txtGuardar?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  dialogRef!: MatDialogRef<AlertComponent>;
  constructor(private dialog: MatDialog) {}
  // public dialogLoading: any;
  public open(data: LoaderData = {}): Observable<boolean> {
    data.titulo = data.titulo || 'Mensaje de confirmación';
    data.texto = data.texto || '¿Está seguro de guardar los cambios?';
    data.txtCancelar = data.txtCancelar || 'Cancelar';
    data.txtGuardar = data.txtGuardar || 'Aceptar';
    this.dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      backdropClass: 'light-backdrop',
    });
    // this.dialogRef.componentInstance.titulo = data.titulo;
    // this.dialogRef.componentInstance.txtCancelar = data.txtCancelar;
    // this.dialogRef.componentInstance.txtGuardar = data.txtGuardar;
    // this.dialogRef.componentInstance.texto = data.texto;
    return this.dialogRef.afterClosed();
  }

  openModalConfirm(title: string, message: string, callBackFunction: Function) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: new ModalConfirmData({
        title: title,
        content: message,
        buttonClose: 'Cancelar',
        buttonAcepted: 'Aceptar'
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }

  openModalConfirmSiNo(title: string, message: string, callBackFunction: Function) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: new ModalConfirmData({
        title: title,
        content: message,
        buttonClose: 'No',
        buttonAcepted: 'Si'
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }
  public warningDialog(message: string) {
    AppComponent.dialogAlert.open(DialogWarningComponent, {
      data: {
        message: message
      }
    });
  }

  public close() {
    if (this.dialogRef) this.dialogRef.close();
  }
  public loadingDialogClose() {
    this.dialogLoading.close();
  }

  public errorDialog(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: message
      }
    });
  }
  public successDialog(message: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: {
        message: message
      }
    });
  }
  public dialogLoading: any;
  public loadingDialogShow(message: string) {
    this.dialogLoading = this.dialog.open(LoadingDialogComponent, {
      data: {
        message: message
      },
      disableClose: true
    });
  }
  public confirmDialog(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: message
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  public openAlertModalInformacion(
    title: string, message: string, closeButtonLabel: string, callBackFunction: Function, width?: number) {

    var widthDialog = '500px';
    if (width) widthDialog = width + "px";
    const dialogRef = this.dialog.open(DialogInformacionComponent, {
      disableClose: true,
      backdropClass: ['light-backdrop', 'modal_alert_background'],
      width: widthDialog,
      data: new DialogInformacionInterface({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }
}
