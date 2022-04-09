import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IManufactured } from '../manufactured.model';

@Component({
  selector: 'jhi-manufactured-detail',
  templateUrl: './manufactured-detail.component.html',
})
export class ManufacturedDetailComponent implements OnInit {
  manufactured: IManufactured | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ manufactured }) => {
      this.manufactured = manufactured;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
