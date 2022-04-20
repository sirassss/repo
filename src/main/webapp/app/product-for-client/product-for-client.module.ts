import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductClientComponent } from './list/product-for-client.component';
import { ProductUpdateComponent } from './update/product-update.component';
import { ProductRoutingModule } from './route/product-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [SharedModule, ProductRoutingModule],
  declarations: [ProductClientComponent, ProductUpdateComponent],
})
export class ProductClientModule {}
