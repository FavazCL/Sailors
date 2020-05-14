import { Injectable, Inject } from '@angular/core';
import { Boat } from 'src/app/classes/boat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BoatService {

    readonly URL_API = 'http://localhost:1337/boats';
    private boat: Boat;

    constructor(private rest: HttpClient) { }

    public getBoats(): Observable<Boat> {
        return new Observable<Boat>(observe => {
            this.rest.get(this.URL_API).subscribe((data: any) => {
                this.boat = data.map(boat => {
                    return new Boat(boat);
                });
                observe.next(this.boat);
                observe.complete();
            });
        });
    }

    public getBoatByColor(p_color: string): Observable<any> {
        return new Observable<any>(observe => {
            this.rest.get(`${this.URL_API}/${p_color}`).subscribe((data: any) => {
                this.boat = data.map(boat => {
                    return new Boat(boat);
                });
                observe.next(this.boat);
                observe.complete();
            });
        });
    }

    public addBoat(boat: Boat): Observable<boolean> {
        return new Observable(observe => {
            this.rest.post(this.URL_API, boat).subscribe((data: any) => {
                boat.id = data.id;
                observe.next(true);
                observe.complete();
            }, error => {
                observe.next(false);
                observe.complete();
            });
        });
    }

    public updateBoat(boat: any): Observable<any> {
        return new Observable(observe => {
            this.rest.patch(`${this.URL_API}/${boat.id}`, boat)
                .subscribe(data => {
                    observe.next(true);
                    observe.complete();
                }, error => {
                    observe.next(false);
                    observe.complete();
                })
        });
    }

    public deteleBoat(id: string): Observable<boolean> {
        return new Observable(observe => {
            this.rest.delete(`${this.URL_API}/${id}`).subscribe(data => {
                observe.next(true);
                observe.complete();
            }, error => {
                observe.next(false);
                observe.complete();
            });
        });
    }

    public getBoatByName(name: string): Observable<Boat> {
        return new Observable<Boat>(observe => {
            this.rest.get(`${this.URL_API}/byName/${name}`).subscribe((data: any) => {
                console.log(data);
                this.boat = new Boat(data);
                observe.next(this.boat);
                observe.complete();
            });
        });
    }

}
