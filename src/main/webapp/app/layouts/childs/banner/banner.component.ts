import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../product-for-client/product.model';
import { TypeID } from '../../../app.constants';
import { BannerService } from '../../../entities/banner/service/banner.service';
import { IViewBanner } from '../../../shared/model/IViewBanner';

@Component({
  selector: 'jhi-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  productBanner!: IViewBanner;
  constructor(private translateService: TranslateService, private route: ActivatedRoute, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.productBanner = {};
    this.bannerService.getThreeBanner({ TypeID: TypeID.BANNER_BANNER }).subscribe(res => {
      if (res && res.body) {
        this.productBanner = res.body;
      }
    });
  }
}
