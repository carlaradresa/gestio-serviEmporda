import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUbicacio } from 'app/shared/model/ubicacio.model';

@Component({
  selector: 'jhi-ubicacio-detail',
  templateUrl: './ubicacio-detail.component.html'
})
export class UbicacioDetailComponent implements OnInit {
  ubicacio: IUbicacio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ubicacio }) => {
      this.ubicacio = ubicacio;
    });
  }

  previousState() {
    window.history.back();
  }
}
