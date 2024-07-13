import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  token: any;

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.loginService.isLoged()) {
      this.router.navigate(['/categoria', {}])
    } else {
      this.loginForm = this.formBuilder.group({
        username: '',
        password: ''
      });
    }
  }

  authenticate() {
    let data = this.loginForm.value;
    this.alertService.loadingDialogShow('Iniciando sesión');
    this.loginService.authenticate(data).subscribe(
      (response) => {
        this.alertService.loadingDialogClose();
        if (response.respuesta) {
          this.token = response.token
          this.loginService.login(this.token);
          localStorage.setItem("rol", response.usuario.roles[0].nombre);
          this.router.navigate(['/categoria', {}])
        } else {
          this.alertService.warningDialog("Usuario o contraseña incorrectos.");
        }
      },
      (error) => {
        this.alertService.loadingDialogClose();
        this.alertService.warningDialog("Ocurrió un error inesperado.");
      }
    )
  }

  logout() {
    this.loginService.logout();
  }

}
