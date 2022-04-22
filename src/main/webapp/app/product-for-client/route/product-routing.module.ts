import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProductClientComponent } from '../list/product-for-client.component';
import { ProductUpdateComponent } from '../update/product-update.component';
import { ProductRoutingResolveService } from './product-routing-resolve.service';

const productRoute: Routes = [
  {
    path: '',
    component: ProductClientComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'new',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoute)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
