export interface IOrderDetails {
  id?: number;
  productID?: number | null;
  orderID?: number | null;
  quantity?: number | null;
  unitPrice?: number | null;
  total?: number | null;
}

export class OrderDetails implements IOrderDetails {
  constructor(
    public id?: number,
    public productID?: number | null,
    public orderID?: number | null,
    public quantity?: number | null,
    public unitPrice?: number | null,
    public total?: number | null
  ) {}
}

export function getOrderDetailsIdentifier(orderDetails: IOrderDetails): number | undefined {
  return orderDetails.id;
}
