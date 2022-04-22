import * as dayjs from 'dayjs';
import { IOrderDetails } from '../../cart/order-details.model';

export interface IOrder {
  id?: number;
  userID?: number | null;
  createdDate?: dayjs.Dayjs | null;
  orderAddress?: string | null;
  orderPhone?: string | null;
  status?: boolean | null;
  orderDetails?: IOrderDetails[] | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public userID?: number | null,
    public createdDate?: dayjs.Dayjs | null,
    public orderAddress?: string | null,
    public orderPhone?: string | null,
    public status?: boolean | null,
    public orderDetails?: IOrderDetails[] | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
