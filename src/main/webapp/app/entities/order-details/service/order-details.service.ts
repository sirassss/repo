import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { getOrderDetailsIdentifier, IOrderDetails } from '../../../cart/order-details.model';

export type EntityResponseType = HttpResponse<IOrderDetails>;
export type EntityArrayResponseType = HttpResponse<IOrderDetails[]>;

@Injectable({ providedIn: 'root' })
export class OrderDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/order-details');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(orderDetails: IOrderDetails): Observable<EntityResponseType> {
    return this.http.post<IOrderDetails>(this.resourceUrl, orderDetails, { observe: 'response' });
  }

  update(orderDetails: IOrderDetails): Observable<EntityResponseType> {
    return this.http.put<IOrderDetails>(`${this.resourceUrl}/${getOrderDetailsIdentifier(orderDetails) as number}`, orderDetails, {
      observe: 'response',
    });
  }

  partialUpdate(orderDetails: IOrderDetails): Observable<EntityResponseType> {
    return this.http.patch<IOrderDetails>(`${this.resourceUrl}/${getOrderDetailsIdentifier(orderDetails) as number}`, orderDetails, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrderDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getByOderID(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderDetails[]>(this.resourceUrl + '/get-by-oderid', { params: options, observe: 'response' });
  }
}
