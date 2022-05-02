import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IManufactured, Manufactured } from '../manufactured.model';
import { ManufacturedService } from '../service/manufactured.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventManager } from '../../../core/util/event-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-manufactured-update',
  templateUrl: './manufactured-update.component.html',
})
export class ManufacturedUpdateComponent implements OnInit {
  isSaving = false;
  manufactured!: IManufactured;
  manufacturedID!: number;

  url: string = '';

  constructor(
    protected manufacturedService: ManufacturedService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private eventManager: EventManager,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.manufactured = {};
    if (this.manufacturedID) {
      this.manufacturedService.find(this.manufacturedID).subscribe(res => {
        if (res && res.body) {
          this.manufactured = res.body;
          this.updateForm(this.manufactured);
        }
      });
    }
  }

  save(): void {
    this.isSaving = true;
    this.manufactured.image = this.url;
    if (this.manufactured.id !== undefined) {
      this.subscribeToSaveResponse(this.manufacturedService.update(this.manufactured));
    } else {
      this.subscribeToSaveResponse(this.manufacturedService.create(this.manufactured));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IManufactured>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    if (this.manufactured.id) {
      this.toastr.success('Sửa hãng thành công');
    } else {
      this.toastr.success('Thêm hãng phẩm thành công');
    }
    this.eventManager.broadcast({
      name: 'newmanu',
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

  protected updateForm(manufactured: IManufactured): void {}

  closePopup() {
    this.activeModal.close(false);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
        console.log(this.url);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
