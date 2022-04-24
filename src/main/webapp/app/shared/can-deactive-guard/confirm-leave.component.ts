import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'eb-confirm-leave',
  templateUrl: './confirm-leave.component.html',
  styleUrls: ['./confirm-leave.component.css'],
})
export class ConfirmLeaveComponent {
  subject!: Subject<boolean>;

  constructor(public bsModalRef: NgbActiveModal) {}

  action(value: boolean) {
    this.bsModalRef.close();
    this.subject.next(value);
    this.subject.complete();
  }

  close() {
    this.bsModalRef.close();
  }
}
