export class Paginador {
  page!: number;
  size!: number;
  sort!: string;
  sortDirection!: string;
  totalElements!: number;
  pageSizeOptions!: number[];
  constructor({
    page = 0,
    size = 20,
    totalElements = 0,
    pageSizeOptions = [20, 40, 60, 80, 100],
    sortDirection = 'desc',
  } = {}) {
    this.page = page;
    this.size = size;
    this.totalElements = totalElements;
    this.pageSizeOptions = pageSizeOptions;
    this.sortDirection = sortDirection;
  }
}
