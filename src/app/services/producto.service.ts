import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../interfaces/PageResponse';
import { Paginador } from '../interfaces/paginador';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  
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


  public findAllbyFiltersByProducto(filters: any, paginator: Paginador): Observable<any> {
    let params = new HttpParams()
    // if (filters.nombre !=-1) params = params.append('nombre', filters.nombre)
    .set('page', paginator.page.toString())
    .set('size', paginator.size.toString())
   return this.http.get(`${this.url}producto/bandeja?${params}`, this.httpOptions);
  }

  save(datos: any): Observable<any> {
    return this.http.post(`${this.url}producto/guardar`, datos, this.httpOptions);
  }

  delete(act_id: any): Observable<any> {
    return this.http.delete(`${this.url}producto/eliminar/${act_id}`, this.httpOptions);
  }

  getCategorias() {
    return this.http.get(`${this.url}categoria/listar`)
  }

}
