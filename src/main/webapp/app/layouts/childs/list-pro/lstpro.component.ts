import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../../../entities/banner/service/banner.service';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { IProduct } from '../../../product-for-client/product.model';
import { TypeID } from '../../../app.constants';
import { ModaCartComponent } from '../../../shared/modal/modalCart/moda-cart';
import { AccountService } from '../../../core/auth/account.service';
import { BaseComponent } from '../../../shared/base-component/base.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ProductUpdateComponent } from '../../../product-for-client/update/product-update.component';

@Component({
  selector: 'jhi-lstpro',
  templateUrl: './lstpro.component.html',
  styleUrls: ['./lstpro.component.scss'],
})
export class ListProComponent extends BaseComponent implements OnInit {
  listProduct!: IViewBanner;
  productDoubles!: IProduct[][];

  eventSubscriber: Subscription | any;
  modalRef!: NgbModalRef;

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private bannerService: BannerService,
    private principal: AccountService,
    protected router: Router,
    protected modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    this.productDoubles = [[]];
    this.bannerService.getListProduct({ TypeID: TypeID.BANNER_LIST_PRO }).subscribe(res => {
      if (res && res.body) {
        this.listProduct = res.body;
        this.productDoubles = this.listProduct.listProduct2!;
      }
    });
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
