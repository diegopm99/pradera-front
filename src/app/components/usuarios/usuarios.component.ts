import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginador } from 'src/app/interfaces/paginador';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DialogUsuariosComponent } from './dialog-usuarios/dialog-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @Output() search = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public datasource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['#','username', 'roles', 'acciones'];
  form!: FormGroup;
  public paginador!: Paginador;
  
  constructor(
    public dialog: MatDialog,
    private usuarioService: UsuariosService,
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

  findAllRegisterByFilters() {
    return new Promise((resolve, reject) => {
      var data = "";
      this.usuarioService
        .findAllbyFiltersByUsuario(data, this.paginador)
        .subscribe(
          (response) => {
            let datasource = response.content.map((user: any) => {
              return {
                ...user,
                roles: user.roles.map((role: any) => role.nombre).join(', ')
              };
            });

            this.datasource = new MatTableDataSource(datasource);
            this.datasource.paginator = this.paginator;
            this.paginador.totalElements = response.totalElements;
            this.datasource.sort = this.sort;
            resolve(response);
          },
          (error) => {
            reject(error);
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
    let usuario = { username: '', password: '', roles: [] };

    this.usuarioService.listarRoles().subscribe(
      (roles: any[]) => {
        const dialogRef = this.dialog.open(DialogUsuariosComponent, {
          width: '400px',
          data: {
            title: 'Registrar Usuario',
            boton: 'Registrar',
            usuario: usuario,
            roles: roles
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            let data: any = {
              username: result.usuario.username,
              password: result.usuario.password,
              roles: result.usuario.roles.map((role: any) => ({ id: role.id }))
            };

            this.alertService.loadingDialogShow('Registrando usuario...');
            this.usuarioService.save(data).subscribe(
              (response) => {
                this.alertService.loadingDialogClose();
                this.alertService.openSuccessDialog("Información", "Usuario registrado correctamente.", "Aceptar", (boton: boolean) => {});
                this.limpiar();
              },
              (error) => {
                this.alertService.loadingDialogClose();
                this.alertService.warningDialog("El nombre de usuario ya existe.");
                this.limpiar();
              }
            );
          }
        });
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  limpiar() {
    this.buscar();
  }

  update(usuario: any) {
    this.usuarioService.listarRoles().subscribe(
      (roles: any[]) => {
        const dialogRef = this.dialog.open(DialogUsuariosComponent, {
          width: '400px',
          data: {
            title: 'Actualizar Usuario',
            boton: 'Actualizar',
            usuario: usuario,
            roles: roles
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            let data: any = {
              id: usuario.id, // Asegúrate de enviar el ID del usuario a actualizar
              username: result.usuario.username,
              password: result.usuario.password,
              roles: result.usuario.roles.map((role: any) => ({ id: role.id }))
            };
    
            this.alertService.loadingDialogShow('Actualizando Usuario...');
            this.usuarioService.update(data).subscribe(
              (response: any) => {
                this.alertService.loadingDialogClose();
                this.alertService.openSuccessDialog("Información", "Usuario actualizado correctamente.", "Aceptar", (boton: boolean) => {});
                this.limpiar();
              },
              (error: any) => {
                this.alertService.loadingDialogClose();
                this.alertService.warningDialog("El nombre de usuario ya existe.");
                this.limpiar();
              }
            );
          }
        });
      })
  }

  async delete(index: number) {
    let answer = await this.alertService.confirmDialog('¿Seguro que desea eliminar este usuario?');
    if (answer) {
      this.usuarioService.delete(index).subscribe(
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
