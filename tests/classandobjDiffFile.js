const Person =require('./classandobj.js');

let person=new Person("Tim","Smith");
console.log(person.fullname());

let x=3;
let y=4;

z=x++ + y*x + x++;
console.log(z);
console.log(y);
console.log(x);
