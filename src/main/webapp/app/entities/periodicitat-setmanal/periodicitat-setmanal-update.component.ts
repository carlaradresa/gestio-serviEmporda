import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPeriodicitatSetmanal, PeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import { PeriodicitatSetmanalService } from './periodicitat-setmanal.service';
import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from 'app/entities/plantilla-feina/plantilla-feina.service';

@Component({
  selector: 'jhi-periodicitat-setmanal-update',
  templateUrl: './periodicitat-setmanal-update.component.html'
})
export class PeriodicitatSetmanalUpdateComponent implements OnInit {
  isSaving: boolean;

  plantillafeinas: IPlantillaFeina[];

  editForm = this.fb.group({
    id: [],
    diaSetmana: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected periodicitatSetmanalService: PeriodicitatSetmanalService,
    protected plantillaFeinaService: PlantillaFeinaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ periodicitatSetmanal }) => {
      this.updateForm(periodicitatSetmanal);
    });
    this.plantillaFeinaService
      .query()
      .subscribe(
        (res: HttpResponse<IPlantillaFeina[]>) => (this.plantillafeinas = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(periodicitatSetmanal: IPeriodicitatSetmanal) {
    this.editForm.patchValue({
      id: periodicitatSetmanal.id,
      diaSetmana: periodicitatSetmanal.diaSetmana
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const periodicitatSetmanal = this.createFromForm();
    if (periodicitatSetmanal.id !== undefined) {
      this.subscribeToSaveResponse(this.periodicitatSetmanalService.update(periodicitatSetmanal));
    } else {
      this.subscribeToSaveResponse(this.periodicitatSetmanalService.create(periodicitatSetmanal));
    }
  }

  private createFromForm(): IPeriodicitatSetmanal {
    return {
      ...new PeriodicitatSetmanal(),
      id: this.editForm.get(['id']).value,
      diaSetmana: this.editForm.get(['diaSetmana']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodicitatSetmanal>>) {
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

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
