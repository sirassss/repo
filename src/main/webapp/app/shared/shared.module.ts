import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import {
  AccordionModule,
  BsDatepickerConfig,
  BsDatepickerModule,
  BsDropdownConfig,
  BsDropdownModule,
  BsLocaleService,
  ModalModule,
  PaginationModule,
  TabsModule,
  TooltipConfig,
  TooltipModule,
} from 'ngx-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ModaCartComponent } from './modal/modalCart/moda-cart';
import { ToastrModule } from 'ngx-toastr';
import { ModalVoucherComponent } from './modal/modalVoucher/modal-voucher';
import { ConfirmLeaveComponent } from './can-deactive-guard/confirm-leave.component';
import { CurrencyMaskDirective } from './directive/currency-input/currency.directive';
import { EbCurrencyPipe } from './directive/currency-input/currency.pipe';
import { CurrencyMaskModule } from './directive/ng2-currency-mask/currency-mask.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';

@NgModule({
  imports: [
    SharedLibsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule,
    BsDropdownModule.forRoot(),
    ModalModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    TabsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    CurrencyMaskModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BsDatepickerModule,
  ],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    ModaCartComponent,
    ModalVoucherComponent,
    ConfirmLeaveComponent,
    CurrencyMaskDirective,
    EbCurrencyPipe,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    TooltipModule,
    ModaCartComponent,
    ToastrModule,
    ModalVoucherComponent,
    CurrencyMaskDirective,
    EbCurrencyPipe,
    CurrencyMaskModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BsDatepickerModule,
  ],
  providers: [BsDropdownConfig, NgbActiveModal, TooltipConfig, EbCurrencyPipe, BsDatepickerConfig, BsLocaleService],
})
export class SharedModule {}
