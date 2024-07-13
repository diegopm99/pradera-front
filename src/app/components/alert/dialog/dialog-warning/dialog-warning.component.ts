import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'configuracion-dialog-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.scss']
})
export class DialogWarningComponent implements OnInit {

  title!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title='¡Alerta!'
  }

  ngOnInit(): void {
    // This is intentional
  }

}
