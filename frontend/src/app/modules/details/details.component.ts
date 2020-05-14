import { Component, OnInit, ɵConsole } from '@angular/core';
import { SailorService } from 'src/app/services/sailor/sailor.service';
import { Sailor } from 'src/app/classes/sailor';
import { ReserveService } from 'src/app/services/reserves/reserve.service';
import { Reserve } from 'src/app/classes/reserve';
import { Boat } from 'src/app/classes/boat';
import { BoatService } from 'src/app/services/boat/boat.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public sailors: Sailor[];
  public sailor: Sailor;
  public current_sailor: Sailor;
  public reserves: Reserve[];
  public reserve: Reserve;
  public current_reserve: Reserve;
  public boats: Boat[];
  public boat: Boat;
  public status: boolean = false;
  public creado: boolean = false;
  public updateStatus: boolean = false;
  public actualizar: boolean = false;
  public eliminado: boolean = false;

  constructor(private reserves_service: ReserveService,
    private sailors_service: SailorService,
    private boats_service: BoatService) {
    this.current_sailor = new Sailor({});
    this.current_reserve = new Reserve({});
  }

  ngOnInit() {
    this.getSailors();
    this.getBoats();
  }

  //Mensaje de error
  public notiFilterError() {
    this.eliminado = true;

    setTimeout(function () {
      this.eliminado = false;
    }.bind(this), 3000);
  }

  //Mensaje de actualizar
  public notiUpdate() {
    this.actualizar = true;

    setTimeout(function () {
      this.actualizar = false;
    }.bind(this), 3000);
  }

  //Mensaje de crear
  public notiCreate() {
    this.creado = true;

    setTimeout(function () {
      this.creado = false;
    }.bind(this), 3000);
  }

  //Metodo para traer todos los marineros disponibles.
  public getSailors() {
    this.sailors_service.getSailors().subscribe((data: any) => {
      this.sailors = data;
      this.sailor = new Sailor(data);
    });
  }

  //Metodo para crear una nueva resera
  public createNewReserve(boat: any, day: any, sailor: any) {
    this.boats_service.getBoatByName(boat).subscribe((data: any) => {
      this.boat = data;

      this.reserve = new Reserve({ sailor: sailor, boat: this.boat.id, day: day });

      this.reserves_service.addReserve(this.reserve).subscribe((data: any) => {
        this.currentSailor(sailor);
        this.notiCreate();
      });

    });
  }

  //Metodo para traer todos los botes disponibles.
  public getBoats() {
    this.boats_service.getBoats().subscribe((data: any) => {
      this.boats = data;
    })
  }

  //Metodo para obtener el sailor seleccionado.
  public currentSailor(name: string) {
    console.log(this.current_reserve = null);

    this.sailors_service.getSailorByName(name).subscribe((data: any) => {
      this.current_sailor = new Sailor(data[0]);
      this.currentReserve(this.current_sailor);
    });
  }

  public currentReserve(sailor: Sailor) {
    this.reserves_service.getDetailsBySailor(sailor.id).subscribe((data: any) => {
      this.reserves = data;
      console.log(this.reserves);
    });
  }

  public updateReserve(id: string, id_sailor: string, id_boat: string, day: string) {

    var boat_id;

    this.boats_service.getBoatByName(id_boat).subscribe((data: any) => {
      boat_id = data.id;

      this.reserve = new Reserve({});

      this.reserve.update({
        id: id,
        sailor: id_sailor,
        boat: boat_id,
        day: day
      });

      this.reserves_service.updateReserve(this.reserve).subscribe(data => {
        this.notiUpdate();
      });
    });
  }

  //Metodo para eliminar una reserva
  public deleteReserve(id: string) {
    this.reserves_service.deteleReserve(id).subscribe(data => {
      this.notiFilterError();
    })
  }

  //Metodo para obtener la reserva seleccionada.
  public createReserve() {
    this.status = !this.status;
  }

  public currentlyReserve(e) {
    this.updateStatus = !this.updateStatus;
    this.current_reserve = new Reserve(e);
  }


}
