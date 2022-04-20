import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-banner-manufacturer',
  templateUrl: './banner-manufacturer.component.html',
  styleUrls: ['./banner-manufacturer.component.scss'],
})
export class BannerManufacturerComponent implements OnInit {
  abc: any;
  constructor(private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.abc = 0;
  }
}
