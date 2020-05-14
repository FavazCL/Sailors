import { Component, OnInit } from '@angular/core';
import { SailorService } from 'src/app/services/sailor/sailor.service';
import { Sailor } from 'src/app/classes/sailor';

@Component({
  selector: 'app-sailor',
  templateUrl: './sailor.component.html',
  styleUrls: ['./sailor.component.scss']
})
export class SailorComponent implements OnInit {

  public sailors: Sailor[];
  public sailor: Sailor;
  public sailors_by_rating: Sailor[];
  public edit: string = '';
  public close: string = '';
  public filtrado: boolean = false;
  public filtradoError: boolean = false;
  public creado: boolean = false;
  public actualizar: boolean = false;
  public eliminado: boolean = false;

  constructor(private sailor_service: SailorService) {
    this.sailor = new Sailor({});
  }

  ngOnInit() {
    this.getSailors();
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

  //Metodo para traer todos los marineros disponibles.
  public getSailors() {
    this.sailor_service.getSailors().subscribe((data: any) => {
      this.sailors = data;
      this.sailor = new Sailor(data);
    });
  }

  //Metodo para filtrar por rating.
  public getSailorByRating(p_rating: number) {
    if (this.sailors_by_rating != null) {
      this.sailors_by_rating = null;
    }

    this.sailor_service.getSailorByRating(p_rating).subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        this.sailors_by_rating = data;
        this.notiFilter();
      } else {
        this.notiFilterError();
      }
    })
  }

  //Metodo para crear un nuevo marinero.
  public createSailor(name: string, rating: number, age: number) {
    this.sailor = new Sailor({ name: name, rating: rating, age: age });
    this.sailor_service.addSailor(this.sailor).subscribe(data => {
      this.getSailors();
      this.notiCreate();
    })
  }

  //Metodo para obtener el marinero seleccionado.
  public currentlySailor(e) {
    this.sailor = e;
    this.edit = 'is-active';
    this.close = '';
  }

  //Metodo para cerrar el modal.
  public closeModal() {
    this.edit = '';
    this.close = 'modal-close'
  }

  //Metodo para actualizar un marinero.
  public updateSailor(id: string, name: string, rating: number, age: number) {
    this.sailor.update({
      id: id,
      name: name,
      rating: rating,
      age: age
    });

    this.sailor_service.updateSailor(this.sailor).subscribe(data => {
      this.sailor_service.getSailors().subscribe((data: any) => {
        this.sailors = data;
        this.notiUpdate();
      })
    });
  }

  //Metodo para eliminar un marinero.
  public deleteSailor(id: string) {
    this.sailor_service.deteleSailor(id).subscribe(data => {
      this.getSailors();
      this.notiDelete();
    })
  }

}
