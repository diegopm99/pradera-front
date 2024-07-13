import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'configuracion-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  public title!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title='Mensaje para confirmación';
   }

  ngOnInit(): void {
    // This is intentional
  }

}
