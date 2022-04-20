import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-double-banner',
  templateUrl: './double-banner.component.html',
  styleUrls: ['./double-banner.component.scss'],
})
export class DoubleBannerComponent implements OnInit {
  abc: any;
  constructor(private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.abc = 0;
  }
}
