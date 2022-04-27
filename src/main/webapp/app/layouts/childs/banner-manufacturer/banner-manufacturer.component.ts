import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { BannerService } from '../../../entities/banner/service/banner.service';
import { TypeID } from '../../../app.constants';

@Component({
  selector: 'jhi-banner-manufacturer',
  templateUrl: './banner-manufacturer.component.html',
  styleUrls: ['./banner-manufacturer.component.scss'],
})
export class BannerManufacturerComponent implements OnInit {
  productBanner!: IViewBanner;

  constructor(private translateService: TranslateService, private route: ActivatedRoute, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.productBanner = {};
    this.bannerService.getBannerManufacturer({ TypeID: TypeID.BANNER_BANNER_MANUFACTURER }).subscribe(res => {
      if (res && res.body) {
        this.productBanner = res.body;
      }
    });
  }
}
