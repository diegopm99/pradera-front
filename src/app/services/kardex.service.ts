import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Data } from '../interfaces/PageResponse';
import { environment } from 'src/environments/environment';
import { Paginador } from '../interfaces/paginador';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  controlChanges = new Subject<Data<any>>();
  private url = `${environment.API}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  public findAll(categoria: any, producto: any, paginator: Paginador): Observable<any> {
    let params = new HttpParams()
    .set('categoria', categoria.toString())
    .set('producto', producto.toString())
    .set('page', paginator.page.toString())
    .set('size', paginator.size.toString())
   return this.http.get(`${this.url}kardex?${params}`, this.httpOptions);
  }

  getCategorias() {
    return this.http.get(`${this.url}categoria/listar`)
  }
}
