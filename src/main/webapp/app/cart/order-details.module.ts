import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CheckOutComponent } from './update/check-out.component';
import { OrderDetailsRoutingModule } from './route/order-details-routing.module';
import { CartComponent } from './list-product/cart.component';

@NgModule({
  imports: [SharedModule, OrderDetailsRoutingModule],
  declarations: [CheckOutComponent, CartComponent],
})
export class OrderDetailsModule {}
