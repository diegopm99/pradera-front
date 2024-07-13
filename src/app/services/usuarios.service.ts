import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../interfaces/PageResponse';
import { Paginador } from '../interfaces/paginador';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
  controlChanges = new Subject<Data<any>>();
  private url = `${environment.API}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient,
  ) { }


  public findAllbyFiltersByUsuario(filters: any, paginator: Paginador): Observable<any> {
    let params = new HttpParams()
    .set('page', paginator.page.toString())
    .set('size', paginator.size.toString())
   return this.http.get(`${this.url}usuarios/bandeja?${params}`, this.httpOptions);
  }

  save(datos: any): Observable<any> {
    return this.http.post(`${this.url}usuarios/registrar`, datos, this.httpOptions);
  }

  delete(act_id: any): Observable<any> {
    return this.http.delete(`${this.url}usuarios/eliminar/${act_id}`, this.httpOptions);
  }

  
  listarRoles(): Observable<any> {
    return this.http.get(`${this.url}rol/listar`, this.httpOptions);
  }

  update(datos: any): Observable<any> {
    return this.http.post(`${this.url}usuarios/actualizar`, datos, this.httpOptions);
  }

}
