import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPlantillaFeina, PlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from './plantilla-feina.service';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { PeriodicitatConfigurableService } from 'app/entities/periodicitat-configurable/periodicitat-configurable.service';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';
import { ITreballador } from 'app/shared/model/treballador.model';
import { TreballadorService } from 'app/entities/treballador/treballador.service';

type SelectableEntity = IPeriodicitatConfigurable | ICategoria | IClient | ITreballador;

@Component({
  selector: 'jhi-plantilla-feina-update',
  templateUrl: './plantilla-feina-update.component.html'
})
export class PlantillaFeinaUpdateComponent implements OnInit {
  isSaving = false;
  periodicitatconfigurables: IPeriodicitatConfigurable[] = [];
  categorias: ICategoria[] = [];
  clients: IClient[] = [];
  treballadors: ITreballador[] = [];
  setmanaInicialDp: any;
  setmanaFinalDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    setmanaInicial: [],
    setmanaFinal: [],
    horaInici: [],
    horaFinal: [],
    tempsPrevist: [],
    intervalControl: [],
    diaSetmana: [],
    facturacioAutomatica: [],
    observacions: [],
    periodicitatConfigurable: [],
    categoria: [],
    client: [],
    treballadors: []
  });

  constructor(
    protected plantillaFeinaService: PlantillaFeinaService,
    protected periodicitatConfigurableService: PeriodicitatConfigurableService,
    protected categoriaService: CategoriaService,
    protected clientService: ClientService,
    protected treballadorService: TreballadorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plantillaFeina }) => {
      if (!plantillaFeina.id) {
        const today = moment().startOf('day');
        plantillaFeina.horaInici = today;
        plantillaFeina.horaFinal = today;
        plantillaFeina.tempsPrevist = today;
      }

      this.updateForm(plantillaFeina);

      this.periodicitatConfigurableService
        .query({ filter: 'plantilla-is-null' })
        .pipe(
          map((res: HttpResponse<IPeriodicitatConfigurable[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPeriodicitatConfigurable[]) => {
          if (!plantillaFeina.periodicitatConfigurable || !plantillaFeina.periodicitatConfigurable.id) {
            this.periodicitatconfigurables = resBody;
          } else {
            this.periodicitatConfigurableService
              .find(plantillaFeina.periodicitatConfigurable.id)
              .pipe(
                map((subRes: HttpResponse<IPeriodicitatConfigurable>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPeriodicitatConfigurable[]) => (this.periodicitatconfigurables = concatRes));
          }
        });

      this.categoriaService.query().subscribe((res: HttpResponse<ICategoria[]>) => (this.categorias = res.body || []));

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));

      this.treballadorService.query().subscribe((res: HttpResponse<ITreballador[]>) => (this.treballadors = res.body || []));
    });
  }

  updateForm(plantillaFeina: IPlantillaFeina): void {
    this.editForm.patchValue({
      id: plantillaFeina.id,
      nom: plantillaFeina.nom,
      setmanaInicial: plantillaFeina.setmanaInicial,
      setmanaFinal: plantillaFeina.setmanaFinal,
      horaInici: plantillaFeina.horaInici ? plantillaFeina.horaInici.format(DATE_TIME_FORMAT) : null,
      horaFinal: plantillaFeina.horaFinal ? plantillaFeina.horaFinal.format(DATE_TIME_FORMAT) : null,
      tempsPrevist: plantillaFeina.tempsPrevist ? plantillaFeina.tempsPrevist.format(DATE_TIME_FORMAT) : null,
      intervalControl: plantillaFeina.intervalControl,
      diaSetmana: plantillaFeina.diaSetmana,
      facturacioAutomatica: plantillaFeina.facturacioAutomatica,
      observacions: plantillaFeina.observacions,
      periodicitatConfigurable: plantillaFeina.periodicitatConfigurable,
      categoria: plantillaFeina.categoria,
      client: plantillaFeina.client,
      treballadors: plantillaFeina.treballadors
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      setmanaInicial: this.editForm.get(['setmanaInicial'])!.value,
      setmanaFinal: this.editForm.get(['setmanaFinal'])!.value,
      horaInici: this.editForm.get(['horaInici'])!.value ? moment(this.editForm.get(['horaInici'])!.value, DATE_TIME_FORMAT) : undefined,
      horaFinal: this.editForm.get(['horaFinal'])!.value ? moment(this.editForm.get(['horaFinal'])!.value, DATE_TIME_FORMAT) : undefined,
      tempsPrevist: this.editForm.get(['tempsPrevist'])!.value
        ? moment(this.editForm.get(['tempsPrevist'])!.value, DATE_TIME_FORMAT)
        : undefined,
      intervalControl: this.editForm.get(['intervalControl'])!.value,
      diaSetmana: this.editForm.get(['diaSetmana'])!.value,
      facturacioAutomatica: this.editForm.get(['facturacioAutomatica'])!.value,
      observacions: this.editForm.get(['observacions'])!.value,
      periodicitatConfigurable: this.editForm.get(['periodicitatConfigurable'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      client: this.editForm.get(['client'])!.value,
      treballadors: this.editForm.get(['treballadors'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlantillaFeina>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ITreballador[], option: ITreballador): ITreballador {
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
