import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { ListProComponent } from './list-pro/lstpro.component';
import { ListPro2Component } from './list-pro-2/lstpro2.component';
import { ListBannerComponent } from './list-banner/lstbanner.component';
import { BannerManufacturerComponent } from './banner-manufacturer/banner-manufacturer.component';
import { DoubleBannerComponent } from './double-banner/double-banner.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    BannerComponent,
    ListProComponent,
    ListPro2Component,
    ListBannerComponent,
    BannerManufacturerComponent,
    DoubleBannerComponent,
  ],
  exports: [BannerComponent, ListProComponent, ListPro2Component, ListBannerComponent, BannerManufacturerComponent, DoubleBannerComponent],
})
export class ChildsModule {}
