import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVoucher, getVoucherIdentifier } from '../voucher.model';

export type EntityResponseType = HttpResponse<IVoucher>;
export type EntityArrayResponseType = HttpResponse<IVoucher[]>;

@Injectable({ providedIn: 'root' })
export class VoucherService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vouchers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(voucher: IVoucher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voucher);
    return this.http
      .post<IVoucher>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(voucher: IVoucher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voucher);
    return this.http
      .put<IVoucher>(`${this.resourceUrl}/${getVoucherIdentifier(voucher) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(voucher: IVoucher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voucher);
    return this.http
      .patch<IVoucher>(`${this.resourceUrl}/${getVoucherIdentifier(voucher) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVoucher>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVoucher[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVoucherToCollectionIfMissing(voucherCollection: IVoucher[], ...vouchersToCheck: (IVoucher | null | undefined)[]): IVoucher[] {
    const vouchers: IVoucher[] = vouchersToCheck.filter(isPresent);
    if (vouchers.length > 0) {
      const voucherCollectionIdentifiers = voucherCollection.map(voucherItem => getVoucherIdentifier(voucherItem)!);
      const vouchersToAdd = vouchers.filter(voucherItem => {
        const voucherIdentifier = getVoucherIdentifier(voucherItem);
        if (voucherIdentifier == null || voucherCollectionIdentifiers.includes(voucherIdentifier)) {
          return false;
        }
        voucherCollectionIdentifiers.push(voucherIdentifier);
        return true;
      });
      return [...vouchersToAdd, ...voucherCollection];
    }
    return voucherCollection;
  }

  protected convertDateFromClient(voucher: IVoucher): IVoucher {
    return Object.assign({}, voucher, {
      dateIssue: voucher.dateIssue?.isValid() ? voucher.dateIssue.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateIssue = res.body.dateIssue ? dayjs(res.body.dateIssue) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((voucher: IVoucher) => {
        voucher.dateIssue = voucher.dateIssue ? dayjs(voucher.dateIssue) : undefined;
      });
    }
    return res;
  }
}
