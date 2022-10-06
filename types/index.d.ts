declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;

declare interface LabelValueOption<T = any> {
  label: string;
  value: T;
  [key: string]: any;
}

declare interface ItemOption<T = any> {
  name: string;
  id: T;
  [key: string]: string | number | boolean;
}

declare type LabelValueOptions<T = any> = LabelValueOption<T>[];

declare interface PaginationParams {
  /**
   * 当前页码
   */
  page: number;
  /**
   * 每页读取条数
   */
  size: number;
}

declare interface ResponsePagination {
  /**
   * 当前页码
   */
  currentPage: number;
  /**
   * 页数
   */
  pageCount: number;
  /**
   * 每页条数
   */
  pageSize: number;
  /**
   * 总数
   */
  total: number;
}

declare interface ResponsePageList<T> extends ResponsePagination {
  items: T[];
}

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
