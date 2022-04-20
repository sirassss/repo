import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrderDetailsUpdateComponent } from './update/order-details-update.component';
import { OrderDetailsRoutingModule } from './route/order-details-routing.module';
import { CartComponent } from './list-product/cart.component';

@NgModule({
  imports: [SharedModule, OrderDetailsRoutingModule],
  declarations: [OrderDetailsUpdateComponent, CartComponent],
})
export class OrderDetailsModule {}
