import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DigitValidator } from 'src/app/others/digitValidator';

@Component({
  selector: 'app-dialog-categoria',
  templateUrl: './dialog-categoria.component.html',
  styleUrls: ['./dialog-categoria.component.css']
})
export class DialogCategoriaComponent implements OnInit {

  categoriaform!: FormGroup;
  public digitValidator = new DigitValidator();
  valido:any = true
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  mensaje: any;
  showEdit: Boolean = this.data.showEdit;

  ngOnInit(): void {
    this.init();
    this.showBtnEdit();
  }

  init() {
    this.categoriaform = this.formBuilder.group({
      nombre: [
        this.data?.categoria?.nombre,
        Validators.required,
      ],
    
    });
  }
  guardar(){
    this.dialogRef.close(
      {
        data: this.categoriaform.value,
      
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  showBtnEdit() {
    if (this.showEdit != false) {
      this.showEdit = true;
    } else {
      this.categoriaform.disable();
    }
  }

  validateOnlyLetter(event: any) {
    return this.digitValidator.validateOnlyLetter(event.key);
  }

  validateOnlyNumber(event: any) {
    return this.digitValidator.validateNumeric(event.key);
  }

  onPasteLetter(event: ClipboardEvent) {
    var valor = event.clipboardData?.getData('text');
    var respt = this.digitValidator.validateOnlyLetter(valor);
    if (respt === false) event.preventDefault()
  }

  onPasteNumber(event: ClipboardEvent) {
    var valor = event.clipboardData?.getData('text');
    var respt = this.digitValidator.validateNumeric(valor);
    if (respt === false) event.preventDefault()
  }

}
