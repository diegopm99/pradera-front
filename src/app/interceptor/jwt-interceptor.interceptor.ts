import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = this.loginService.getToken();
    let req = request;
    if(this.loginService.isLoged()){
      req = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
