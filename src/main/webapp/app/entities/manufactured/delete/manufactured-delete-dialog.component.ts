import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IManufactured } from '../manufactured.model';
import { ManufacturedService } from '../service/manufactured.service';

@Component({
  templateUrl: './manufactured-delete-dialog.component.html',
})
export class ManufacturedDeleteDialogComponent {
  manufactured?: IManufactured;

  constructor(protected manufacturedService: ManufacturedService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.manufacturedService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
