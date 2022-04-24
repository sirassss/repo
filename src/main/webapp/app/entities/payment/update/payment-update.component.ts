import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPayment, Payment } from '../payment.model';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'jhi-payment-update',
  templateUrl: './payment-update.component.html',
})
export class PaymentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    orderDetailID: [],
    bankID: [],
    status: [],
  });

  constructor(protected paymentService: PaymentService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => {
      this.updateForm(payment);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payment = this.createFromForm();
    if (payment.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentService.update(payment));
    } else {
      this.subscribeToSaveResponse(this.paymentService.create(payment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(payment: IPayment): void {
    this.editForm.patchValue({
      id: payment.id,
      orderDetailID: payment.orderDetailID,
      bankID: payment.bankID,
      status: payment.status,
    });
  }

  protected createFromForm(): IPayment {
    return {
      ...new Payment(),
      id: this.editForm.get(['id'])!.value,
      orderDetailID: this.editForm.get(['orderDetailID'])!.value,
      bankID: this.editForm.get(['bankID'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
