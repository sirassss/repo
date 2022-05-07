import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { UserManagementService } from '../service/user-management.service';
import { User } from '../user-management.model';
import { UserManagementDeleteDialogComponent } from '../delete/user-management-delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../../product-for-client/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ManufacturedService } from '../../../entities/manufactured/service/manufactured.service';
import { EventManager } from '../../../core/util/event-manager.service';
import { ProductUpdateComponent } from '../../../entities/product/update/product-update.component';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../../shared/base-component/base.component';
import { UserManagementUpdateComponent } from '../update/user-management-update.component';
import { Authority } from '../../../config/authority.constants';

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent extends BaseComponent implements OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  listData!: MatTableDataSource<User>;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;

  modalRef!: NgbModalRef;
  eventSubscriber: Subscription | any;

  @ViewChild(MatSort) sortd!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productsLength!: number;
  columns: string[] = ['image', 'login', 'email', 'authorities', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'view', 'delete'];

  constructor(
    private userService: UserManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private eventManager: EventManager
  ) {
    super();
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  setActive(user: User, isActivated: boolean): void {
    this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  trackIdentity(index: number, item: User): number {
    return item.id!;
  }

  loadAll(): void {
    this.isLoading = true;
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<User[]>) => {
          this.isLoading = false;
          if (res && res.body) {
            this.onSuccess(res.body, res.headers);
          }
        },
        () => (this.isLoading = false)
      );
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.loadAll();
    });
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: User[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
    this.listData = new MatTableDataSource(this.users);
    this.listData.sort = this.sortd;
    this.listData.paginator = this.paginator;
  }

  addNew() {
    this.modalRef = this.modalService.open(UserManagementUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.afterModalClose();
  }

  edit(user: User) {
    this.modalRef = this.modalService.open(UserManagementUpdateComponent, { backdrop: 'static', windowClass: 'width-60' });
    this.modalRef.componentInstance.userID = user.id;
    this.modalRef.componentInstance.userLogin = user.login;
    this.afterModalClose();
  }

  afterModalClose() {
    this.modalRef.closed.subscribe(res => {
      if (res === true) {
        this.loadAll();
      }
    });
  }

  delete(login: string, name: string) {
    Swal.fire({
      title: 'Bạn muốn xoá ' + name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Không',
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.delete(login).subscribe(
          data => {
            this.loadAll();
            this.toastr.success('Thông báo xoá thành công!', 'Hệ thống');
          },
          error => {
            this.toastr.error('Thông báo xoá thất bại, đã xảy ra lỗi!', 'Hệ thống');
          }
        );
      }
    });
  }

  getRole(role: any) {
    if (role === Authority.ADMIN) {
      return 'Admin';
    } else {
      return 'User';
    }
  }
}
