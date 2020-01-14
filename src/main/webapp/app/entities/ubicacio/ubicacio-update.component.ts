import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUbicacio, Ubicacio } from 'app/shared/model/ubicacio.model';
import { UbicacioService } from './ubicacio.service';
import { IFeina } from 'app/shared/model/feina.model';
import { FeinaService } from 'app/entities/feina/feina.service';

@Component({
  selector: 'jhi-ubicacio-update',
  templateUrl: './ubicacio-update.component.html'
})
export class UbicacioUpdateComponent implements OnInit {
  isSaving = false;

  feinas: IFeina[] = [];

  editForm = this.fb.group({
    id: [],
    longitud: [],
    latitud: [],
    ubicacio: [],
    feina: []
  });

  constructor(
    protected ubicacioService: UbicacioService,
    protected feinaService: FeinaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ubicacio }) => {
      this.updateForm(ubicacio);

      this.feinaService
        .query()
        .pipe(
          map((res: HttpResponse<IFeina[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IFeina[]) => (this.feinas = resBody));
    });
  }

  updateForm(ubicacio: IUbicacio): void {
    this.editForm.patchValue({
      id: ubicacio.id,
      longitud: ubicacio.longitud,
      latitud: ubicacio.latitud,
      ubicacio: ubicacio.ubicacio,
      feina: ubicacio.feina
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ubicacio = this.createFromForm();
    if (ubicacio.id !== undefined) {
      this.subscribeToSaveResponse(this.ubicacioService.update(ubicacio));
    } else {
      this.subscribeToSaveResponse(this.ubicacioService.create(ubicacio));
    }
  }

  private createFromForm(): IUbicacio {
    return {
      ...new Ubicacio(),
      id: this.editForm.get(['id'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      latitud: this.editForm.get(['latitud'])!.value,
      ubicacio: this.editForm.get(['ubicacio'])!.value,
      feina: this.editForm.get(['feina'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUbicacio>>): void {
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

  trackById(index: number, item: IFeina): any {
    return item.id;
  }
}
