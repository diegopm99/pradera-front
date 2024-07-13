import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalAlertData } from 'src/app/interfaces/alert.interface';

@Component({
  selector: 'configuracion-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: modalAlertData) { }

  ngOnInit(): void {
  }

}
