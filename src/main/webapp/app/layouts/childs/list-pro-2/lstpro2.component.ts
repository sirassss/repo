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
import { BannerService } from '../../../entities/banner/service/banner.service';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { Constant, TypeID } from '../../../app.constants';

@Component({
  selector: 'jhi-lstpro-2',
  templateUrl: './lstpro2.component.html',
  styleUrls: ['./lstpro2.component.scss'],
})
export class ListPro2Component extends BaseComponent implements OnInit {
  abc: any;
  productDoubles!: IProduct[];
  productDoubles2!: IProduct[][];
  productBanner!: IProduct;
  productBanner2!: IProduct;
  listProduct!: IViewBanner;

  eventSubscriber: Subscription | any;
  modalRef!: NgbModalRef;
  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private eventManager: EventManager,
    private principal: AccountService,
    private bannerService: BannerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.productBanner = {};
    this.productDoubles = [];
    this.bannerService.getListBanner({ TypeID: TypeID.BANNER_LIST_PRO_2 }).subscribe(res => {
      if (res && res.body) {
        this.listProduct = res.body;
        this.productBanner = this.listProduct.productBottom!;
        this.productDoubles = this.listProduct.listProduct!;
        this.productDoubles.forEach(n => {
          n.isPromotion = n.vouchers!.length > 0;
          n.promotionPrice = n.unitPrice! - (n.unitPrice! * (n.vouchers![0] ? n.vouchers![0].promotionRate! : 0)) / 100;
          n.image = n.productDetails![0].imageUrl;
        });
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
