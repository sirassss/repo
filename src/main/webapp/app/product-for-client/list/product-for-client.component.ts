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
  productInCart!: IProduct;

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private eventManager: EventManager,
    private principal: AccountService,
    private login: UserRouteAccessService
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
    this.handleNavigation();
    this.registerVarSearch();
  }

  trackId(index: number, item: IProduct): number {
    return item.id!;
  }

  delete(product: IProduct): void {
    this.loadPage();
  }

  addToCart(product: IProduct): void {
    this.principal.identity().subscribe(account => {
      if (account) {
        this.account = account;
        this.modalRef = this.modalService.open(ModaCartComponent, { backdrop: 'static', windowClass: 'width-60' });
        product.quantity = 1;
        this.modalRef.componentInstance.productInCart = product;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  fillToCart(): void {}

  registerVarSearch(): void {
    this.eventSubscriber = this.eventManager.subscribe('varSearch', res => {
      if (res) {
        if (typeof res !== 'string') {
          this.varSearch = res.content;
          this.loadPage();
        }
      }
    });
    this.eventSubscribers.push(this.eventSubscriber);
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
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  star(rate: any) {
    return new Array(rate);
  }
}
