import { Injectable } from '@angular/core';
import { Sailor } from 'src/app/classes/sailor';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SailorService {

  readonly URL_API = 'http://localhost:1337/sailors';
  private sailor: Sailor;

  constructor(private rest: HttpClient) { }

  public getSailors(): Observable<Sailor> {
    return new Observable<Sailor>(observe => {
      this.rest.get(this.URL_API).subscribe((data: any) => {
        this.sailor = data.map(sailor => {
          return new Sailor(sailor);
        });
        observe.next(this.sailor);
        observe.complete();
      });
    });
  }

  public getSailorByRating(p_rating: number): Observable<Sailor> {
    return new Observable<Sailor>(observe => {
      this.rest.get(`${this.URL_API}/${p_rating}`).subscribe((data: any) => {
        this.sailor = data.map(sailor => {
          return new Sailor(sailor);
        });
        observe.next(this.sailor);
        observe.complete();
      });
    });
  }

  public getSailorByName(name: string): Observable<Sailor> {
    return new Observable<Sailor>(observe => {
      this.rest.get(`${this.URL_API}/byName/${name}`).subscribe((data: any) => {
        this.sailor = data.map(sailor => {
          return new Sailor(sailor);
        });
        observe.next(this.sailor);
        observe.complete();
      });
    });
  }

  public addSailor(sailor: Sailor): Observable<boolean> {
    return new Observable(observe => {
      this.rest.post(this.URL_API, sailor).subscribe((data: any) => {
        sailor.id = data.id;
        observe.next(true);
        observe.complete();
      });
    });
  }

  public updateSailor(sailor: any): Observable<any> {
    return new Observable(observe => {
      this.rest.patch(`${this.URL_API}/${sailor.id}`, sailor)
        .subscribe(data => {
          observe.next(true);
          observe.complete();
        }, error => {
          observe.next(false);
          observe.complete();
        })
    });
  }

  public deteleSailor(id: string): Observable<boolean> {
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
