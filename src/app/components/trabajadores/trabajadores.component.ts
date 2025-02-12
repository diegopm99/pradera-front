import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginador } from 'src/app/interfaces/paginador';
import { AlertService } from 'src/app/services/alert.service';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { DialogTrabajadoresComponent } from './dialog-trabajadores/dialog-trabajadores.component';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {


  @Output() search = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public datasource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['#','nombre', 'apellidop','apellidom','dni','acciones'];
  form!: FormGroup;
  public paginador!: Paginador;
  constructor(
    public dialog: MatDialog,
    private trabajadorservice: TrabajadorService,
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
      this.trabajadorservice
        .findAllbyFiltersytrabajador(data, this.paginador)
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
    const dialogRef = this.dialog.open(DialogTrabajadoresComponent, {
      width: '400px',
      data: {
        title: 'Registrar Trabajador',
        boton: 'Registrar',
        proceso: proceso,
      },
    });
    dialogRef.afterClosed().subscribe((o) => {
      if (o) {
      let data:any={
        nombres:o.data.nombres,
        apellidop:o.data.apellidop,
        apellidom:o.data.apellidom,
        dni:o.data.dni,
      }
      this.alertService.loadingDialogShow('Registrando Trabajador...');
      this.trabajadorservice.save(data).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Trabajador Registrado correctamente.","Aceptar",(boton:boolean)=>{})
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

update(trabajador: any) {
  const dialogRef = this.dialog.open(DialogTrabajadoresComponent, {
    width: '400px',
    data: {
      title: 'Actualizar Trabajador',
      boton: 'Actualizar',
      trabajador: trabajador,
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
      trabajador.nombres = o.data.nombres;
      trabajador.apellidop = o.data.apellidop;
      trabajador.apellidom = o.data.apellidom;
      trabajador.dni = o.data.dni;
      this.alertService.loadingDialogShow('Actualizando Trabajador...');
      this.trabajadorservice.save(trabajador).subscribe(
        (response) => {
          this.alertService.loadingDialogClose();
          this.alertService.openSuccessDialog("Información","Trabajador actualizado correctamente.","Aceptar",(boton:boolean)=>{})
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
  let answer = await this.alertService.confirmDialog('¿Seguro que desea eliminar este Trabajador?');
  if (answer) {
    this.trabajadorservice.delete(index).subscribe(
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
