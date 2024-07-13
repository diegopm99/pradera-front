import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaInterface } from 'src/app/interfaces/categoria-interface';
import { DigitValidator } from 'src/app/others/digitValidator';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogCategoriaComponent } from '../../categoria/dialog-categoria/dialog-categoria.component';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.css']
})
export class DialogProductoComponent implements OnInit {


  categoriaform!: FormGroup;
  public digitValidator = new DigitValidator();
  valido:any = true
  constructor(
    
    private productoservice: ProductoService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  mensaje: any;
  showEdit: Boolean = this.data.showEdit;

  ngOnInit(): void {
    this.init();
    this.showBtnEdit();
    this.getCategorias();
  }

  init() {
    this.categoriaform = this.formBuilder.group({
      nombre: [
        this.data?.producto?.nombre,
        Validators.required,
      ],
      presentacion: [
        this.data?.producto?.presentacion,
        Validators.required,
      ],
      categoria: [
        this.data?.producto?.categoriaId,
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

  categorias: CategoriaInterface[] = [];
  getCategorias() {
    this.productoservice.getCategorias().subscribe(
      (res: any) => {
        this.categorias = res
      },
      error => {
        alert('Error')
      }
    )
  }

}
