import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IManufactured } from '../manufactured.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ManufacturedService } from '../service/manufactured.service';
import { ManufacturedDeleteDialogComponent } from '../delete/manufactured-delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../../product-for-client/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VoucherUpdateComponent } from '../../voucher/update/voucher-update.component';
import { IVoucher } from '../../../shared/modal/voucher/voucher.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { EventManager } from '../../../core/util/event-manager.service';
import { BaseComponent } from '../../../shared/base-component/base.component';
import { ManufacturedUpdateComponent } from '../update/manufactured-update.component';

@Component({
  selector: 'jhi-manufactured',
  templateUrl: './manufactured.component.html',
})
export class ManufacturedComponent extends BaseComponent implements OnInit {
  manufactureds?: IManufactured[];
  listData!: MatTableDataSource<IManufactured>;
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
  columns: string[] = ['name', 'image', 'description', 'edit', 'delete'];

  constructor(
    protected manufacturedService: ManufacturedService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private toastr: ToastrService,
    private eventManager: EventManager
  ) {
    super();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.manufacturedService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IManufactured[]>) => {
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
    this.registerAddNewManu();
  }

  trackId(index: number, item: IManufactured): number {
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

  protected onSuccess(data: IManufactured[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/manufactured'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.manufactureds = data ?? [];
    this.listData = new MatTableDataSource(this.manufactureds);
    this.listData.sort = this.sortd;
    this.listData.paginator = this.paginator;
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  addNew() {
    this.modalRef = this.modalService.open(ManufacturedUpdateComponent, { backdrop: 'static', windowClass: 'width-40' });
  }

  edit(manufactured: IManufactured) {
    this.modalRef = this.modalService.open(ManufacturedUpdateComponent, { backdrop: 'static', windowClass: 'width-40' });
    this.modalRef.componentInstance.manufacturedID = manufactured.id;
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
        this.manufacturedService.delete(id).subscribe(
          data => {
            this.loadPage();
            this.toastr.success('Thông báo xoá thành công!', 'Hệ thống');
          },
          error => {
            this.toastr.error('Thông báo xoá thất bại, đã xảy ra lỗi!', 'Hệ thống');
          }
        );
      }
    });
  }

  private registerAddNewManu() {
    this.eventSubscriber = this.eventManager.subscribe('newmanu', () => {
      this.loadPage();
    });
    this.eventSubscribers.push(this.eventSubscriber);
  }
}
