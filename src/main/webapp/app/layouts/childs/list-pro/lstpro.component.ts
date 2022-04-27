import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../../../entities/banner/service/banner.service';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { IProduct } from '../../../product-for-client/product.model';
import { TypeID } from '../../../app.constants';

@Component({
  selector: 'jhi-lstpro',
  templateUrl: './lstpro.component.html',
  styleUrls: ['./lstpro.component.scss'],
})
export class ListProComponent implements OnInit {
  listProduct!: IViewBanner;
  productDoubles!: IProduct[];

  constructor(private translateService: TranslateService, private route: ActivatedRoute, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.productDoubles = [];
    this.bannerService.getListProduct({ TypeID: TypeID.BANNER_LIST_PRO }).subscribe(res => {
      if (res && res.body) {
        this.listProduct = res.body;
        this.productDoubles = this.listProduct.listProduct2!;
      }
    });
  }
}
