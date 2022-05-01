import * as dayjs from 'dayjs';
import { IOrderDetails } from '../../cart/order-details.model';

export interface IPayment {
  id?: number;
  userFirstName?: string | null;
  userLastName?: string | null;
  userName?: string | null;
  orderAddress?: string | null;
  orderPhone?: string | null;
  totalAmount?: number | null;
  createdDate?: dayjs.Dayjs | null;
  orderID?: number | null;
  bankID?: number | null;
  status?: number | null;
  orderDetails?: IOrderDetails[] | null;
}

export class Payment implements IPayment {
  constructor(public id?: number, public orderDetailID?: number | null, public bankID?: number | null) {}
}

export function getPaymentIdentifier(payment: IPayment): number | undefined {
  return payment.id;
}
