import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IVoucher, Voucher } from '../voucher.model';
import { VoucherService } from '../service/voucher.service';

@Component({
  selector: 'jhi-voucher-update',
  templateUrl: './voucher-update.component.html',
})
export class VoucherUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    voucherCode: [],
    productID: [],
    promotionPrice: [],
    dateIssue: [],
    status: [],
  });

  constructor(protected voucherService: VoucherService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ voucher }) => {
      this.updateForm(voucher);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const voucher = this.createFromForm();
    if (voucher.id !== undefined) {
      this.subscribeToSaveResponse(this.voucherService.update(voucher));
    } else {
      this.subscribeToSaveResponse(this.voucherService.create(voucher));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoucher>>): void {
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

  protected updateForm(voucher: IVoucher): void {
    this.editForm.patchValue({
      id: voucher.id,
      voucherCode: voucher.voucherCode,
      productID: voucher.productID,
      promotionPrice: voucher.promotionPrice,
      dateIssue: voucher.dateIssue,
      status: voucher.status,
    });
  }

  protected createFromForm(): IVoucher {
    return {
      ...new Voucher(),
      id: this.editForm.get(['id'])!.value,
      voucherCode: this.editForm.get(['voucherCode'])!.value,
      productID: this.editForm.get(['productID'])!.value,
      promotionPrice: this.editForm.get(['promotionPrice'])!.value,
      dateIssue: this.editForm.get(['dateIssue'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
