import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IFeina, Feina } from 'app/shared/model/feina.model';
import { FeinaService } from './feina.service';
import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from 'app/entities/plantilla-feina/plantilla-feina.service';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';
import { ITreballador } from 'app/shared/model/treballador.model';
import { TreballadorService } from 'app/entities/treballador/treballador.service';

@Component({
  selector: 'jhi-feina-update',
  templateUrl: './feina-update.component.html'
})
export class FeinaUpdateComponent implements OnInit {
  isSaving: boolean;

  plantillafeinas: IPlantillaFeina[];

  categorias: ICategoria[];

  clients: IClient[];

  treballadors: ITreballador[];
  setmanaDp: any;

  editForm = this.fb.group({
    id: [],
    numero: [],
    nom: [],
    descripcio: [],
    setmana: [],
    tempsPrevist: [],
    tempsReal: [],
    estat: [],
    intervalControl: [],
    facturacioAutomatica: [],
    observacions: [],
    comentarisTreballador: [],
    plantillaFeina: [],
    categoria: [],
    client: [],
    treballadors: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected feinaService: FeinaService,
    protected plantillaFeinaService: PlantillaFeinaService,
    protected categoriaService: CategoriaService,
    protected clientService: ClientService,
    protected treballadorService: TreballadorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ feina }) => {
      this.updateForm(feina);
    });
    this.plantillaFeinaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlantillaFeina[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlantillaFeina[]>) => response.body)
      )
      .subscribe((res: IPlantillaFeina[]) => (this.plantillafeinas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoriaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategoria[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategoria[]>) => response.body)
      )
      .subscribe((res: ICategoria[]) => (this.categorias = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClient[]>) => response.body)
      )
      .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.treballadorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITreballador[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITreballador[]>) => response.body)
      )
      .subscribe((res: ITreballador[]) => (this.treballadors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(feina: IFeina) {
    this.editForm.patchValue({
      id: feina.id,
      numero: feina.numero,
      nom: feina.nom,
      descripcio: feina.descripcio,
      setmana: feina.setmana,
      tempsPrevist: feina.tempsPrevist,
      tempsReal: feina.tempsReal,
      estat: feina.estat,
      intervalControl: feina.intervalControl,
      facturacioAutomatica: feina.facturacioAutomatica,
      observacions: feina.observacions,
      comentarisTreballador: feina.comentarisTreballador,
      plantillaFeina: feina.plantillaFeina,
      categoria: feina.categoria,
      client: feina.client,
      treballadors: feina.treballadors
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const feina = this.createFromForm();
    if (feina.id !== undefined) {
      this.subscribeToSaveResponse(this.feinaService.update(feina));
    } else {
      this.subscribeToSaveResponse(this.feinaService.create(feina));
    }
  }

  private createFromForm(): IFeina {
    return {
      ...new Feina(),
      id: this.editForm.get(['id']).value,
      numero: this.editForm.get(['numero']).value,
      nom: this.editForm.get(['nom']).value,
      descripcio: this.editForm.get(['descripcio']).value,
      setmana: this.editForm.get(['setmana']).value,
      tempsPrevist: this.editForm.get(['tempsPrevist']).value,
      tempsReal: this.editForm.get(['tempsReal']).value,
      estat: this.editForm.get(['estat']).value,
      intervalControl: this.editForm.get(['intervalControl']).value,
      facturacioAutomatica: this.editForm.get(['facturacioAutomatica']).value,
      observacions: this.editForm.get(['observacions']).value,
      comentarisTreballador: this.editForm.get(['comentarisTreballador']).value,
      plantillaFeina: this.editForm.get(['plantillaFeina']).value,
      categoria: this.editForm.get(['categoria']).value,
      client: this.editForm.get(['client']).value,
      treballadors: this.editForm.get(['treballadors']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeina>>) {
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

  trackCategoriaById(index: number, item: ICategoria) {
    return item.id;
  }

  trackClientById(index: number, item: IClient) {
    return item.id;
  }

  trackTreballadorById(index: number, item: ITreballador) {
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
