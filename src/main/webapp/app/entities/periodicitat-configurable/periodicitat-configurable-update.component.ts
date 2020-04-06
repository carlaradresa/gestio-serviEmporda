import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPeriodicitatConfigurable, PeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { PeriodicitatConfigurableService } from './periodicitat-configurable.service';

@Component({
  selector: 'jhi-periodicitat-configurable-update',
  templateUrl: './periodicitat-configurable-update.component.html'
})
export class PeriodicitatConfigurableUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    periodicitat: [],
    frequencia: [],
    observacions: []
  });

  constructor(
    protected periodicitatConfigurableService: PeriodicitatConfigurableService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ periodicitatConfigurable }) => {
      this.updateForm(periodicitatConfigurable);
    });
  }

  updateForm(periodicitatConfigurable: IPeriodicitatConfigurable): void {
    this.editForm.patchValue({
      id: periodicitatConfigurable.id,
      periodicitat: periodicitatConfigurable.periodicitat,
      frequencia: periodicitatConfigurable.frequencia,
      observacions: periodicitatConfigurable.observacions
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const periodicitatConfigurable = this.createFromForm();
    if (periodicitatConfigurable.id !== undefined) {
      this.subscribeToSaveResponse(this.periodicitatConfigurableService.update(periodicitatConfigurable));
    } else {
      this.subscribeToSaveResponse(this.periodicitatConfigurableService.create(periodicitatConfigurable));
    }
  }

  private createFromForm(): IPeriodicitatConfigurable {
    return {
      ...new PeriodicitatConfigurable(),
      id: this.editForm.get(['id'])!.value,
      periodicitat: this.editForm.get(['periodicitat'])!.value,
      frequencia: this.editForm.get(['frequencia'])!.value,
      observacions: this.editForm.get(['observacions'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodicitatConfigurable>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
