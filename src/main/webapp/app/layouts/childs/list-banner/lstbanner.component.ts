import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IViewBanner } from '../../../shared/model/IViewBanner';
import { TypeID } from '../../../app.constants';
import { BannerService } from '../../../entities/banner/service/banner.service';

@Component({
  selector: 'jhi-lst-banner',
  templateUrl: './lstbanner.component.html',
  styleUrls: ['./lstbanner.component.scss'],
})
export class ListBannerComponent implements OnInit {
  listProduct!: IViewBanner[];
  constructor(private translateService: TranslateService, private route: ActivatedRoute, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.bannerService.getLstBanner({ TypeID: TypeID.BANNER_LIST_BANNER }).subscribe(res => {
      if (res && res.body) {
        this.listProduct = res.body;
      }
    });
  }
}
