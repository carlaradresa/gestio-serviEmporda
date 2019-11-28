import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVenedor } from 'app/shared/model/venedor.model';

@Component({
  selector: 'jhi-venedor-detail',
  templateUrl: './venedor-detail.component.html'
})
export class VenedorDetailComponent implements OnInit {
  venedor: IVenedor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ venedor }) => {
      this.venedor = venedor;
    });
  }

  previousState() {
    window.history.back();
  }
}
