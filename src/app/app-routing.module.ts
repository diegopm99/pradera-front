import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SalidaComponent } from './components/salida/salida.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { FirstGuardGuard } from './guards/first-guard.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { KardexComponent } from './components/kardex/kardex.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    canActivate:[FirstGuardGuard]
  },
  {
    path: 'producto',
    component: ProductoComponent,
    canActivate:[FirstGuardGuard]

  },
  {
    path: 'ingresos',
    component: IngresosComponent,
    canActivate:[FirstGuardGuard]
  },
  {
    path: 'salidas',
    component: SalidaComponent,
    canActivate:[FirstGuardGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate:[FirstGuardGuard]
  },{
    path: 'proveedor',
    component: ProveedoresComponent,
    canActivate:[FirstGuardGuard]
  },
  {
    path: 'trabajador',
    component: TrabajadoresComponent,
    canActivate:[FirstGuardGuard]
  },
  {
    path: 'kardex',
    component: KardexComponent,
    canActivate:[FirstGuardGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
