import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatComponent } from './modules/boat/boat.component';
import { SailorComponent } from './modules/sailor/sailor.component';
import { HomeComponent } from './modules/home/home.component';
import { ReservesComponent } from './modules/reserves/reserves.component';
import { DetailsComponent } from './modules/details/details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'boats',
    component: BoatComponent
  },
  {
    path: 'sailors',
    component: SailorComponent
  },
  {
    path: 'reserves',
    component: ReservesComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
