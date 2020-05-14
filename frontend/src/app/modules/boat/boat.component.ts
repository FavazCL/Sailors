import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/app/classes/boat';
import { BoatService } from 'src/app/services/boat/boat.service';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  public boats: Boat[];
  public boat: Boat;
  public boats_by_color: Boat[];
  public edit: string = '';
  public close: string = '';
  public filtrado: boolean = false;
  public filtradoError: boolean = false;
  public creado: boolean = false;
  public actualizar: boolean = false;
  public eliminado: boolean = false;
  public colorName: string = '';

  constructor(private boat_service: BoatService) {
    this.boat = new Boat({});
  }

  ngOnInit() {
    this.getBoats();
  }

  //Mensaje de eliminación
  public notiDelete() {
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

  //Mensaje de exito
  public notiFilter() {
    this.filtrado = true;

    setTimeout(function () {
      this.filtrado = false;
    }.bind(this), 3000);
  }

  //Mensaje de error
  public notiFilterError() {
    this.filtradoError = true;

    setTimeout(function () {
      this.filtradoError = false;
    }.bind(this), 3000);
  }

  //Se obtienen todos los botes creados y se almacenan en la variable local.
  public getBoats() {
    this.boat_service.getBoats().subscribe((data: any) => {
      this.boats = data;
      this.boat = new Boat(data);
    });
  }

  //Metodo para filtrar por color.
  public getBoatByColor(p_color: string) {
    if (this.boats_by_color != null) {
      this.boats_by_color = null;
    }

    this.boat_service.getBoatByColor(p_color).subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        this.boats_by_color = data;
        this.notiFilter();
      } else {
        this.notiFilterError();
      }
    });
  }

  //Metodo que consume el servicio para crear un nuevo bote.
  public createBoat(name: string, color: string) {    
    this.boat = new Boat({ name: name, color: color.toLocaleLowerCase() });
    this.boat_service.addBoat(this.boat).subscribe(data => {
      this.getBoats();
      this.notiCreate();
    })
  }

  //Obtenemos el bote seleccionado.
  public currentlyBoat(e) {
    this.boat = e;
    this.edit = 'is-active';
    this.close = '';
  }

  //Cerramos el modal.
  public closeModal() {
    this.edit = '';
    this.close = 'modal-close'
  }

  //Meotodo para actualizar un bote seleccionado.
  public updateBoat(id: string, name: string, color: string) {
    this.boat.update({
      id: id,
      name: name,
      color: color,
    });

    this.boat_service.updateBoat(this.boat).subscribe(data => {
      this.boat_service.getBoats().subscribe((data: any) => {
        this.boats = data;
        this.notiUpdate();
      })
    });
  }

  //Metodo para eliminar un bote.
  public deleteBoat(id: string) {
    this.boat_service.deteleBoat(id).subscribe(data => {
      this.getBoats();
      this.notiDelete();
    });
  }

}
