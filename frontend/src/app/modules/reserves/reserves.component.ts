import { Component, OnInit } from '@angular/core';
import { ReserveService } from 'src/app/services/reserves/reserve.service';
import { Reserve } from 'src/app/classes/reserve';
import { Boat } from 'src/app/classes/boat';
import { Sailor } from 'src/app/classes/sailor';
import { SailorService } from 'src/app/services/sailor/sailor.service';
import { BoatService } from 'src/app/services/boat/boat.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.scss']
})
export class ReservesComponent implements OnInit {

  public reserves: Reserve[];
  public reserve: Reserve;
  public reserves_by_details: Reserve[];
  public reserves_by_sailor: Reserve[];
  public boats: Boat[];
  public sailors: Sailor[];
  public edit: string = '';
  public close: string = '';
  public details: boolean = false;

  constructor(private reserve_service: ReserveService,
    private sailor_service: SailorService, private boat_service: BoatService) {
      this.getReserves();
      this.getSailors();
      this.getBoats();
  }

  ngOnInit() {
  }

  //Metodo para master details.
  public getReserveDetails() {
    if (this.reserves_by_details != null) {
      this.reserves_by_details = null;
    }

    this.reserve_service.getAllDetails().subscribe((data: any) => {
      this.reserves_by_details = data;
      console.log(this.reserves_by_details);
      this.details = true;
    })
  }

  //Metodo para master details por sailor.
  public getDetailsBySailor(p_sailor: string) {
    if (this.reserves_by_sailor != null) {
      this.reserves_by_sailor = null;
    }

    this.reserve_service.getDetailsBySailor(p_sailor).subscribe((data: any) => {
      this.reserves_by_sailor = data;
      console.log(this.reserves_by_sailor);
      this.details = true;
    })
  }

  //Metodo para obtener todas las reservas.
  public getReserves() {
    this.reserve_service.getReserves().subscribe((data: any) => {
      this.reserves = data;
      this.reserve = new Reserve(data);
    });
  }

  //Metodo para obtener todos los marineros.
  public getSailors() {
    this.sailor_service.getSailors().subscribe((data: any) => {
      this.sailors = data;
    });
  }

  //Metodo para obtener todos los botes.
  public getBoats() {
    this.boat_service.getBoats().subscribe((data: any) => {
      this.boats = data;
    });
  }

  //Metodo para crear una nueva reserva.
  public createReserve(id_sailor: string, id_boat: string, day: string) {
    this.reserve = new Reserve({ sailor: id_sailor, boat: id_boat, day: day });

    this.reserve_service.addReserve(this.reserve).subscribe(data => {
      this.getReserves();
    });
    
  }

  //Metodo para obtener la reserva seleccionada.
  public currentlyReserve(e) {
    this.reserve = e;
    this.edit = 'is-active';
    this.close = '';
  }

  //Metodo para cerrar el modal.
  public closeModal() {
    this.edit = '';
    this.close = 'modal-close'
  }

  //Metodo para actualizar una reserva.
  public updateReserve(id: string, id_sailor: string, id_boat: string, day: string) {
    this.reserve.update({
      id: id,
      sailor: id_sailor,
      boat: id_boat,
      day: day
    });

    this.reserve_service.updateReserve(this.reserve).subscribe(data => {
      this.reserve_service.getReserves().subscribe((data: any) => {
        this.reserves = data;
      })
    });

  }

  //Metodo para eliminar una reserva
  public deleteReserve(id: string) {
    this.reserve_service.deteleReserve(id).subscribe(data => {
      this.getReserves();
    })
  }

}
