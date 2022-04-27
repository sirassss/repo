import { IProduct } from '../../product-for-client/product.model';
import { IManufactured } from '../../entities/manufactured/manufactured.model';

export interface IViewBanner {
  productTop?: IProduct | null;
  productBottom?: IProduct | null;
  productTB?: IProduct | null;
  listProduct?: IProduct[] | null;
  listProduct2?: IProduct[] | null;
  listManufactured?: IManufactured[] | null;
}

export class ViewBanner implements IViewBanner {
  constructor() {}
}
