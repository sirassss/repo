import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../../entities/product-details/product-details.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManufacturedService } from '../../entities/manufactured/service/manufactured.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  product!: IProduct;
  productDetail!: IProductDetails;

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private manufacturedService: ManufacturedService
  ) {}

  ngOnInit(): void {
    this.manufacturedService.find(this.productDetail.manufacturerID!).subscribe(res => {
      if (res && res.body) {
        this.productDetail.manufacturer = res.body;
      }
    });
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

  protected onSaveSuccess(): void {}

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  closePopup() {
    this.activeModal.close(false);
  }
}
