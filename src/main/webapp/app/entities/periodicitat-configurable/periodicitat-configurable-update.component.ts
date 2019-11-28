import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPeriodicitatConfigurable, PeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { PeriodicitatConfigurableService } from './periodicitat-configurable.service';
import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from 'app/entities/plantilla-feina/plantilla-feina.service';

@Component({
  selector: 'jhi-periodicitat-configurable-update',
  templateUrl: './periodicitat-configurable-update.component.html'
})
export class PeriodicitatConfigurableUpdateComponent implements OnInit {
  isSaving: boolean;

  plantillafeinas: IPlantillaFeina[];

  editForm = this.fb.group({
    id: [],
    frequencia: [],
    periodicitat: [],
    observacions: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected periodicitatConfigurableService: PeriodicitatConfigurableService,
    protected plantillaFeinaService: PlantillaFeinaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ periodicitatConfigurable }) => {
      this.updateForm(periodicitatConfigurable);
    });
    this.plantillaFeinaService
      .query()
      .subscribe(
        (res: HttpResponse<IPlantillaFeina[]>) => (this.plantillafeinas = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(periodicitatConfigurable: IPeriodicitatConfigurable) {
    this.editForm.patchValue({
      id: periodicitatConfigurable.id,
      frequencia: periodicitatConfigurable.frequencia,
      periodicitat: periodicitatConfigurable.periodicitat,
      observacions: periodicitatConfigurable.observacions
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      frequencia: this.editForm.get(['frequencia']).value,
      periodicitat: this.editForm.get(['periodicitat']).value,
      observacions: this.editForm.get(['observacions']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodicitatConfigurable>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPlantillaFeinaById(index: number, item: IPlantillaFeina) {
    return item.id;
  }
}
