import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IOrderDetails, OrderDetails } from '../order-details.model';
import { OrderDetailsService } from '../service/order-details.service';

@Component({
  selector: 'jhi-order-details-update',
  templateUrl: './order-details-update.component.html',
})
export class OrderDetailsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    productID: [],
    orderID: [],
    quantity: [],
    unitPrice: [],
    total: [],
  });

  constructor(protected orderDetailsService: OrderDetailsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderDetails }) => {
      this.updateForm(orderDetails);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderDetails = this.createFromForm();
    if (orderDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.orderDetailsService.update(orderDetails));
    } else {
      this.subscribeToSaveResponse(this.orderDetailsService.create(orderDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderDetails>>): void {
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

  protected updateForm(orderDetails: IOrderDetails): void {
    this.editForm.patchValue({
      id: orderDetails.id,
      productID: orderDetails.productID,
      orderID: orderDetails.orderID,
      quantity: orderDetails.quantity,
      unitPrice: orderDetails.unitPrice,
      total: orderDetails.total,
    });
  }

  protected createFromForm(): IOrderDetails {
    return {
      ...new OrderDetails(),
      id: this.editForm.get(['id'])!.value,
      productID: this.editForm.get(['productID'])!.value,
      orderID: this.editForm.get(['orderID'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      total: this.editForm.get(['total'])!.value,
    };
  }
}
