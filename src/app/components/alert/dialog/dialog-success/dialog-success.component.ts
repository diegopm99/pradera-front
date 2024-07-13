import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSuccessInterface } from '../../../../interfaces/dialog-success.interface';


@Component({
  selector: 'configuracion-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss']
})
export class DialogSuccessComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogSuccessInterface
  ) {

  }

  ngOnInit(): void {
    // This is intentional
  }

}
