import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-lst-banner',
  templateUrl: './lstbanner.component.html',
  styleUrls: ['./lstbanner.component.scss'],
})
export class ListBannerComponent implements OnInit {
  abc: any;
  constructor(private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.abc = 0;
  }
}
