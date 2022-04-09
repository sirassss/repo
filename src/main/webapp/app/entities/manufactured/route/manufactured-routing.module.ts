import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ManufacturedComponent } from '../list/manufactured.component';
import { ManufacturedDetailComponent } from '../detail/manufactured-detail.component';
import { ManufacturedUpdateComponent } from '../update/manufactured-update.component';
import { ManufacturedRoutingResolveService } from './manufactured-routing-resolve.service';

const manufacturedRoute: Routes = [
  {
    path: '',
    component: ManufacturedComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ManufacturedDetailComponent,
    resolve: {
      manufactured: ManufacturedRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ManufacturedUpdateComponent,
    resolve: {
      manufactured: ManufacturedRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ManufacturedUpdateComponent,
    resolve: {
      manufactured: ManufacturedRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(manufacturedRoute)],
  exports: [RouterModule],
})
export class ManufacturedRoutingModule {}
