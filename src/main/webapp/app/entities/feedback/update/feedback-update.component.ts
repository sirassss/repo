import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFeedback, Feedback } from '../feedback.model';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'jhi-feedback-update',
  templateUrl: './feedback-update.component.html',
})
export class FeedbackUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userID: [],
    productID: [],
    content: [],
    rate: [],
    createdDate: [],
  });

  constructor(protected feedbackService: FeedbackService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feedback }) => {
      this.updateForm(feedback);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feedback = this.createFromForm();
    if (feedback.id !== undefined) {
      this.subscribeToSaveResponse(this.feedbackService.update(feedback));
    } else {
      this.subscribeToSaveResponse(this.feedbackService.create(feedback));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeedback>>): void {
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

  protected updateForm(feedback: IFeedback): void {
    this.editForm.patchValue({
      id: feedback.id,
      userID: feedback.userID,
      productID: feedback.productID,
      content: feedback.content,
      rate: feedback.rate,
      createdDate: feedback.createdDate,
    });
  }

  protected createFromForm(): IFeedback {
    return {
      ...new Feedback(),
      id: this.editForm.get(['id'])!.value,
      userID: this.editForm.get(['userID'])!.value,
      productID: this.editForm.get(['productID'])!.value,
      content: this.editForm.get(['content'])!.value,
      rate: this.editForm.get(['rate'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value,
    };
  }
}
