import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginador } from 'src/app/interfaces/paginador';
import { AlertService } from 'src/app/services/alert.service';
import { IngresosService } from 'src/app/services/ingresos.service';
import { SalidaService } from 'src/app/services/salida.service';
import { DialogSalidasComponent } from './dialog-salidas/dialog-salidas.component';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {
  @Output() search = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public datasource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['#', 'producto', 'cantidad', 'fecha', 'trabajador', 'acciones'];
  form!: FormGroup;
  public paginador!: Paginador;
  constructor(
    public dialog: MatDialog,
    private salidaservice: SalidaService,
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
      this.salidaservice
        .findAllbyFiltersBySalidas(data, this.paginador)
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
    let salida = { nombre: '' };
    const dialogRef = this.dialog.open(DialogSalidasComponent, {
      width: '400px',
      data: {
        title: 'Registrar Salida',
        boton: 'Registrar',
        salida: salida,
      },
    });
    dialogRef.afterClosed().subscribe((o) => {
      if (o) {
      let data:any={
        productoId: o.data.producto,
        trabajadorId: o.data.trabajador,
        cantidad: o.data.cantidad,
      }
      this.alertService.loadingDialogShow('Registrando Salida...');
      this.salidaservice.save(data).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Salida Registrada correctamente.","Aceptar",(boton:boolean)=>{})
          this.limpiar();
        },
        (error) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Salida Registrada correctamente.","Aceptar",(boton:boolean)=>{})
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

update(salida: any) {
  const dialogRef = this.dialog.open(DialogSalidasComponent, {
    width: '400px',
    data: {
      title: 'Actualizar Salida',
      boton: 'Actualizar',
      salida: salida,
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
      salida.productoId = o.data.producto;
      salida.trabajadorId = o.data.trabajador;
      salida.cantidad = o.data.cantidad;
      salida.fecha=null;
      console.log(salida)
      this.alertService.loadingDialogShow('Actualizando Salida...');
      this.salidaservice.save(salida).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Salida Registrada correctamente.","Aceptar",(boton:boolean)=>{})
          this.limpiar();
        },
        (error) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Salida Registrada correctamente.","Aceptar",(boton:boolean)=>{})
          this.limpiar();
        }
      );
    }
  });
}


async delete(index: number) {
  let answer = await this.alertService.confirmDialog('¿Seguro que desea eliminar este Salida?');
  if (answer) {
    this.salidaservice.delete(index).subscribe(
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
