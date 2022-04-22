import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  product!: IProduct;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    quantity: [],
    unitPrice: [],
    installment: [],
    accompanyingProducts: [],
    warranty: [],
    createdDate: [],
    modifiedDate: [],
    createdUser: [],
    modifiedUser: [],
    status: [],
  });

  constructor(protected productService: ProductService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.product;
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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

  protected updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      code: product.code,
      name: product.name,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      installment: product.installment,
      accompanyingProducts: product.accompanyingProducts,
      warranty: product.warranty,
      createdDate: product.createdDate,
      modifiedDate: product.modifiedDate,
      createdUser: product.createdUser,
      modifiedUser: product.modifiedUser,
      rate: product.rate,
    });
  }
}
