import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'voucher',
        data: { pageTitle: 'sellphonealamApp.voucher.home.title' },
        loadChildren: () => import('./voucher/voucher.module').then(m => m.VoucherModule),
      },
      {
        path: 'product-details',
        data: { pageTitle: 'sellphonealamApp.productDetails.home.title' },
        loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'sellphonealamApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'sellphonealamApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'order-details',
        data: { pageTitle: 'sellphonealamApp.orderDetails.home.title' },
        loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
