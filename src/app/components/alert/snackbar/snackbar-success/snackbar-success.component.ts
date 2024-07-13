import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'configuracion-snackbar-success',
  templateUrl: './snackbar-success.component.html',
  styleUrls: ['./snackbar-success.component.scss']
})
export class SnackbarSuccessComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    // This is intentional
  }

}
