export class Sailor {

    public id: string;
    public name: string;
    public rating: number;
    public age: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.rating = data.rating;
        this.age = data.age;
    }

    //Metodo para actualizar un marinero localmente.
    public update(sailor: any) {
        if (sailor) {
            if (sailor.id) this.id = sailor.id;
            this.name = sailor.name;
            this.rating = sailor.rating;
            this.age = sailor.age;
        }
    }

}
