import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaInterface } from 'src/app/interfaces/categoria-interface';
import { DigitValidator } from 'src/app/others/digitValidator';
import { IngresosService } from 'src/app/services/ingresos.service';

@Component({
  selector: 'app-dialog-ingresos',
  templateUrl: './dialog-ingresos.component.html',
  styleUrls: ['./dialog-ingresos.component.css']
})
export class DialogIngresosComponent implements OnInit {

  ingresosform!: FormGroup;
  public digitValidator = new DigitValidator();
  valido:any = true
  constructor(
    
    private ingresosservice: IngresosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogIngresosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  mensaje: any;
  showEdit: Boolean = this.data.showEdit;

  ngOnInit(): void {
    this.init();
    this.showBtnEdit();
    this.getProductos();
    this.getProveedores();
  }

  init() {
    this.ingresosform = this.formBuilder.group({
      producto: [
        this.data?.ingreso?.productoId,
        Validators.required,
      ],
      proveedor: [
        this.data?.ingreso?.proveedorId,
        Validators.required,
      ],
      comprobante: [
        this.data?.ingreso?.comprobante,
        Validators.required,
      ],
      cantidad: [
        this.data?.ingreso?.cantidad,
        Validators.required,
      ],
      precio: [
        this.data?.ingreso?.precio,
        Validators.required,
      ]
    });
  }
  guardar(){
    this.dialogRef.close(
      {
        data: this.ingresosform.value,
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  showBtnEdit() {
    if (this.showEdit != false) {
      this.showEdit = true;
    } else {
      this.ingresosform.disable();
    }
  }

  productos: CategoriaInterface[] = [];
  getProductos() {
    this.ingresosservice.getProductos().subscribe(
      (res: any) => {
        this.productos = res
      },
      error => {
        alert('Error')
      }
    )
  }

  proveedores: CategoriaInterface[] = [];
  getProveedores() {
    this.ingresosservice.getProveedores().subscribe(
      (res: any) => {
        this.proveedores = res
      },
      error => {
        alert('Error')
      }
    )
  }

  validateOnlyNumber(event: any) {
    return this.digitValidator.validateNumeric(event.key);
  }

  validateDecimal(event: any){
    return this.digitValidator.validateDecimal(event.key);
  }

  onPasteNumber(event: ClipboardEvent) {
    var valor = event.clipboardData?.getData('text');
    var respt = this.digitValidator.validateNumeric(valor);
    if (respt === false) event.preventDefault()
  }

}
