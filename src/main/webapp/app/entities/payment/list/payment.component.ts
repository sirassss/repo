import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IPayment } from '../payment.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { PaymentService } from '../service/payment.service';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../../product-for-client/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductUpdateComponent } from '../../product/update/product-update.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ManufacturedService } from '../../manufactured/service/manufactured.service';
import { EventManager } from '../../../core/util/event-manager.service';
import { BaseComponent } from '../../../shared/base-component/base.component';
import { PaymentUpdateComponent } from '../update/payment-update.component';
import { OrderService } from '../../order/service/order.service';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent extends BaseComponent implements OnInit {
  payments?: IPayment[];
  listData!: MatTableDataSource<IPayment>;
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
  columns: string[] = ['userName', 'orderAddress', 'orderPhone', 'totalAmount', 'status', 'view', 'delete'];

  constructor(
    protected paymentService: PaymentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private toastr: ToastrService,
    private manufacturedService: ManufacturedService,
    private orderService: OrderService,
    private eventManager: EventManager
  ) {
    super();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.paymentService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IPayment[]>) => {
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

  protected onSuccess(data: IPayment[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/payment'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.payments = data ?? [];
    this.updateData(this.payments);
    this.ngbPaginationPage = this.page;
  }

  updateData(payment: IPayment[]) {
    if (payment.length > 0) {
      payment.forEach(n => {
        n.userName = (n.userLastName ? n.userLastName : '') + (n.userFirstName ? n.userFirstName : '');
      });
    }
    this.listData = new MatTableDataSource(payment);
    this.listData.sort = this.sortd;
    this.listData.paginator = this.paginator;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  edit(payment: IPayment) {
    this.modalRef = this.modalService.open(PaymentUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.modalRef.componentInstance.payment = payment;
    this.modalRef.closed.subscribe(reason => {
      if (reason === true) {
        this.loadPage();
      }
    });
  }

  delete(payment: IPayment, name: string) {
    if (payment.status === 2 || payment.status === 3) {
      Swal.fire({
        title: 'B???n mu???n xo?? ' + name + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xo??',
        cancelButtonText: 'Kh??ng',
      }).then(result => {
        if (result.isConfirmed) {
          this.paymentService.delete(payment.id!).subscribe(
            data => {
              this.loadPage();
              this.toastr.success('Th??ng b??o xo?? th??nh c??ng!', 'H??? th???ng');
            },
            error => {
              this.toastr.error('Th??ng b??o xo?? th???t b???i, ???? x???y ra l???i!', 'H??? th???ng');
            }
          );
        }
      });
    } else {
      this.toastr.error('Kh??ng ???????c x??a ????n ch??a thanh to??n!');
    }
  }

  getStatus(status: any) {
    if (status) {
      if (status === 0) {
        return 'Ch??? x??c nh???n';
      } else if (status === 1) {
        return '??ang giao';
      } else if (status === 2) {
        return '???? giao/thanh to??n';
      } else if (status === 3) {
        return '???? h???y';
      } else {
        return 'Kh??ch h??ng h???y';
      }
    } else {
      return 'Ch??? x??c nh???n';
    }
  }
}
