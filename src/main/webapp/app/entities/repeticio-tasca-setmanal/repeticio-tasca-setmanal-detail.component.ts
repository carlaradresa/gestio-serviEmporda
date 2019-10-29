import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';

@Component({
  selector: 'jhi-repeticio-tasca-setmanal-detail',
  templateUrl: './repeticio-tasca-setmanal-detail.component.html'
})
export class RepeticioTascaSetmanalDetailComponent implements OnInit {
  repeticioTascaSetmanal: IRepeticioTascaSetmanal;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ repeticioTascaSetmanal }) => {
      this.repeticioTascaSetmanal = repeticioTascaSetmanal;
    });
  }

  previousState() {
    window.history.back();
  }
}
