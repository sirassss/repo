import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CheckOutComponent } from '../update/check-out.component';
import { OrderDetailsRoutingResolveService } from './order-details-routing-resolve.service';
import { CartComponent } from '../list-product/cart.component';
import { CanDeactiveGuardService } from '../../shared/can-deactive-guard/can-deactive-guard.service';

const orderDetailsRoute: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    resolve: {
      orderDetails: OrderDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CheckOutComponent,
    resolve: {
      orderDetails: OrderDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderDetailsRoute)],
  exports: [RouterModule],
})
export class OrderDetailsRoutingModule {}
