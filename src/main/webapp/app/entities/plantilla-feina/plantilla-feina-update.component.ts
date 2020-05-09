import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ClientService } from 'app/entities/client/client.service';
import { IPlantillaFeina, PlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from './plantilla-feina.service';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { PeriodicitatConfigurableService } from 'app/entities/periodicitat-configurable/periodicitat-configurable.service';
import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import { PeriodicitatSetmanalService } from 'app/entities/periodicitat-setmanal/periodicitat-setmanal.service';
import {IClient} from "app/shared/model/client.model";
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { ITreballador } from 'app/shared/model/treballador.model';
import { TreballadorService } from 'app/entities/treballador/treballador.service';

type SelectableEntity = IPeriodicitatConfigurable | IPeriodicitatSetmanal | IClient | ICategoria | ITreballador ;

type SelectableManyToManyEntity = ITreballador | IPeriodicitatSetmanal;

@Component({
  selector: 'jhi-plantilla-feina-update',
  templateUrl: './plantilla-feina-update.component.html'
})
export class PlantillaFeinaUpdateComponent implements OnInit {
  isSaving = false;

  periodicitatconfigurables: IPeriodicitatConfigurable[] = [];

  clients: IClient[] = [];

  categorias: ICategoria[] = [];

  treballadors: ITreballador[] = [];

  periodicitatsetmanals: IPeriodicitatSetmanal[] = [];
  setmanaInicialDp: any;
  setmanaFinalDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    horaInici: [],
    horaFinal: [],
    tempsPrevist: [],
    facturacioAutomatica: [],
    observacions: [],
    setmanaInicial: [],
    setmanaFinal: [],
    numeroControl: [],
    periodicitatConfigurable: [],
    periodicitatSetmanals: [],
    client: [],
    categoria: [],
    treballadors: [],
  });

  constructor(
    protected plantillaFeinaService: PlantillaFeinaService,
    protected periodicitatConfigurableService: PeriodicitatConfigurableService,
    protected periodicitatSetmanalService: PeriodicitatSetmanalService,
    protected clientService: ClientService,
    protected categoriaService: CategoriaService,
    protected activatedRoute: ActivatedRoute,
    protected treballadorService: TreballadorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plantillaFeina }) => {
      this.updateForm(plantillaFeina);

      this.periodicitatConfigurableService
        .query({ filter: 'plantilla-is-null' })
        .pipe(
          map((res: HttpResponse<IPeriodicitatConfigurable[]>) => {
            return res.body ? res.body : [];
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
              .subscribe((concatRes: IPeriodicitatConfigurable[]) => {
                this.periodicitatconfigurables = concatRes;
              });
          }
        });

      this.treballadorService
        .query()
        .pipe(
          map((res: HttpResponse<ITreballador[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITreballador[]) => (this.treballadors = resBody));

      this.categoriaService
        .query()
        .pipe(
          map((res: HttpResponse<ICategoria[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICategoria[]) => (this.categorias = resBody));

      this.clientService
        .query()
        .pipe(
          map((res: HttpResponse<IClient[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IClient[]) => (this.clients = resBody));


      this.periodicitatSetmanalService
        .query()
        .pipe(
          map((res: HttpResponse<IPeriodicitatSetmanal[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPeriodicitatSetmanal[]) => (this.periodicitatsetmanals = resBody));
    });
  }

  updateForm(plantillaFeina: IPlantillaFeina): void {
    this.editForm.patchValue({
      id: plantillaFeina.id,
      nom: plantillaFeina.nom,
      horaInici: plantillaFeina.horaInici != null ? plantillaFeina.horaInici : null,
      horaFinal: plantillaFeina.horaFinal != null ? plantillaFeina.horaFinal : null,
      tempsPrevist: plantillaFeina.tempsPrevist,
      facturacioAutomatica: plantillaFeina.facturacioAutomatica,
      observacions: plantillaFeina.observacions,
      setmanaInicial: plantillaFeina.setmanaInicial,
      setmanaFinal: plantillaFeina.setmanaFinal,
      numeroControl: plantillaFeina.numeroControl,
      periodicitatConfigurable: plantillaFeina.periodicitatConfigurable,
      periodicitatSetmanals: plantillaFeina.periodicitatSetmanals,
      client: plantillaFeina.client,
      treballadors: plantillaFeina.treballadors,
      categoria: plantillaFeina.categoria,
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
      horaInici: this.editForm.get(['horaInici'])!.value != null ? this.editForm.get(['horaInici'])!.value : undefined,
      horaFinal: this.editForm.get(['horaFinal'])!.value != null ? this.editForm.get(['horaFinal'])!.value : undefined,
      tempsPrevist: this.editForm.get(['tempsPrevist'])!.value,
      facturacioAutomatica: this.editForm.get(['facturacioAutomatica'])!.value,
      observacions: this.editForm.get(['observacions'])!.value,
      setmanaInicial: this.editForm.get(['setmanaInicial'])!.value,
      setmanaFinal: this.editForm.get(['setmanaFinal'])!.value,
      numeroControl: this.editForm.get(['numeroControl'])!.value,
      periodicitatConfigurable: this.editForm.get(['periodicitatConfigurable'])!.value,
      periodicitatSetmanals: this.editForm.get(['periodicitatSetmanals'])!.value,
      client: this.editForm.get(['client'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      treballadors: this.editForm.get(['treballadors'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlantillaFeina>>): void {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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

  getSelected(selectedVals: SelectableManyToManyEntity[], option: SelectableManyToManyEntity): SelectableManyToManyEntity {
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
