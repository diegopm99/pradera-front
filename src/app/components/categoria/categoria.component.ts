import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginador } from 'src/app/interfaces/paginador';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DialogCategoriaComponent } from './dialog-categoria/dialog-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  @Output() search = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public datasource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['#','categoria', 'acciones'];
  form!: FormGroup;
  public paginador!: Paginador;
  constructor(
    public dialog: MatDialog,
    private categoriaService: CategoriaService,
    private alertService: AlertService
  ) {
    this.paginador = new Paginador();
  }

  ngOnInit(): void {
    this.findAllRegisterByFilters();
    this.buscar();
  }
  buscar() {
    this.findAllRegisterByFilters();
    this.search.emit();
  }

  findAllRegisterByFilters(){
    return new Promise((resolve, reject) => {
      // var data = this.form.value;
      var data = "";
      this.categoriaService
        .findAllbyFiltersByCategoria(data, this.paginador)
        .subscribe(
          (response) => {
            let datasource = response.content
            this.datasource = new MatTableDataSource(datasource);
            this.datasource.paginator = this.paginator;
            this.paginador.totalElements = response.totalElements;
            this.datasource.sort = this.sort;
            resolve(response);
          }
        );
    });
  }

  onChangePage(event: PageEvent): void {
    this.paginador.page = event.pageIndex;
    this.paginador.size = event.pageSize;
    this.findAllRegisterByFilters();
  }
  
  onChangeNumPerpPage(event: any): void {
    this.paginador.size = event;
    this.paginador.page = 0;
    this.findAllRegisterByFilters();
  }

  createAct() {
    let proceso = { nombre: '' };
    const dialogRef = this.dialog.open(DialogCategoriaComponent, {
      width: '400px',
      data: {
        title: 'Registrar Categoria',
        boton: 'Registrar',
        proceso: proceso,
      },
    });
    dialogRef.afterClosed().subscribe((o) => {
      if (o) {
      let data:any={
        nombre:o.data.nombre
      }
      this.alertService.loadingDialogShow('Registrando Categoria...');
      this.categoriaService.save(data).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Categoria Registrada correctamente.","Aceptar",(boton:boolean)=>{})
          this.limpiar();
        },
        (error) => {
          this.alertService.loadingDialogClose();
          this.alertService.warningDialog("Ocurrió un error inesperado.")
          this.limpiar();
        }
      );
    }
    });
}

limpiar() {
  // this.form.get('nombre')?.setValue('');
  this.buscar();
}

update(categoria: any) {
  const dialogRef = this.dialog.open(DialogCategoriaComponent, {
    width: '400px',
    data: {
      title: 'Actualizar Categoria',
      boton: 'Actualizar',
      categoria: categoria,
    },
  });
  dialogRef.afterClosed().subscribe((o) => {
    var estado;
    if (o) {
      if (o.data.activo === 'Activo') {
        estado = 1;
      } else {
        estado = 0;
      }
      categoria.nombre = o.data.nombre;
      this.alertService.loadingDialogShow('Actualizando Categoria...');
      this.categoriaService.save(categoria).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Categoría actualizada correctamente.","Aceptar",(boton:boolean)=>{})
          this.limpiar();
        },
        (error) => {
          this.alertService.loadingDialogClose();
          this.alertService.warningDialog("Ocurrió un error inesperado.");
          this.limpiar();
        }
      );
    }
  });
}


async delete(index: number) {
  let answer = await this.alertService.confirmDialog('¿Seguro que desea eliminar esta Categoria?');
  if (answer) {
    this.categoriaService.delete(index).subscribe(
      response => {
        if (response === true) {
          this.datasource.data.splice(index, 1);
          this.datasource = new MatTableDataSource(this.datasource.data)
          alert('Se eliminó exitosamente');
        }
        this.limpiar();
      },
      error => {
        alert('No se pudo eliminar');
      }
    );
  }
}
}
