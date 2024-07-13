import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginador } from 'src/app/interfaces/paginador';
import { AlertService } from 'src/app/services/alert.service';
import { IngresosService } from 'src/app/services/ingresos.service';
import { DialogIngresosComponent } from './dialog-ingresos/dialog-ingresos.component';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  @Output() search = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public datasource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['#', 'comprobante', 'producto', 'cantidad', 'precio', 'total', 'fecha', 'proveedor', 'acciones'];
  form!: FormGroup;
  public paginador!: Paginador;
  constructor(
    public dialog: MatDialog,
    private ingresosservice: IngresosService,
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
      this.ingresosservice
        .findAllbyFiltersByIngresos(data, this.paginador)
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
    let ingreso = { nombre: '' };
    const dialogRef = this.dialog.open(DialogIngresosComponent, {
      width: '400px',
      data: {
        title: 'Registrar Ingreso',
        boton: 'Registrar',
        ingreso: ingreso,
      },
    });
    dialogRef.afterClosed().subscribe((o) => {
      if (o) {
      let data:any={
        productoId:o.data.producto,
        proveedorId: o.data.proveedor,
        comprobante: o.data.comprobante,
        cantidad:o.data.cantidad,
        precio: o.data.precio,
      }
      this.alertService.loadingDialogShow('Registrando Ingreso...');
      this.ingresosservice.save(data).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Ingreso Registrada correctamente.","Aceptar",(boton:boolean)=>{})
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

update(ingreso: any) {
  console.log(ingreso)
  const dialogRef = this.dialog.open(DialogIngresosComponent, {
    width: '400px',
    data: {
      title: 'Actualizar Ingreso',
      boton: 'Actualizar',
      ingreso: ingreso,
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
      ingreso.productoId = o.data.producto;
      ingreso.proveedorId = o.data.proveedor;
      ingreso.comprobante = o.data.comprobante;
      ingreso.cantidad = o.data.cantidad;
      ingreso.precio = o.data.precio;
      ingreso.fecha=null;
      console.log(ingreso)
      this.alertService.loadingDialogShow('Actualizando Ingreso...');
      this.ingresosservice.save(ingreso).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Ingreso Registrada correctamente.","Aceptar",(boton:boolean)=>{})
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


async delete(index: number) {
  let answer = await this.alertService.confirmDialog('¿Seguro que desea eliminar este Ingreso?');
  if (answer) {
    this.ingresosservice.delete(index).subscribe(
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
