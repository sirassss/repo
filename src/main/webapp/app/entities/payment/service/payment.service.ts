import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPayment, getPaymentIdentifier } from '../payment.model';

export type EntityResponseType = HttpResponse<IPayment>;
export type EntityArrayResponseType = HttpResponse<IPayment[]>;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(payment: IPayment): Observable<EntityResponseType> {
    return this.http.post<IPayment>(this.resourceUrl, payment, { observe: 'response' });
  }

  update(payment: IPayment): Observable<EntityResponseType> {
    return this.http.put<IPayment>(`${this.resourceUrl}/${getPaymentIdentifier(payment) as number}`, payment, { observe: 'response' });
  }

  partialUpdate(payment: IPayment): Observable<EntityResponseType> {
    return this.http.patch<IPayment>(`${this.resourceUrl}/${getPaymentIdentifier(payment) as number}`, payment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPayment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByID(id: number): Observable<EntityResponseType> {
    return this.http.get<IPayment>(`${this.resourceUrl + '/admin'}/${id}`, { observe: 'response' });
  }

  getPaymentForUser(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPayment[]>(this.resourceUrl + '/get-for-user', { params: options, observe: 'response' });
  }
}
