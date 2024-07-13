import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrls: ['./dialog-usuarios.component.css']
})
export class DialogUsuariosComponent {
  usuarioForm: FormGroup;
  esActualizacion = false;

  constructor(
    public dialogRef: MatDialogRef<DialogUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.usuarioForm = this.fb.group({
      id: [null],
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: this.buildRolesCheckboxes()
    });
  }

  ngOnInit() {
    if (this.data.usuario) {
      this.esActualizacion = true;
      this.usuarioForm.patchValue({
        id: this.data.usuario.id,
        username: this.data.usuario.username,
        password: '', // Puedes decidir si permites cambiar la contraseña aquí
      });
      let rolesArray = this.data.usuario.roles.split(',');
      // Remover espacios en blanco alrededor de cada rol usando trim()
      rolesArray = rolesArray.map((role: string) => role.trim());
      this.setRolesFromUsuario(rolesArray);
    }
  }

  buildRolesCheckboxes() {
    const rolesFormArray = new FormArray([]);
    this.data.roles.forEach((role: any) => {
      rolesFormArray.push(new FormControl(false));
    });
    return rolesFormArray;
  }

  setRolesFromUsuario(selectedRoles: any[]) {
    const rolesFormArray = this.usuarioForm.get('roles') as FormArray;
    
    selectedRoles.forEach(role => {
      const index = this.data.roles.findIndex((r:any) => r.nombre === role);
      if (index !== -1) {
        this.data.roles[index].checked = true
        rolesFormArray.at(index).setValue(true);
      }
    });
  }

  onCheckboxChange(event: any, index: number) {
    const rolesFormArray = this.usuarioForm.get('roles') as FormArray;
    rolesFormArray.at(index).setValue(event.checked);
  }

  guardar() {
    if (this.usuarioForm.valid) {
      const formValue = this.usuarioForm.value;

      // Obtener roles seleccionados del formulario
      const selectedRoles = this.data.roles
        .filter((_: any, index: string | number) => formValue.roles[index])
        .map((role: { id: any; nombre: any; }) => ({ id: role.id, nombre: role.nombre }));

      const usuario: any = {
        id: formValue.id,
        username: formValue.username,
        password: formValue.password,
        roles: selectedRoles
      };

      // Cerrar el diálogo y pasar los datos de vuelta al componente principal
      this.dialogRef.close({ usuario: usuario, esActualizacion: this.esActualizacion });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
