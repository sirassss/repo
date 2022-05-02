import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IOrderDetails, OrderDetails } from '../order-details.model';
import { CartService } from '../service/cart.service';
import { IOrder } from '../../entities/order/order.model';
import { AccountService } from '../../core/auth/account.service';
import { Account } from '../../core/auth/account.model';
import { OrderService } from '../../entities/order/service/order.service';
import { ProductService } from '../../entities/product/service/product.service';
import { IProduct } from '../../product-for-client/product.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../shared/base-component/base.component';
import { Observable, Subscription } from 'rxjs';
import { EventManager } from '../../core/util/event-manager.service';
import { IPayment } from '../../entities/payment/payment.model';
import { finalize } from 'rxjs/operators';
import { PaymentService } from '../../entities/payment/service/payment.service';
import { IBank } from '../../entities/bank/bank.model';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { VoucherComponent } from '../../shared/modal/voucher/list/voucher.component';

@Component({
  selector: 'jhi-order-details-update',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent extends BaseComponent implements OnInit {
  isSaving = false;
  cart!: IOrder;
  orderDetails!: IOrderDetails[];
  listProducts!: IProduct[];
  user!: Account;
  modalRef!: NgbModalRef;
  eventSubscriber: Subscription | any;
  paymentMethod!: any;
  payment!: IPayment;
  bank!: IBank | any;

  city = '';
  address = '';

  constructor(
    protected orderDetailsService: CartService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private accountService: AccountService,
    private orderService: OrderService,
    private productService: ProductService,
    protected modalService: NgbModal,
    private eventManager: EventManager,
    protected paymentService: PaymentService,
    private toastr: ToastrService,
    private translate: TranslateService,
    protected router: Router
  ) {
    super();
  }

  setupValue() {
    this.user = {
      activated: true,
      authorities: [],
      email: '',
      firstName: '',
      lastName: '',
      login: '',
      imageUrl: '',
      langKey: '',
      phone: '',
    };
    this.cart = { orderPhone: '', orderAddress: '' };
    this.orderDetails = [];
    this.bank = {};
  }

  ngOnInit(): void {
    this.setupValue();
    this.accountService.getAuthenticationState().subscribe(account => (this.user = account!));
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
    this.registerChangeCart();
  }

  changeAddress() {
    if (this.city) {
      this.cart.orderAddress = this.address + ', Thành phố ' + this.city;
    }
  }

  getTotalAmount() {
    let total = 0;
    this.orderDetails.forEach(n => {
      total += n.total ? n.total! : 0;
    });
    if (!this.cart.totalAmount || this.cart.totalAmount === 0) {
      this.cart.totalAmount = total;
    }
    return total;
  }

  selectVoucher() {
    this.modalRef = this.modalService.open(VoucherComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.modalRef.componentInstance.cart = this.cart;
  }

  registerChangeCart(): void {
    this.eventSubscriber = this.eventManager.subscribe('addCartSuccess', () => {
      this.orderService.findOderUnpaid().subscribe(res => {
        if (res && res.body) {
          this.cart = res.body;
        }
      });
    });
    this.eventSubscribers.push(this.eventSubscriber);
  }

  checkOut() {
    this.cart.status = true;
    if (this.bank) {
      this.cart.banks = [];
      this.cart.banks?.push(this.bank);
      this.save(this.cart);
    } else {
      this.cart.banks = [];
      this.save(this.cart);
    }
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
    this.toastr.success(this.translate.instant('sellphonealamApp.order.saveOnSuccess'));
    this.eventManager.broadcast({
      name: 'addCartSuccess',
      content: { data: true },
    });
    this.router.navigate(['/']);
  }

  protected onSaveError(): void {
    this.toastr.error(this.translate.instant('error.internalServerError'));
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  changePaymentMethod() {
    if (this.paymentMethod === 0) {
      this.bank = null;
      this.cart.banks?.splice(0, 1);
    }
  }
}
