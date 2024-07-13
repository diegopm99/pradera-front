import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../interfaces/PageResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  controlChanges = new Subject<Data<any>>();
  private url = `${environment.API}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  public authenticate(datos: any): Observable<any>{
    return this.http.post(`${this.url}login/authenticate`, datos, this.httpOptions);
  }

  public login(token: any){
    this.cookieService.set("token", token);
  }

  public logout(){
    this.cookieService.delete("token");
  }

  public getToken(){
    return this.cookieService.get("token");
  }

  public isLoged(){
    return this.cookieService.check("token"); 
  }
}
