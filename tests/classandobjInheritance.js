const Person =require('./classandobj.js');

class Pet extends Person{


    constructor(Firstname2,lastname2,breed2)
    {

        super(Firstname2,lastname2);
        this.breed=breed2
    }

    fullname()
    {
        return this.firstname + this.lastname + this.breed
    }
}

let pet=new Pet("Tommy","Jolly","labrador");
console.log(pet.fullname());