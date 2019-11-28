import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPlantillaFeina, PlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from './plantilla-feina.service';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { PeriodicitatConfigurableService } from 'app/entities/periodicitat-configurable/periodicitat-configurable.service';
import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import { PeriodicitatSetmanalService } from 'app/entities/periodicitat-setmanal/periodicitat-setmanal.service';

@Component({
  selector: 'jhi-plantilla-feina-update',
  templateUrl: './plantilla-feina-update.component.html'
})
export class PlantillaFeinaUpdateComponent implements OnInit {
  isSaving: boolean;

  periodicitatconfigurables: IPeriodicitatConfigurable[];

  periodicitatsetmanals: IPeriodicitatSetmanal[];
  setmanaInicialDp: any;
  setmanaFinalDp: any;

  editForm = this.fb.group({
    id: [],
    horaInici: [],
    horaFinal: [],
    tempsPrevist: [],
    facturacioAutomatica: [],
    observacions: [],
    setmanaInicial: [],
    setmanaFinal: [],
    numeroControl: [],
    periodicitatConfigurable: [],
    periodicitatSetmanals: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected plantillaFeinaService: PlantillaFeinaService,
    protected periodicitatConfigurableService: PeriodicitatConfigurableService,
    protected periodicitatSetmanalService: PeriodicitatSetmanalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ plantillaFeina }) => {
      this.updateForm(plantillaFeina);
    });
    this.periodicitatConfigurableService.query({ filter: 'plantilla-is-null' }).subscribe(
      (res: HttpResponse<IPeriodicitatConfigurable[]>) => {
        if (!this.editForm.get('periodicitatConfigurable').value || !this.editForm.get('periodicitatConfigurable').value.id) {
          this.periodicitatconfigurables = res.body;
        } else {
          this.periodicitatConfigurableService
            .find(this.editForm.get('periodicitatConfigurable').value.id)
            .subscribe(
              (subRes: HttpResponse<IPeriodicitatConfigurable>) => (this.periodicitatconfigurables = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.periodicitatSetmanalService
      .query()
      .subscribe(
        (res: HttpResponse<IPeriodicitatSetmanal[]>) => (this.periodicitatsetmanals = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(plantillaFeina: IPlantillaFeina) {
    this.editForm.patchValue({
      id: plantillaFeina.id,
      horaInici: plantillaFeina.horaInici != null ? plantillaFeina.horaInici.format(DATE_TIME_FORMAT) : null,
      horaFinal: plantillaFeina.horaFinal != null ? plantillaFeina.horaFinal.format(DATE_TIME_FORMAT) : null,
      tempsPrevist: plantillaFeina.tempsPrevist,
      facturacioAutomatica: plantillaFeina.facturacioAutomatica,
      observacions: plantillaFeina.observacions,
      setmanaInicial: plantillaFeina.setmanaInicial,
      setmanaFinal: plantillaFeina.setmanaFinal,
      numeroControl: plantillaFeina.numeroControl,
      periodicitatConfigurable: plantillaFeina.periodicitatConfigurable,
      periodicitatSetmanals: plantillaFeina.periodicitatSetmanals
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const plantillaFeina = this.createFromForm();
    if (plantillaFeina.id !== undefined) {
      this.subscribeToSaveResponse(this.plantillaFeinaService.update(plantillaFeina));
    } else {
      this.subscribeToSaveResponse(this.plantillaFeinaService.create(plantillaFeina));
    }
  }

  private createFromForm(): IPlantillaFeina {
    return {
      ...new PlantillaFeina(),
      id: this.editForm.get(['id']).value,
      horaInici:
        this.editForm.get(['horaInici']).value != null ? moment(this.editForm.get(['horaInici']).value, DATE_TIME_FORMAT) : undefined,
      horaFinal:
        this.editForm.get(['horaFinal']).value != null ? moment(this.editForm.get(['horaFinal']).value, DATE_TIME_FORMAT) : undefined,
      tempsPrevist: this.editForm.get(['tempsPrevist']).value,
      facturacioAutomatica: this.editForm.get(['facturacioAutomatica']).value,
      observacions: this.editForm.get(['observacions']).value,
      setmanaInicial: this.editForm.get(['setmanaInicial']).value,
      setmanaFinal: this.editForm.get(['setmanaFinal']).value,
      numeroControl: this.editForm.get(['numeroControl']).value,
      periodicitatConfigurable: this.editForm.get(['periodicitatConfigurable']).value,
      periodicitatSetmanals: this.editForm.get(['periodicitatSetmanals']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlantillaFeina>>) {
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

  trackPeriodicitatConfigurableById(index: number, item: IPeriodicitatConfigurable) {
    return item.id;
  }

  trackPeriodicitatSetmanalById(index: number, item: IPeriodicitatSetmanal) {
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
