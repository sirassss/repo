import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-lstpro-2',
  templateUrl: './lstpro2.component.html',
  styleUrls: ['./lstpro2.component.scss'],
})
export class ListPro2Component implements OnInit {
  abc: any;
  constructor(private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.abc = 0;
  }
}
