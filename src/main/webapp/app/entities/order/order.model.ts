import * as dayjs from 'dayjs';
import { IOrderDetails } from '../../cart/order-details.model';
import { IBank } from '../bank/bank.model';

export interface IOrder {
  id?: number;
  userID?: number | null;
  createdDate?: dayjs.Dayjs | null;
  orderAddress?: string | null;
  orderPhone?: string | null;
  status?: boolean | null;
  voucherID?: number | null;
  orderDetails?: IOrderDetails[] | null;
  totalAmount?: number | null;
  banks?: IBank[] | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public userID?: number | null,
    public createdDate?: dayjs.Dayjs | null,
    public orderAddress?: string | null,
    public orderPhone?: string | null,
    public status?: boolean | null,
    public voucherID?: number | null,
    public orderDetails?: IOrderDetails[] | null,
    public totalAmount?: number | null,
    public banks?: IBank[] | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
