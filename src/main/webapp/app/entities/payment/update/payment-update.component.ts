import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPayment, Payment } from '../payment.model';
import { PaymentService } from '../service/payment.service';
import { IOrder } from '../../order/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderDetailsService } from '../../order-details/service/order-details.service';
import { IOrderDetails } from '../../../cart/order-details.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EventManager } from '../../../core/util/event-manager.service';

@Component({
  selector: 'jhi-payment-update',
  templateUrl: './payment-update.component.html',
})
export class PaymentUpdateComponent implements OnInit {
  isSaving = false;
  payment!: IPayment;
  listData!: MatTableDataSource<IPayment>;
  order!: IOrder;
  oderDetail!: IOrderDetails[];

  @ViewChild(MatSort) sortd!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productsLength!: number;
  columns: string[] = ['index', 'image', 'name', 'quantity', 'total'];

  constructor(
    protected paymentService: PaymentService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private orderDetailsService: OrderDetailsService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private translate: TranslateService,
    private eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.order = {};
    this.orderDetailsService.getByOderID({ orderID: this.payment.orderID }).subscribe(res => {
      if (res && res.body) {
        this.oderDetail = res.body;
        this.listData = new MatTableDataSource(this.oderDetail);
        this.listData.sort = this.sortd;
        this.listData.paginator = this.paginator;
      }
    });
  }

  save(): void {
    this.isSaving = true;
    if (this.payment.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentService.update(this.payment));
    } else {
      this.subscribeToSaveResponse(this.paymentService.create(this.payment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    if (this.payment.status === 1) {
      this.toastr.success('Đang giao hàng');
    } else if (this.payment.status === 2) {
      this.toastr.success('Đã thanh toán');
    } else if (this.payment.status === 3) {
      this.toastr.success('Hủy đơn thành công');
    }
    this.closePopup(true);
  }

  protected onSaveError(): void {
    this.toastr.error(this.translate.instant('error.internalServerError'));
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  confirm() {
    this.payment.status = 1;
    this.save();
  }

  cancel() {
    this.payment.status = 3;
    this.save();
  }

  paid() {
    this.payment.status = 2;
    this.save();
  }

  closePopup(reason?: any) {
    if (reason) {
      this.activeModal.close(reason);
    } else {
      this.activeModal.close(false);
    }
  }
}
