import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { OrderDetailsService } from '../service/order-details.service';
import { IOrderDetails, OrderDetails } from '../../../cart/order-details.model';

@Injectable({ providedIn: 'root' })
export class OrderDetailsRoutingResolveService implements Resolve<IOrderDetails> {
  constructor(protected service: OrderDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((orderDetails: HttpResponse<OrderDetails>) => {
          if (orderDetails.body) {
            return of(orderDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrderDetails());
  }
}
