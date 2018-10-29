let fullName: string = "John Doe";
let age: number = 6;
let isDone: boolean = false;
let d: Date = new Date();
let canBeAnything: any = 6;

let list: number[] = [1, 2, 3];
// let list: Array<number> = [1, 2, 3];

enum Color {Red, Green, Blue}
let c: Color = Color.Red;

let obj: { x:number, y:number } = {
  x: 5,
  y: 6
}

console.log(fullName, age, isDone, d, canBeAnything, list, obj);

function buildName(firstName: string, lastName: string, title?: string): string {
  return title + " " + firstName + " " + lastName;
}

console.log(buildName('John', 'Doe', 'Mr'));

type person = {name: string};
let employee: person = {name: 'John'};
let contact: person = {name: 'Doe'};

console.log(employee, contact);
