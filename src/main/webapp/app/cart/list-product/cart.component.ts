import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IOrderDetails } from '../order-details.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { CartService } from '../service/cart.service';
import { IOrder } from '../../entities/order/order.model';
import { OrderService } from '../../entities/order/service/order.service';
import { IProduct } from '../../product-for-client/product.model';
import { ProductService } from '../../entities/product/service/product.service';
import * as dayjs from 'dayjs';
import { finalize } from 'rxjs/operators';
import { EventManager } from '../../core/util/event-manager.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ModaCartComponent } from '../../shared/modal/modalCart/moda-cart';
import { ModalVoucherComponent } from '../../shared/modal/modalVoucher/modal-voucher';
import { BaseComponent } from '../../shared/base-component/base.component';
import { UtilsService } from '../../shared/UtilsService/Utils.service';
import { VoucherComponent } from '../../entities/voucher/list/voucher.component';

@Component({
  selector: 'jhi-cart-checkout',
  templateUrl: './cart.component.html',
})
export class CartComponent extends BaseComponent implements OnInit, OnDestroy {
  cart!: IOrder;
  orderDetails!: IOrderDetails[];
  orderDetailsCopy!: IOrderDetails[];
  isLoading = false;
  listProducts!: IProduct[];
  private isSaving = false;
  modalRef!: NgbModalRef;

  constructor(
    protected orderDetailsService: CartService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private orderService: OrderService,
    private productService: ProductService,
    private eventManager: EventManager,
    private toastr: ToastrService,
    private translate: TranslateService,
    public utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.cart = { status: false, orderDetails: [] };
    this.orderDetails = [];
    this.orderService.findOderUnpaid().subscribe(res => {
      if (res && res.body) {
        this.cart = res.body;
        this.orderDetails = this.cart.orderDetails!;
        this.orderDetails.forEach(n => (n.product = {}));
        const listid = this.orderDetails.map(n => n.productID);
        this.productService.findListProductById({ productID: listid }).subscribe(res2 => {
          if (res2 && res2.body) {
            this.listProducts = res2.body;
            this.orderDetails.forEach(n => {
              n.product = this.listProducts.find(m => m.id === n.productID);
            });
          }
          this.copy();
        });
      }
    });
  }

  updateCart() {
    this.isSaving = true;
    this.cart.orderDetails = this.orderDetails;
    if (this.cart.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(this.cart));
    } else {
      this.cart.createdDate = dayjs(new Date());
      this.subscribeToSaveResponse(this.orderService.create(this.cart));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.copy();
    this.eventManager.broadcast({
      name: 'addCartSuccess',
      content: { data: true },
    });
  }

  protected onSaveError(): void {
    this.toastr.error(this.translate.instant('error.internalServerError'));
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  getTotalAmount() {
    this.cart.totalAmount = 0;
    this.orderDetails.forEach(n => {
      this.cart.totalAmount! += n.total ? n.total! : 0;
    });
    return this.cart.totalAmount;
  }

  checkOut() {
    this.router.navigate(['./cart/checkout']);
  }

  deleteInCart(index: number) {
    this.orderDetails?.splice(index, 1);
    this.updateCart();
  }

  changeQuantity() {
    this.orderDetails.forEach(n => {
      n.total = n.quantity! * n.unitPrice!;
    });
  }

  copy() {
    this.orderDetailsCopy = this.orderDetails.map(object => ({ ...object }));
  }

  canDeactive(): boolean {
    if (this.orderDetails) {
      return this.utilsService.isEquivalentArray(this.orderDetails, this.orderDetailsCopy);
    } else {
      return true;
    }
  }
  ngOnDestroy() {
    if (this.orderDetails) {
      if (!this.utilsService.isEquivalentArray(this.orderDetails, this.orderDetailsCopy)) {
        this.updateCart();
      }
    }
  }
}
