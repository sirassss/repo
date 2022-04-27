import * as dayjs from 'dayjs';

export interface IVoucher {
  id?: number;
  voucherCode?: string | null;
  productID?: number | null;
  promotionPrice?: number | null;
  dateIssue?: dayjs.Dayjs | null;
  status?: number | null;
}

export class Voucher implements IVoucher {
  constructor(
    public id?: number,
    public voucherCode?: string | null,
    public productID?: number | null,
    public promotionPrice?: number | null,
    public dateIssue?: dayjs.Dayjs | null,
    public status?: number | null
  ) {}
}

export function getVoucherIdentifier(voucher: IVoucher): number | undefined {
  return voucher.id;
}
