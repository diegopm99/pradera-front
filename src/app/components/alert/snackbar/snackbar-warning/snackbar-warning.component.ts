import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'configuracion-snackbar-warning',
  templateUrl: './snackbar-warning.component.html',
  styleUrls: ['./snackbar-warning.component.scss']
})
export class SnackbarWarningComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    // This is intentional
  }

}
