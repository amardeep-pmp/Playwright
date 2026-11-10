module.exports = class Person

{

    age=24;
    constructor(firstname1,lastname1)
    {
        this.firstname=firstname1;
        this.lastname=lastname1;
    }
    fullname(){
        
        console.log(this.firstname+ "--->"+ this.lastname);
        return this.firstname+ "--->"+ this.lastname
    }
    

}
