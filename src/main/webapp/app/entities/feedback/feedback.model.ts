import * as dayjs from 'dayjs';

export interface IFeedback {
  id?: number;
  userID?: number | null;
  productID?: number | null;
  content?: string | null;
  rate?: number | null;
  createdDate?: dayjs.Dayjs | null;
}

export class Feedback implements IFeedback {
  constructor(
    public id?: number,
    public userID?: number | null,
    public productID?: number | null,
    public content?: string | null,
    public rate?: number | null,
    public createdDate?: dayjs.Dayjs | null
  ) {}
}

export function getFeedbackIdentifier(feedback: IFeedback): number | undefined {
  return feedback.id;
}
