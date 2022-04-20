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
  BsDatepickerModule,
  BsDropdownConfig,
  BsDropdownModule,
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

@NgModule({
  imports: [
    SharedLibsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule,
    BsDropdownModule.forRoot(),
    ModalModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
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
  ],
  providers: [BsDropdownConfig, NgbActiveModal, TooltipConfig],
})
export class SharedModule {}
