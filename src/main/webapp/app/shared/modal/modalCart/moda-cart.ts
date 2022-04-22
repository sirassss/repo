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

@Component({
  selector: 'jhi-product-for-client',
  templateUrl: './moda-cart.html',
  styleUrls: ['./moda-cart.scss'],
})
export class ModaCartComponent implements OnInit {
  eventSubscriber: Subscription | any;
  modalRef: NgbModalRef | any;

  varSearch: any;
  productInCart!: IProduct;
  cart!: IOrder;
  productCart!: IOrderDetails;
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

  fillToCart(): void {
    this.productCart.productID = this.productInCart.id;
    this.productCart.quantity = this.productInCart.quantity;
    this.productCart.unitPrice = this.productInCart.unitPrice;
    this.productCart.total = this.productInCart.unitPrice! * this.productInCart.quantity!;
    let productCart = this.cart.orderDetails?.find(n => n.productID === this.productCart.productID);
    if (productCart) {
      const index = this.cart.orderDetails?.indexOf(productCart);
      this.cart.orderDetails?.splice(index!, 1);
      productCart.quantity! += this.productCart.quantity!;
      productCart.total! += this.productCart.total;
      this.cart.orderDetails?.push(productCart);
    } else {
      this.cart.orderDetails?.push(this.productCart);
    }
    this.save(this.cart);
  }

  star(rate: any) {
    return new Array(rate);
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

  ngOnInit(): void {
    this.orderService.findOderUnpaid().subscribe(
      res => {
        if (res && res.body) {
          this.cart = res.body;
          this.productCart = {};
        }
      },
      () => {
        this.cart = { status: false, orderDetails: [] };
        this.productCart = {};
      }
    );
  }
}
