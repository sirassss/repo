import * as dayjs from 'dayjs';

export interface IOrder {
  id?: number;
  userID?: number | null;
  createdDate?: dayjs.Dayjs | null;
  orderAddress?: string | null;
  orderPhone?: string | null;
  status?: boolean | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public userID?: number | null,
    public createdDate?: dayjs.Dayjs | null,
    public orderAddress?: string | null,
    public orderPhone?: string | null,
    public status?: boolean | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
