import { Pageable, Sort } from "./Pageable.interface";


export interface PageResponse<T> {
    content: T [];
    totalElements: number;
    size: number;
    number: number;
}

export interface Data<D> {
  content: D[];
  pageable?: Pageable;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
  number?: number;
  sort?: Sort;
  size?: number;
  numberOfElements?: number;
  first?: boolean;
  empty?: false;
}

export interface PageResponse2<T> {
  codigo: number;
  mensaje?: number;
  data: Data<T>;
}