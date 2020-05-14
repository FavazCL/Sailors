import { Injectable } from '@angular/core';
import { Sailor } from 'src/app/classes/sailor';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserve } from 'src/app/classes/reserve';

@Injectable()
export class ReserveService {

  readonly URL_API = 'http://localhost:1337/reserves';
  private reserve: Reserve;

  constructor(private rest: HttpClient) { }

  public getReserves(): Observable<Reserve> {
    return new Observable<Reserve>(observe => {
      this.rest.get(this.URL_API).subscribe((data: any) => {
        this.reserve = data.map(reserve => {
          return new Reserve(reserve);
        });
        observe.next(this.reserve);
        observe.complete();
      });
    });
  }

  public getAllDetails(): Observable<Reserve> {
    return new Observable<Reserve>(observe => {
      this.rest.get(`${this.URL_API}/details`).subscribe((data: any) => {
        this.reserve = data.map(reserve => {
          console.log(this.reserve);
          return new Reserve(reserve);
        });
        observe.next(this.reserve);
        observe.complete();
      });
    });
  }

  public getDetailsBySailor(p_sailor: string): Observable<Reserve> {
    return new Observable<Reserve>(observe => {
      this.rest.get(`${this.URL_API}/${p_sailor}`).subscribe((data: any) => {
        this.reserve = data.map(reserve => {
          return new Reserve(reserve);
        });
        observe.next(this.reserve);
        observe.complete();
      });
    });
  }

  public addReserve(reserve: Reserve): Observable<boolean> {
    return new Observable(observe => {
      this.rest.post(this.URL_API, reserve).subscribe((data: any) => {
        reserve.id = data.id;
        observe.next(true);
        observe.complete();
      });
    });
  }

  public updateReserve(reserve: any): Observable<any> {
    return new Observable(observe => {
      this.rest.patch(`${this.URL_API}/${reserve.id}`, reserve)
        .subscribe(data => {
          observe.next(true);
          observe.complete();
        }, error => {
          observe.next(false);
          observe.complete();
        })
    });
  }

  public deteleReserve(id: string): Observable<boolean> {
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

}
