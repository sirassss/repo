import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ProductService } from '../service/product.service';
import { ProductDeleteDialogComponent } from '../delete/product-delete-dialog.component';
import { ProductUpdateComponent } from '../update/product-update.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ManufacturedService } from '../../manufactured/service/manufactured.service';
import { IProduct } from '../../../product-for-client/product.model';
import { EventManager } from '../../../core/util/event-manager.service';
import { BaseComponent } from '../../../shared/base-component/base.component';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
})
export class ProductComponent extends BaseComponent implements OnInit {
  products?: IProduct[];
  listData!: MatTableDataSource<IProduct>;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  modalRef!: NgbModalRef;
  eventSubscriber: Subscription | any;

  @ViewChild(MatSort) sortd!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productsLength!: number;
  columns: string[] = ['image', 'code', 'name', 'unitPrice', 'installment', 'category', 'createdDate', 'view', 'delete'];

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private toastr: ToastrService,
    private manufacturedService: ManufacturedService,
    private eventManager: EventManager
  ) {
    super();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.productService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IProduct[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerAddNewPro();
  }

  trackId(index: number, item: IProduct): number {
    return item.id!;
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IProduct[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/product'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.products = data ?? [];
    this.listData = new MatTableDataSource(this.products);
    this.listData.sort = this.sortd;
    this.listData.paginator = this.paginator;
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  addNew() {
    this.modalRef = this.modalService.open(ProductUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
  }

  edit(product: IProduct) {
    this.modalRef = this.modalService.open(ProductUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.modalRef.componentInstance.productID = product.id;
  }

  delete(id: number, name: string) {
    Swal.fire({
      title: 'Bạn muốn xoá ' + name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Không',
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(
          data => {
            this.ngOnInit();
            this.toastr.success('Thông báo xoá thành công!', 'Hệ thống');
          },
          error => {
            this.toastr.error('Thông báo xoá thất bại, đã xảy ra lỗi!', 'Hệ thống');
          }
        );
      }
    });
  }

  registerAddNewPro(): void {
    this.eventSubscriber = this.eventManager.subscribe('newpro', () => {
      this.loadPage();
    });
    this.eventSubscribers.push(this.eventSubscriber);
  }
}
