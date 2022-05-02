import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LANGUAGES } from 'app/config/language.constants';
import { User } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Authority } from '../../../config/authority.constants';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
  styleUrls: ['./user-management-update.component.scss'],
})
export class UserManagementUpdateComponent implements OnInit {
  user!: User;
  userID!: number;
  userLogin!: string;
  languages = LANGUAGES;
  authorities: string[] = [];
  isSaving = false;
  url: string =
    'data:image/png;base64,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';

  ADMIN: any;
  USER: any;

  editForm = this.fb.group({
    id: [],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [],
    langKey: [],
    authorities: [],
  });

  constructor(
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.user = {};
    if (this.userID) {
      this.userService.find(this.userLogin).subscribe(res => {
        this.user = res;
        this.updateForm(this.user);
        this.ADMIN = this.user.authorities?.some(n => n === 'ROLE_ADMIN');
        this.USER = this.user.authorities?.some(n => n === 'ROLE_USER');
        if (this.user.imageUrl) {
          this.url = this.user.imageUrl;
        }
      });
    } else {
      this.updateForm(this.user);
    }
    this.userService.authorities().subscribe(authorities => (this.authorities = authorities));
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== undefined) {
      this.userService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      langKey: user.langKey,
      authorities: user.authorities,
    });
  }

  private updateUser(user: User): void {
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.langKey = this.editForm.get(['langKey'])!.value;
    if (this.ADMIN) {
      user.authorities?.push(Authority.ADMIN);
    }
    if (this.USER) {
      user.authorities?.push(Authority.USER);
    }
    user.imageUrl = this.url;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    if (this.user.id) {
      this.toastr.success('Sửa thành công');
    } else {
      this.toastr.success('Thêm thành công');
    }
    this.closePopup(true);
  }

  private onSaveError(): void {
    this.isSaving = false;
    this.toastr.error(this.translate.instant('error.internalServerError'));
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

  closePopup(reason?: any) {
    if (reason) {
      this.activeModal.close(reason);
    } else {
      this.activeModal.close(false);
    }
  }
}
