/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. In the global scope, "this" will have the same definition as window. It will call all of the rules of the Node.
     If you tell the code to 'use strict' rules, "this" willl no longer have a definition.
* 2. This will refer to the object that it is bound in.
* 3. This refers to the object created by a constructor function.
* 4. This is bound explicitly when using call/bind/apply by adding what this should refer to as the first parameter in the function.
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this);

// Principle 2
// code example for Implicit Binding
const object = {
    name: "Jarred",
    writeCode: function(language) {
        return (`my name is ${this.name} and I love ${language}!`)
    }
}
console.log(object.writeCode("Javascript"));
// Principle 3
// code example for New Binding
function Apple(varietal, color){
    this.varietal = varietal;
    this.color = color;
}
// Principle 4
function eatApple(type) {
    return (`my name is ${this.name} and I love ${type} apples!`)
}
console.log(eatApple.call(object, "honeycrisp"));
// code example for Explicit Binding