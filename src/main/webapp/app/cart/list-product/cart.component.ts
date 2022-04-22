import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'jhi-cart-checkout',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart!: IOrder;
  orderDetails!: IOrderDetails[];
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
    private translate: TranslateService
  ) {}

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
        });
      }
    });
  }

  updateCart() {
    this.isSaving = true;
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
    let total = 0;
    this.orderDetails.forEach(n => {
      total += n.total!;
    });
    return total;
  }

  checkOut() {
    this.router.navigate(['./cart/checkout']);
  }

  selectVoucher() {
    this.modalRef = this.modalService.open(ModalVoucherComponent, { backdrop: 'static', windowClass: 'width-60' });
  }
}
