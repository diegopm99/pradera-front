import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from '../components/alert/dialog/dialog-confirm/dialog-confirm.component';
import { DialogErrorComponent } from '../components/alert/dialog/dialog-error/dialog-error.component';
import { DialogLoadingComponent } from '../components/alert/dialog/dialog-loading/dialog-loading.component';
import { DialogSuccessComponent } from '../components/alert/dialog/dialog-success/dialog-success.component';
import { DialogWarningComponent } from '../components/alert/dialog/dialog-warning/dialog-warning.component';
import { SnackbarErrorComponent } from '../components/alert/snackbar/snackbar-error/snackbar-error.component';
import { SnackbarSuccessComponent } from '../components/alert/snackbar/snackbar-success/snackbar-success.component';
import { SnackbarWarningComponent } from '../components/alert/snackbar/snackbar-warning/snackbar-warning.component';
import { DialogSuccessInterface } from '../interfaces/dialog-success.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public dialogAlert: MatDialog,
    public snackBarAlert: MatSnackBar
  ) {
    // This is intentional
  }

  // Dialogs /////////////////////////////////////////////////////////////////////////////7

  public successDialog(message: string) {
    this.dialogAlert.open(DialogSuccessComponent, {
      data: {
        message: message
      }
    });
  }

  public confirmDialog(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialogAlert.open(DialogConfirmComponent, {
        width:"410px",
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

  public confirmDialog2(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialogAlert.open(DialogConfirmComponent, {
        width: '300px',
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


  public warningDialog(message: string) {
    this.dialogAlert.open(DialogWarningComponent, {
      data: {
        message: message
      }
    });
  }

  public errorDialog(message: string) {
    this.dialogAlert.open(DialogErrorComponent, {
      data: {
        message: message
      }
    });
  }

  private dialogLoading: any;

  public loadingDialogShow(message: string) {
    this.dialogLoading = this.dialogAlert.open(DialogLoadingComponent, {
      data: {
        message: message
      },
      disableClose: true
    });
  }
  
  public loadingDialogClose() {
    this.dialogLoading.close();
  }




  // SnackBar ////////////////////////////////////////////////////////////////////////////////////////
  public duration: number = 5;

  public successSnackBar(message: string) {
    this.snackBarAlert.openFromComponent(SnackbarSuccessComponent, {
      duration: this.duration * 1000,
      data: {
        message: message
      }
    });
  }

  public warningSnackBar(message: string) {
    this.snackBarAlert.openFromComponent(SnackbarWarningComponent, {
      duration: this.duration * 1000,
      data: {
        message: message
      }
    });
  }

  public errorSnackBar(message: string) {
    this.snackBarAlert.openFromComponent(SnackbarErrorComponent, {
      duration: this.duration * 1000,
      data: {
        message: message
      }
    });
  }

  public openSuccessDialog(title: string, message: string, closeButtonLabel: string, callBackFunction: Function) {
    const dialogRef = this.dialogAlert.open(DialogSuccessComponent, {
      disableClose: true,
      backdropClass: ['light-backdrop', 'modal_alert_background'],
      width: '300px',
      data: new DialogSuccessInterface({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }


}

