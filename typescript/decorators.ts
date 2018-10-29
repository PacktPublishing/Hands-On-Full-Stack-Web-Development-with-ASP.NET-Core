// tsc decorators.ts --target ES5 --experimentalDecorators

function logClassInit(target: any) {
  // preserve a reference to the original constructor
 const original = target;

 // a class instance factory
 function construct(constructor, args) {
   const c: any = () => constructor.apply(this, args);
   c.prototype = constructor.prototype;
   return new c();
 }

 // the new constructor behavior
 const f: any = (...args) => {
   console.log("Instantiated: " + original.name);
   return construct(original, args);
 };

 // copy prototype so intanceof operator still works
 f.prototype = original.prototype;
 // return new constructor (will override original)
 return f;
}

@logClassInit
class Person {}

const p = new Person(); // logs to the console: `Instantiated: Person`
