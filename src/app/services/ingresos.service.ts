import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../interfaces/PageResponse';
import { Paginador } from '../interfaces/paginador';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {


  
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


  public findAllbyFiltersByIngresos(filters: any, paginator: Paginador): Observable<any> {
    let params = new HttpParams()
    // if (filters.nombre !=-1) params = params.append('nombre', filters.nombre)
    .set('page', paginator.page.toString())
    .set('size', paginator.size.toString())
   return this.http.get(`${this.url}ingresos/bandeja?${params}`, this.httpOptions);
  }

  save(datos: any): Observable<any> {
    return this.http.post(`${this.url}ingresos/guardar`, datos, this.httpOptions);
  }

  delete(act_id: any): Observable<any> {
    return this.http.delete(`${this.url}ingresos/eliminar/${act_id}`, this.httpOptions);
  }

  getProductos() {
    return this.http.get(`${this.url}producto/listar`)
  }

  getProveedores() {
    return this.http.get(`${this.url}proveedor/listar`)
  }

}
