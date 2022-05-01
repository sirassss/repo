export interface IPayment {
  id?: number;
  orderID?: number | null;
  bankID?: number | null;
  status?: number | null;
}

export class Payment implements IPayment {
  constructor(public id?: number, public orderDetailID?: number | null, public bankID?: number | null, public status?: number | null) {}
}

export function getPaymentIdentifier(payment: IPayment): number | undefined {
  return payment.id;
}
