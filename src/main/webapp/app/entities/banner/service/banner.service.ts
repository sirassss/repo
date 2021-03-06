import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBanner, getBannerIdentifier } from '../banner.model';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { IProduct } from '../../../product-for-client/product.model';
import { BannerManufacturerComponent } from '../../../layouts/childs/banner-manufacturer/banner-manufacturer.component';

export type EntityResponseType = HttpResponse<IBanner>;
export type EntityArrayResponseType = HttpResponse<IBanner[]>;

@Injectable({ providedIn: 'root' })
export class BannerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/banners');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(banner: IBanner): Observable<EntityResponseType> {
    return this.http.post<IBanner>(this.resourceUrl, banner, { observe: 'response' });
  }

  update(banner: IBanner): Observable<EntityResponseType> {
    return this.http.put<IBanner>(`${this.resourceUrl}/${getBannerIdentifier(banner) as number}`, banner, { observe: 'response' });
  }

  partialUpdate(banner: IBanner): Observable<EntityResponseType> {
    return this.http.patch<IBanner>(`${this.resourceUrl}/${getBannerIdentifier(banner) as number}`, banner, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBanner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBanner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getListBanner(req?: any): Observable<HttpResponse<IViewBanner>> {
    const options = createRequestOption(req);
    return this.http.get<IViewBanner>(this.resourceUrl + '/get-list-banner', { params: options, observe: 'response' });
  }

  getListProduct(req?: any): Observable<HttpResponse<IViewBanner>> {
    const options = createRequestOption(req);
    return this.http.get<IViewBanner>(this.resourceUrl + '/get-list-pro', { params: options, observe: 'response' });
  }

  getThreeBanner(req?: any): Observable<HttpResponse<IViewBanner>> {
    const options = createRequestOption(req);
    return this.http.get<IViewBanner>(this.resourceUrl + '/get-three-banner', { params: options, observe: 'response' });
  }

  getBannerManufacturer(req?: any): Observable<HttpResponse<IViewBanner>> {
    const options = createRequestOption(req);
    return this.http.get<IViewBanner>(this.resourceUrl + '/get-banner-manufacturer', { params: options, observe: 'response' });
  }

  getLstBanner(req?: any): Observable<HttpResponse<IViewBanner[]>> {
    const options = createRequestOption(req);
    return this.http.get<IViewBanner[]>(this.resourceUrl + '/get-banner-list', { params: options, observe: 'response' });
  }

  getDoubleBanner(req?: any): Observable<HttpResponse<IViewBanner>> {
    const options = createRequestOption(req);
    return this.http.get<IViewBanner>(this.resourceUrl + '/get-double-banner', { params: options, observe: 'response' });
  }
}
