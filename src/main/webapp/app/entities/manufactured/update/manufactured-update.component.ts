import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IManufactured, Manufactured } from '../manufactured.model';
import { ManufacturedService } from '../service/manufactured.service';

@Component({
  selector: 'jhi-manufactured-update',
  templateUrl: './manufactured-update.component.html',
})
export class ManufacturedUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    image: [],
    description: [],
  });

  constructor(protected manufacturedService: ManufacturedService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ manufactured }) => {
      this.updateForm(manufactured);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const manufactured = this.createFromForm();
    if (manufactured.id !== undefined) {
      this.subscribeToSaveResponse(this.manufacturedService.update(manufactured));
    } else {
      this.subscribeToSaveResponse(this.manufacturedService.create(manufactured));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IManufactured>>): void {
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

  protected updateForm(manufactured: IManufactured): void {
    this.editForm.patchValue({
      id: manufactured.id,
      name: manufactured.name,
      image: manufactured.image,
      description: manufactured.description,
    });
  }

  protected createFromForm(): IManufactured {
    return {
      ...new Manufactured(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      image: this.editForm.get(['image'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
