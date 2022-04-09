export interface IBank {
  id?: number;
  accountName?: string | null;
  bankName?: string | null;
  accountNumber?: string | null;
  branch?: string | null;
  status?: boolean | null;
}

export class Bank implements IBank {
  constructor(
    public id?: number,
    public accountName?: string | null,
    public bankName?: string | null,
    public accountNumber?: string | null,
    public branch?: string | null,
    public status?: boolean | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getBankIdentifier(bank: IBank): number | undefined {
  return bank.id;
}
