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
        path: 'product-client',
        data: { pageTitle: 'sellphonealamApp.product.home.title' },
        loadChildren: () => import('../product-for-client/product-for-client.module').then(m => m.ProductClientModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'sellphonealamApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'cart',
        data: { pageTitle: 'sellphonealamApp.orderDetails.home.title' },
        loadChildren: () => import('../cart/order-details.module').then(m => m.OrderDetailsModule),
      },
      {
        path: 'manufactured',
        data: { pageTitle: 'sellphonealamApp.manufactured.home.title' },
        loadChildren: () => import('./manufactured/manufactured.module').then(m => m.ManufacturedModule),
      },
      {
        path: 'bank',
        data: { pageTitle: 'sellphonealamApp.bank.home.title' },
        loadChildren: () => import('./bank/bank.module').then(m => m.BankModule),
      },
      {
        path: 'payment',
        data: { pageTitle: 'sellphonealamApp.payment.home.title' },
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
