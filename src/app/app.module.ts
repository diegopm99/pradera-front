import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DialogCategoriaComponent } from './components/categoria/dialog-categoria/dialog-categoria.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogSuccessComponent } from './components/alert/dialog/dialog-success/dialog-success.component';
import { DialogConfirmComponent } from './components/alert/dialog/dialog-confirm/dialog-confirm.component';
import { DialogErrorComponent } from './components/alert/dialog/dialog-error/dialog-error.component';
import { DialogWarningComponent } from './components/alert/dialog/dialog-warning/dialog-warning.component';
import { DialogLoadingComponent } from './components/alert/dialog/dialog-loading/dialog-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { DialogProductoComponent } from './components/producto/dialog-producto/dialog-producto.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { DialogIngresosComponent } from './components/ingresos/dialog-ingresos/dialog-ingresos.component';
import { MatSelectModule } from '@angular/material/select';
import { SalidaComponent } from './components/salida/salida.component';
import { DialogSalidasComponent } from './components/salida/dialog-salidas/dialog-salidas.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from './interceptor/jwt-interceptor.interceptor';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DialogUsuariosComponent } from './components/usuarios/dialog-usuarios/dialog-usuarios.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { KardexComponent } from './components/kardex/kardex.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { DialogProveedoresComponent } from './components/proveedores/dialog-proveedores/dialog-proveedores.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { DialogTrabajadoresComponent } from './components/trabajadores/dialog-trabajadores/dialog-trabajadores.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriaComponent,
    ProductoComponent,
    MenuComponent,
    DialogCategoriaComponent, //problema en el mat-label
    DialogSuccessComponent,
    DialogLoadingComponent,
    DialogConfirmComponent,
    DialogErrorComponent,
    DialogWarningComponent,
    DialogProductoComponent,
    IngresosComponent,
    DialogIngresosComponent,
    SalidaComponent,
    DialogSalidasComponent,
    UsuariosComponent,
    DialogUsuariosComponent,
    KardexComponent,
    ProveedoresComponent,
    DialogProveedoresComponent,
    TrabajadoresComponent,
    DialogTrabajadoresComponent,
  ],
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
