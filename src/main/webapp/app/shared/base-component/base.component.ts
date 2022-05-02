import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as $ from 'jquery';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  eventSubscribers: Subscription[] = [];
  units: any[] | any = [];
  account: any;
  currentAccount: any;

  ngOnDestroy(): void {
    if (this.eventSubscribers) {
      this.eventSubscribers.forEach(ev => {
        ev.unsubscribe();
      });
    }
  }

  canDeactive(): any {}
}
