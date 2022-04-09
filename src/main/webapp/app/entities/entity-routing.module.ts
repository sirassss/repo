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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
