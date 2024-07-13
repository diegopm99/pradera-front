import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalConfirmData } from 'src/app/interfaces/confirm.interface';

@Component({
  selector: 'configuracion-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  isResp:boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalConfirmData
  ) { }

  ngOnInit(): void {
  }

}
