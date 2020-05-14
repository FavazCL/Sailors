import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatComponent } from './modules/boat/boat.component';
import { SailorComponent } from './modules/sailor/sailor.component';
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SailorService } from './services/sailor/sailor.service';
import { BoatService } from './services/boat/boat.service';
import { FormsModule } from '@angular/forms';
import { ReservesComponent } from './modules/reserves/reserves.component';
import { ReserveService } from './services/reserves/reserve.service';
import { DetailsComponent } from './modules/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    BoatComponent,
    SailorComponent,
    HomeComponent,
    NavbarComponent,
    ReservesComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SailorService, BoatService, ReserveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
