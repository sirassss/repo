import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IManufactured, getManufacturedIdentifier } from '../manufactured.model';

export type EntityResponseType = HttpResponse<IManufactured>;
export type EntityArrayResponseType = HttpResponse<IManufactured[]>;

@Injectable({ providedIn: 'root' })
export class ManufacturedService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/manufactureds');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(manufactured: IManufactured): Observable<EntityResponseType> {
    return this.http.post<IManufactured>(this.resourceUrl, manufactured, { observe: 'response' });
  }

  update(manufactured: IManufactured): Observable<EntityResponseType> {
    return this.http.put<IManufactured>(`${this.resourceUrl}/${getManufacturedIdentifier(manufactured) as number}`, manufactured, {
      observe: 'response',
    });
  }

  partialUpdate(manufactured: IManufactured): Observable<EntityResponseType> {
    return this.http.patch<IManufactured>(`${this.resourceUrl}/${getManufacturedIdentifier(manufactured) as number}`, manufactured, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IManufactured>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IManufactured[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addManufacturedToCollectionIfMissing(
    manufacturedCollection: IManufactured[],
    ...manufacturedsToCheck: (IManufactured | null | undefined)[]
  ): IManufactured[] {
    const manufactureds: IManufactured[] = manufacturedsToCheck.filter(isPresent);
    if (manufactureds.length > 0) {
      const manufacturedCollectionIdentifiers = manufacturedCollection.map(
        manufacturedItem => getManufacturedIdentifier(manufacturedItem)!
      );
      const manufacturedsToAdd = manufactureds.filter(manufacturedItem => {
        const manufacturedIdentifier = getManufacturedIdentifier(manufacturedItem);
        if (manufacturedIdentifier == null || manufacturedCollectionIdentifiers.includes(manufacturedIdentifier)) {
          return false;
        }
        manufacturedCollectionIdentifiers.push(manufacturedIdentifier);
        return true;
      });
      return [...manufacturedsToAdd, ...manufacturedCollection];
    }
    return manufacturedCollection;
  }
}
