let person = {
    name: 'Alice',
    age: 25,
    greet: function() {
        console.log(`Hello, my name  is ${this.name}`)
    },
    greetAnother() {
        console.log(`Hello, my name is ${this.name}`)
    },
};

console.log(person.name);
person.greet();
person.greetAnother();

person.gender = 'female';
console.log(person.gender);
person.age = 30;
console.log(person.age);
delete person.gender;
console.log(person.gender);

let { name, age } = person;
console.log(name);
console.log(age);

let { name: personName, age: personAge } = person;
console.log(personName);
console.log(personAge);

let keys = Object.keys(person)
let values = Object.values(person)
let entries = Object.entries(person);

let additionalInfo = { country: 'USA' };
let updatePerson = Object.assign({}, person, additionalInfo);

Object.freeze(person);
person.age = 35;
console.log(person.age);

let sealedPerson = { name: 'Bob', age: 40};
sealedPerson.age = 45;
sealedPerson.gender = 'male';
console.log(sealedPerson.age);
console.log(sealedPerson.gender);