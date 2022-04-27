import { IProduct } from '../../product-for-client/product.model';

export interface IViewBanner {
  productTop?: IProduct | null;
  productBottom?: IProduct | null;
  listProduct?: IProduct[] | null;
  listProduct2?: IProduct[] | null;
}

export class ViewBanner implements IViewBanner {
  constructor() {}
}
