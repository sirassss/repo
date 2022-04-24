import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EventManager } from '../../../core/util/event-manager.service';
import { AccountService } from '../../../core/auth/account.service';
import { finalize, map } from 'rxjs/operators';
import { IProduct } from '../../../product-for-client/product.model';
import { IOrder } from '../../../entities/order/order.model';
import { IOrderDetails } from '../../../cart/order-details.model';
import { OrderService } from '../../../entities/order/service/order.service';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IVoucher } from '../../../entities/voucher/voucher.model';

@Component({
  selector: 'jhi-product-for-client',
  templateUrl: './modal-voucher.html',
  styleUrls: ['./modal-voucher.scss'],
})
export class ModalVoucherComponent implements OnInit {
  eventSubscriber: Subscription | any;
  modalRef: NgbModalRef | any;

  productInCart!: IProduct;
  cart!: IOrder;
  vouchers!: IVoucher;
  private isSaving = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private eventManager: EventManager,
    private principal: AccountService,
    private activeModal: NgbActiveModal,
    private orderService: OrderService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

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

  ngOnInit(): void {
    this.orderService.findOderUnpaid().subscribe(res => {
      if (res && res.body) {
        this.cart = res.body;
      }
    });
  }
}
