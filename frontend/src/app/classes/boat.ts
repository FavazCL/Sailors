export class Boat {

    public id: string;
    public name: string;
    public color: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
    }

    //Metodo para actualizar un bote localmente.
    public update(boat: any) {
        if (boat) {
            if (boat.id) this.id = boat.id;
            this.name = boat.name;
            this.color = boat.color;
        }
    }

}
