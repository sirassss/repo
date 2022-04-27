import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVoucher } from '../voucher.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { VoucherService } from '../service/voucher.service';
import { PageChangedEvent } from 'ngx-bootstrap';

import * as dayjs from 'dayjs';
import { finalize } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IProduct } from '../../../../product-for-client/product.model';
import { IOrder } from '../../../../entities/order/order.model';
import { EventManager } from '../../../../core/util/event-manager.service';
import { OrderService } from '../../../../entities/order/service/order.service';

@Component({
  selector: 'jhi-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  vouchers!: IVoucher[];
  isLoading = false;
  private isSaving = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  pageChangeEvent!: PageChangedEvent;
  eventSubscriber: Subscription | any;

  productInCart!: IProduct;
  cart!: IOrder;

  constructor(
    protected voucherService: VoucherService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private eventManager: EventManager,
    private orderService: OrderService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  loadPage(pageChangeEvent: PageChangedEvent, dontNavigate?: boolean): void {
    this.isLoading = true;
    pageChangeEvent.itemsPerPage = this.itemsPerPage;
    let pageToLoad: number = pageChangeEvent.page ?? this.page ?? 1;
    this.voucherService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IVoucher[]>) => {
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
  }

  trackId(index: number, item: IVoucher): number {
    return item.id!;
  }

  delete(voucher: IVoucher): void {}

  protected sort(): string[] {
    return ['id,DESC'];
  }

  protected handleNavigation(): void {
    this.pageChangeEvent = { page: this.page, itemsPerPage: this.itemsPerPage };
    this.loadPage(this.pageChangeEvent, true);
  }

  protected onSuccess(data: IVoucher[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/voucher'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.vouchers = data ?? [];
    this.vouchers.forEach(n => {
      n.isSelect = !!this.cart.voucherID;
    });
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  closePopup() {
    this.activeModal.close(false);
  }

  save(order: IOrder): void {
    this.isSaving = true;
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      order.createdDate = dayjs(new Date());
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'addCartSuccess',
      content: { data: true },
    });
    this.closePopup();
  }

  protected onSaveError(): void {
    this.toastr.error(this.translate.instant('error.internalServerError'));
    this.closePopup();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  applyVoucher(voucher: IVoucher) {
    if (this.cart.totalAmount) {
      let total = 0;
      this.cart.orderDetails?.forEach(n => {
        total += n.total ? n.total : 0;
      });
      this.cart.totalAmount = total - total * (voucher.promotionRate ? voucher.promotionRate / 100 : 0);
      this.cart.voucherID = voucher.id;
      this.save(this.cart);
      this.closePopup();
    }
  }
}
