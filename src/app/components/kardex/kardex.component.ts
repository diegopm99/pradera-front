import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaInterface } from 'src/app/interfaces/categoria-interface';
import { Paginador } from 'src/app/interfaces/paginador';
import { KardexService } from 'src/app/services/kardex.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {
  @Output() search = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public datasource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['#','producto', 'entradas', 'salidas', 'stock'];
  public paginador!: Paginador;
  categoria = '';
  producto = '';
  constructor(
    public dialog: MatDialog,
    private kardexService: KardexService,
    private formBuilder: FormBuilder
  ) {
    this.paginador = new Paginador();
  }

  ngOnInit(): void {
    this.buscar();
    this.getCategorias();
  }

  buscar() {
    this.findAllRegister();
    this.search.emit();
  }

  findAllRegister() {
    return new Promise((resolve, reject) => {
      var categoria = this.categoria;
      var producto = this.producto;
      this.kardexService
        .findAll(categoria, producto, this.paginador)
        .subscribe(
          (response) => {
            let datasource = response.content;
            this.datasource = new MatTableDataSource(datasource);
            this.datasource.paginator = this.paginator;
            this.paginador.totalElements = response.totalElements;
            this.datasource.sort = this.sort;
            resolve(response);
          }
        );
    });
  }

  onChangePage(event: PageEvent): void {
    this.paginador.page = event.pageIndex;
    this.paginador.size = event.pageSize;
    this.findAllRegister();
  }

  onChangeNumPerPage(event: any): void {
    this.paginador.size = event;
    this.paginador.page = 0;
    this.findAllRegister();
  }

  categorias: CategoriaInterface[] = [];
  getCategorias() {
    this.kardexService.getCategorias().subscribe(
      (res: any) => {
        this.categorias = res
      },
      error => {
        alert('Error')
      }
    )
  }

}
