import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as $ from 'jquery';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  eventSubscribers: Subscription[] = [];
  isEnter: any;
  selectedRow?: any;
  object: any;
  objects: any[] | any;
  lstDataForSetDefault: any[] | any;
  expenseItems: any[] = [];
  accountingObjects: any[] = [];
  accountingObjectKHs: any[] = [];
  accountingObjectNCCs: any[] = [];
  accountingObjectNVs: any[] = [];
  employees: any[] = [];
  bankAccountDetails: any[] = [];
  materialGoodsList: any[] = [];
  repositories: any[] = [];
  isCbbSaveAndNew: boolean | any;
  details: any;
  currentRow: any;
  parent: any;
  careerTaxes: any[] = [];
  businessTypes: any[] = [];
  units: any[] | any = [];
  noUseEnter: boolean | any;
  account: any;
  currentAccount: any;
  businessLocations: any;

  ngOnDestroy(): void {
    if (this.eventSubscribers) {
      this.eventSubscribers.forEach(ev => {
        ev.unsubscribe();
      });
    }
  }
}
