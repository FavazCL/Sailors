import { Sailor } from './sailor';
import { Boat } from './boat';

export class Reserve {

    public id: string;
    public sailor: Sailor;
    public boat: Boat;
    public day: string;

    constructor(data: any) {
        this.id = data.id;
        this.sailor = data.sailor;
        this.boat = data.boat;
        this.day = data.day;
    }

    //Metodo para actualizar una reserva localmente.
    public update(reserve: any) {
        if (reserve) {
            if (reserve.id) this.id = reserve.id;
            this.sailor = reserve.sailor;
            this.boat = reserve.boat;
            this.day = reserve.day;
        }
    }

}
