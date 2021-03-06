import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../../../entities/banner/service/banner.service';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { TypeID } from '../../../app.constants';

@Component({
  selector: 'jhi-double-banner',
  templateUrl: './double-banner.component.html',
  styleUrls: ['./double-banner.component.scss'],
})
export class DoubleBannerComponent implements OnInit {
  doubleBanner!: IViewBanner;
  constructor(private translateService: TranslateService, private route: ActivatedRoute, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.bannerService.getDoubleBanner({ TypeID: TypeID.BANNER_DOUBLE_BANNER }).subscribe(res => {
      if (res && res.body) {
        this.doubleBanner = res.body;
      }
    });
  }
}
