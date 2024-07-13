import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  activeLink: string | null = null;

  rol = localStorage.getItem("rol");

  constructor(
    private router:Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.activeLink = localStorage.getItem('activeLink');
  }

  setActive(link: string) {
    this.activeLink = link;
    // Almacenar el ítem activo en localStorage
    localStorage.setItem('activeLink', link);   
  }
  
  exit() {
    this.loginService.logout();
    this.router.navigate(['/login',{}])
  }
  
  categoria() {
    this.router.navigate(['/categoria',{}])
    this.setActive('categoria');
  }

  producto() {
    this.router.navigate(['/producto',{}])
    this.setActive('producto');
  }

  proveedor() {
    this.router.navigate(['/proveedor',{}])
    this.setActive('proveedor');
  }

  trabajador() {
    this.router.navigate(['/trabajador',{}])
    this.setActive('trabajador');
  }

  ingresos() {
    this.router.navigate(['/ingresos',{}])
    this.setActive('ingresos');
  }
  salidas() {
    this.router.navigate(['/salidas',{}])
    this.setActive('salidas');
  }
  kardex() {
    this.router.navigate(['/kardex',{}])
    this.setActive('kardex');
  }
  usuarios() {
    this.router.navigate(['/usuarios',{}])
    this.setActive('usuarios');
  }
}
