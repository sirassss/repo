import * as dayjs from 'dayjs';
import { IProductDetails } from '../entities/product-details/product-details.model';
import { IVoucher } from '../shared/modal/voucher/voucher.model';

export interface IProduct {
  id?: number;
  code?: string | null;
  name?: string | null;
  quantity?: number | null;
  unitPrice?: number | null;
  promotionPrice?: number | null;
  installment?: boolean | null;
  accompanyingProducts?: string | null;
  warranty?: number | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdUser?: string | null;
  modifiedUser?: string | null;
  rate?: number | null;
  productDetails?: IProductDetails[] | null;
  vouchers?: IVoucher[] | null;
  isPromotion?: boolean | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public code?: string | null,
    public name?: string | null,
    public quantity?: number | null,
    public unitPrice?: number | null,
    public installment?: boolean | null,
    public accompanyingProducts?: string | null,
    public warranty?: number | null,
    public createdDate?: dayjs.Dayjs | null,
    public modifiedDate?: dayjs.Dayjs | null,
    public createdUser?: string | null,
    public modifiedUser?: string | null,
    public rate?: number | null
  ) {
    this.installment = this.installment ?? false;
  }
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
