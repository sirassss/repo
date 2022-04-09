import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProductDetails, ProductDetails } from '../product-details.model';
import { ProductDetailsService } from '../service/product-details.service';

@Component({
  selector: 'jhi-product-details-update',
  templateUrl: './product-details-update.component.html',
})
export class ProductDetailsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    productID: [],
    manufacturerID: [],
    capacity: [],
    screen: [],
    camera: [],
    oSAndCPU: [],
    pIN: [],
    imageUrl: [],
    color: [],
    description: [],
  });

  constructor(
    protected productDetailsService: ProductDetailsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productDetails }) => {
      this.updateForm(productDetails);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productDetails = this.createFromForm();
    if (productDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.productDetailsService.update(productDetails));
    } else {
      this.subscribeToSaveResponse(this.productDetailsService.create(productDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductDetails>>): void {
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

  protected updateForm(productDetails: IProductDetails): void {
    this.editForm.patchValue({
      id: productDetails.id,
      productID: productDetails.productID,
      manufacturerID: productDetails.manufacturerID,
      capacity: productDetails.capacity,
      screen: productDetails.screen,
      camera: productDetails.camera,
      oSAndCPU: productDetails.oSAndCPU,
      pIN: productDetails.pIN,
      imageUrl: productDetails.imageUrl,
      color: productDetails.color,
      description: productDetails.description,
    });
  }

  protected createFromForm(): IProductDetails {
    return {
      ...new ProductDetails(),
      id: this.editForm.get(['id'])!.value,
      productID: this.editForm.get(['productID'])!.value,
      manufacturerID: this.editForm.get(['manufacturerID'])!.value,
      capacity: this.editForm.get(['capacity'])!.value,
      screen: this.editForm.get(['screen'])!.value,
      camera: this.editForm.get(['camera'])!.value,
      oSAndCPU: this.editForm.get(['oSAndCPU'])!.value,
      pIN: this.editForm.get(['pIN'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      color: this.editForm.get(['color'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
