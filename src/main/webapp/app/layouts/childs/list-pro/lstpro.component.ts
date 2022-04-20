import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-lstpro',
  templateUrl: './lstpro.component.html',
  styleUrls: ['./lstpro.component.scss'],
})
export class ListProComponent implements OnInit {
  abc: any;
  constructor(private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.abc = 0;
  }
}
