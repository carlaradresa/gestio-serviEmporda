import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';

@Component({
  selector: 'jhi-periodicitat-setmanal-detail',
  templateUrl: './periodicitat-setmanal-detail.component.html'
})
export class PeriodicitatSetmanalDetailComponent implements OnInit {
  periodicitatSetmanal: IPeriodicitatSetmanal;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ periodicitatSetmanal }) => {
      this.periodicitatSetmanal = periodicitatSetmanal;
    });
  }

  previousState() {
    window.history.back();
  }
}
