export interface IProductDetails {
  id?: number;
  productID?: number | null;
  manufacturerID?: number | null;
  capacity?: string | null;
  screen?: string | null;
  camera?: string | null;
  oSAndCPU?: string | null;
  pIN?: string | null;
  imageUrl?: string | null;
  color?: string | null;
  description?: string | null;
}

export class ProductDetails implements IProductDetails {
  constructor(
    public id?: number,
    public productID?: number | null,
    public manufacturerID?: number | null,
    public capacity?: string | null,
    public screen?: string | null,
    public camera?: string | null,
    public oSAndCPU?: string | null,
    public pIN?: string | null,
    public imageUrl?: string | null,
    public color?: string | null,
    public description?: string | null
  ) {}
}

export function getProductDetailsIdentifier(productDetails: IProductDetails): number | undefined {
  return productDetails.id;
}
