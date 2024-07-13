export interface Pageable{
  sort:Sort;
  offset:number;
  pageSize:number;
  pageNumber:number;
  paged:boolean;
  unpaged:boolean
}
export interface Sort{
  sorted:boolean;
  unsorted:boolean;
  empty:boolean;
}
