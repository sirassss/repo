import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IProduct } from '../product.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ProductService } from '../service/product.service';
import { ProductClientModule } from '../product-for-client.module';
import { EventManager } from '../../core/util/event-manager.service';
import { BaseComponent } from '../../shared/base-component/base.component';
import { AccountService } from '../../core/auth/account.service';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { map } from 'rxjs/operators';
import { ModaCartComponent } from '../../shared/modal/modalCart/moda-cart';
import { SessionStorageService } from 'ngx-webstorage';
import { ProductUpdateComponent } from '../update/product-update.component';
import { TypeID } from '../../app.constants';

@Component({
  selector: 'jhi-product-for-client',
  templateUrl: './product-for-client.component.html',
  styleUrls: ['./product-for-client.component.scss'],
})
export class ProductClientComponent extends BaseComponent implements OnInit {
  products?: IProduct[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  eventSubscriber: Subscription | any;
  modalRef!: NgbModalRef;

  varSearch: any;
  typeSearch: any;
  tiTle: any;
  productInCart!: IProduct;

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private eventManager: EventManager,
    private principal: AccountService,
    private sessionStorageService: SessionStorageService
  ) {
    super();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.productService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        varSearch: this.varSearch ? this.varSearch.data : '',
        typeSearch: this.typeSearch ? this.typeSearch.data : 999,
      })
      .subscribe(
        (res: HttpResponse<IProduct[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }

  ngOnInit(): void {
    // this.typeSearch = {};
    // this.varSearch = {};
    const content = this.sessionStorageService.retrieve('varSearch');
    if (content.name === 'type') {
      this.typeSearch = content;
    } else if (content.name === 'vars') {
      this.varSearch = content;
    }
    this.sessionStorageService.clear('varSearch');
    this.handleNavigation();
    this.registerVarSearch();
  }

  trackId(index: number, item: IProduct): number {
    return item.id!;
  }

  addToCart(product: IProduct): void {
    this.principal.identity().subscribe(account => {
      if (account) {
        this.account = account;
        this.modalRef = this.modalService.open(ModaCartComponent, { backdrop: 'static', windowClass: 'width-60' });
        product.quantity = 1;
        this.modalRef.componentInstance.productInCart = product;
        this.modalRef.componentInstance.productDetail = product.productDetails![0];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  registerVarSearch(): void {
    this.eventSubscriber = this.eventManager.subscribe('varSearch', res => {
      if (res) {
        this.changeSearch(res);
      }
    });
    this.eventSubscribers.push(this.eventSubscriber);
  }

  changeSearch(res: any) {
    if (res.content.name === 'type') {
      this.typeSearch = res.content;
    } else {
      this.varSearch = res.content;
    }
    this.loadPage();
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IProduct[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/product-client'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.products = data ?? [];
    this.products.forEach(n => {
      n.isPromotion = n.vouchers!.length > 0;
      n.promotionPrice = n.unitPrice! - (n.unitPrice! * (n.vouchers![0] ? n.vouchers![0].promotionRate! : 0)) / 100;
      n.image = n.productDetails![0].imageUrl;
    });
    this.tiTle = this.typeSearch;
    this.varSearch = undefined;
    this.typeSearch = undefined;
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  star(rate: any) {
    return new Array(rate);
  }

  viewDetail(product: IProduct) {
    this.modalRef = this.modalService.open(ProductUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.modalRef.componentInstance.product = product;
    this.modalRef.componentInstance.productDetail = product.productDetails![0];
  }

  getTitel(): any {
    if (this.tiTle) {
      if (this.tiTle.data === TypeID.PRODUCT_SMART_PHONE) {
        return 'Điện thoại';
      }
      if (this.tiTle.data === TypeID.PRODUCT_LAPTOP) {
        return 'Laptop';
      }
      if (this.tiTle.data === TypeID.PRODUCT_TAPBLET) {
        return 'Tablet';
      }
      if (this.tiTle.data === TypeID.PRODUCT_SMART_WATCH) {
        return 'Đồng hồ thông minh';
      }
      if (this.tiTle.data === TypeID.PRODUCT_ACCESSORY) {
        return 'Phụ kiện';
      }
    } else {
      return '';
    }
  }
}
