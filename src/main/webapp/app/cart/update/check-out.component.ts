import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IOrderDetails, OrderDetails } from '../order-details.model';
import { CartService } from '../service/cart.service';
import { IOrder } from '../../entities/order/order.model';
import { AccountService } from '../../core/auth/account.service';
import { Account } from '../../core/auth/account.model';
import { OrderService } from '../../entities/order/service/order.service';
import { ProductService } from '../../entities/product/service/product.service';
import { IProduct } from '../../product-for-client/product.model';

@Component({
  selector: 'jhi-order-details-update',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit {
  isSaving = false;
  cart!: IOrder;
  orderDetails!: IOrderDetails[];
  listProducts!: IProduct[];
  user!: Account;

  city = '';
  address = '';

  constructor(
    protected orderDetailsService: CartService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private accountService: AccountService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.user = { activated: true, authorities: [], email: '', firstName: '', lastName: '', login: '', imageUrl: '', langKey: '' };
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
  }

  changeAddress() {
    if (this.city) {
      this.cart.orderAddress = this.address + ', Thành phố ' + this.city;
    }
  }

  getTotalAmount() {
    let total = 0;
    this.orderDetails.forEach(n => {
      total += n.total!;
    });
    return total;
  }
}
