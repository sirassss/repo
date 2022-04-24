import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrder, getOrderIdentifier } from '../order.model';

export type EntityResponseType = HttpResponse<IOrder>;
export type EntityArrayResponseType = HttpResponse<IOrder[]>;

@Injectable({ providedIn: 'root' })
export class OrderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/orders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(order: IOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .post<IOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(order: IOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .put<IOrder>(`${this.resourceUrl}/${getOrderIdentifier(order) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(order: IOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .patch<IOrder>(`${this.resourceUrl}/${getOrderIdentifier(order) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(order: IOrder): IOrder {
    return Object.assign({}, order, {
      createdDate: order.createdDate?.isValid() ? order.createdDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((order: IOrder) => {
        order.createdDate = order.createdDate ? dayjs(order.createdDate) : undefined;
      });
    }
    return res;
  }

  findOderUnpaid(): Observable<EntityResponseType> {
    return this.http
      .get<IOrder>(this.resourceUrl + '/find-oder-unpaid', { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
}
