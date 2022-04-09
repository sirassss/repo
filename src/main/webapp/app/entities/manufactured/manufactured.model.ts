export interface IManufactured {
  id?: number;
  name?: string | null;
  image?: string | null;
  description?: string | null;
}

export class Manufactured implements IManufactured {
  constructor(public id?: number, public name?: string | null, public image?: string | null, public description?: string | null) {}
}

export function getManufacturedIdentifier(manufactured: IManufactured): number | undefined {
  return manufactured.id;
}
