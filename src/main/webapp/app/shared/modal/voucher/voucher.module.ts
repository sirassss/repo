import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VoucherComponent } from './list/voucher.component';
import { VoucherUpdateComponent } from './update/voucher-update.component';
import { VoucherRoutingModule } from './route/voucher-routing.module';

@NgModule({
  imports: [SharedModule, VoucherRoutingModule],
  declarations: [VoucherComponent, VoucherUpdateComponent],
})
export class VoucherModule {}
