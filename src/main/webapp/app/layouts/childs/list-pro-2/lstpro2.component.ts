import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../product-for-client/product.model';
import { ModaCartComponent } from '../../../shared/modal/modalCart/moda-cart';
import { ProductUpdateComponent } from '../../../product-for-client/update/product-update.component';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from '../../../core/util/event-manager.service';
import { AccountService } from '../../../core/auth/account.service';
import { BaseComponent } from '../../../shared/base-component/base.component';

@Component({
  selector: 'jhi-lstpro-2',
  templateUrl: './lstpro2.component.html',
  styleUrls: ['./lstpro2.component.scss'],
})
export class ListPro2Component extends BaseComponent implements OnInit {
  abc: any;
  productDoubles!: IProduct[][];
  productDoubles2!: IProduct[][];
  productBanner!: IProduct;
  productBanner2!: IProduct;

  eventSubscriber: Subscription | any;
  modalRef!: NgbModalRef;
  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private eventManager: EventManager,
    private principal: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.abc = 0;
  }

  addToCart(product: IProduct): void {
    this.principal.getAuthenticationState().subscribe(account => {
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

  viewDetail(product: IProduct) {
    this.modalRef = this.modalService.open(ProductUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.modalRef.componentInstance.product = product;
    this.modalRef.componentInstance.productDetail = product.productDetails![0];
  }
}
