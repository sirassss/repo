export interface IBanner {
  id?: number;
  typeID?: number | null;
  status?: number | null;
}

export class Banner implements IBanner {
  constructor(public id?: number, public typeID?: number | null, public status?: number | null) {}
}

export function getBannerIdentifier(banner: IBanner): number | undefined {
  return banner.id;
}
