import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFeedback, getFeedbackIdentifier } from '../feedback.model';

export type EntityResponseType = HttpResponse<IFeedback>;
export type EntityArrayResponseType = HttpResponse<IFeedback[]>;

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/feedbacks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(feedback: IFeedback): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feedback);
    return this.http
      .post<IFeedback>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(feedback: IFeedback): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feedback);
    return this.http
      .put<IFeedback>(`${this.resourceUrl}/${getFeedbackIdentifier(feedback) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(feedback: IFeedback): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feedback);
    return this.http
      .patch<IFeedback>(`${this.resourceUrl}/${getFeedbackIdentifier(feedback) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFeedback>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFeedback[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(feedback: IFeedback): IFeedback {
    return Object.assign({}, feedback, {
      createdDate: feedback.createdDate?.isValid() ? feedback.createdDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? dayjs(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((feedback: IFeedback) => {
        feedback.createdDate = feedback.createdDate ? dayjs(feedback.createdDate) : undefined;
      });
    }
    return res;
  }
}
