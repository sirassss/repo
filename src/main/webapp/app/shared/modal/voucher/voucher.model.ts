import * as dayjs from 'dayjs';

export interface IVoucher {
  id?: number;
  voucherCode?: string | null;
  description?: string | null;
  productID?: number | null;
  promotionRate?: number | null;
  dateIssue?: number | null;
  status?: boolean | null;
  isSelect?: boolean | null;
}

export class Voucher implements IVoucher {
  constructor(
    public id?: number,
    public voucherCode?: string | null,
    public description?: string | null,
    public productID?: number | null,
    public promotionRate?: number | null,
    public dateIssue?: number | null,
    public status?: boolean | null,
    public isSelect?: boolean | null
  ) {}
}

export function getVoucherIdentifier(voucher: IVoucher): number | undefined {
  return voucher.id;
}
