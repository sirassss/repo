import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { VoucherService } from '../service/voucher.service';
import { IVoucher } from '../../../shared/modal/voucher/voucher.model';
import { DATE_FORMAT_SLASH } from 'app/config/input.constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventManager } from '../../../core/util/event-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-voucher-update',
  templateUrl: './voucher-update.component.html',
})
export class VoucherUpdateComponent implements OnInit {
  voucher!: IVoucher;
  voucherID!: number;
  isSaving = false;

  DATE_FORMAT_SLASH = DATE_FORMAT_SLASH;
  bsValue = new Date();

  editForm = this.fb.group({
    id: [],
    voucherCode: [],
    productID: [],
    promotionPrice: [],
    dateIssue: [],
    status: [],
  });

  constructor(
    protected voucherService: VoucherService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private eventManager: EventManager,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.voucher = {};
    if (this.voucherID) {
      this.voucherService.find(this.voucherID).subscribe(res => {
        if (res && res.body) {
          this.voucher = res.body;
          this.updateForm(this.voucher);
        }
      });
    }
  }

  save(): void {
    this.isSaving = true;
    if (this.voucher.id !== undefined) {
      this.subscribeToSaveResponse(this.voucherService.update(this.voucher));
    } else {
      this.subscribeToSaveResponse(this.voucherService.create(this.voucher));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoucher>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    if (this.voucher.id) {
      this.toastr.success('Sửa mã giảm thành công');
    } else {
      this.toastr.success('Thêm mã giảm phẩm thành công');
    }
    this.eventManager.broadcast({
      name: 'newvou',
      content: { data: true },
    });
  }

  protected onSaveError(): void {
    this.toastr.error(this.translate.instant('error.internalServerError'));
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
    this.closePopup();
  }

  protected updateForm(voucher: IVoucher): void {}

  closePopup() {
    this.activeModal.close(false);
  }
}
