import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'plantilla-feina',
        loadChildren: () => import('./plantilla-feina/plantilla-feina.module').then(m => m.GestioClientsPlantillaFeinaModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.GestioClientsCategoriaModule)
      },
      {
        path: 'repeticio-tasca-setmanal',
        loadChildren: () =>
          import('./repeticio-tasca-setmanal/repeticio-tasca-setmanal.module').then(m => m.GestioClientsRepeticioTascaSetmanalModule)
      },
      {
        path: 'ubicacio',
        loadChildren: () => import('./ubicacio/ubicacio.module').then(m => m.GestioClientsUbicacioModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.GestioClientsClientModule)
      },
      {
        path: 'feina',
        loadChildren: () => import('./feina/feina.module').then(m => m.GestioClientsFeinaModule)
      },
      {
        path: 'control',
        loadChildren: () => import('./control/control.module').then(m => m.GestioClientsControlModule)
      },
      {
        path: 'marcatge',
        loadChildren: () => import('./marcatge/marcatge.module').then(m => m.GestioClientsMarcatgeModule)
      },
      {
        path: 'treballador',
        loadChildren: () => import('./treballador/treballador.module').then(m => m.GestioClientsTreballadorModule)
      },
      {
        path: 'venedor',
        loadChildren: () => import('./venedor/venedor.module').then(m => m.GestioClientsVenedorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GestioClientsEntityModule {}
