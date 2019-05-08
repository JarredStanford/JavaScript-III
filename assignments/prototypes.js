/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
'use strict'
function GameObject(attributes) {
  this.createdAt = Date();
  this.name = attributes.name;
  this.dimensions= attributes.dimensions;
}
GameObject.prototype.destroy = function() {
  return(`${this.name} was removed from the game.`);
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(stats) {
  GameObject.call(this, stats);
  this.healthPoints = stats.healthPoints;
}
CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function takeDamage() {
  return(`${this.name} took damage.`);
}
/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(humanAttributes) {
  CharacterStats.call(this, humanAttributes);
  this.team = humanAttributes.team;
  this.weapons = humanAttributes.weapons;
  this.language = humanAttributes.language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function greet() {
  return (`${this.name} offers a greeting in ${this.language}`);
}
/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!
function Warlock(evilAttributes) {
  Humanoid.call(this, evilAttributes);
}

Warlock.prototype = Object.create(Humanoid.prototype);

Warlock.prototype.eldritchBlast = function() {
  return {
    chaosDamage: function() {
      Object.defineProperty(goodDude, "healthPoints", {value : goodDude.healthPoints-10});
      return (`${badDude.name} summons a blast of pure chaos descending from the Eldritch Moon itself. ${goodDude.name} takes 10 chaos damage. ${goodDude.name} has ${goodDude.healthPoints} HP remaining.`)
  }()
}
}

function Shadowdancer(goodAttributes) {
  Humanoid.call(this, goodAttributes);
}

Shadowdancer.prototype = Object.create(Humanoid.prototype);

Shadowdancer.prototype.psychicKnife = function() {
  return {
    psychicDamage: function() {
      Object.defineProperty(badDude, "healthPoints", {value : badDude.healthPoints-10});
      return (`OMG ${goodDude.name} stabs ${badDude.name} with a flurry of stabs from his Psychic Knife! ${badDude.name} takes 10 psychic damage. ${badDude.name} has ${badDude.healthPoints} HP remaining.`)
  }()
}
}

function GymnastWizard(ambiguousAttributes) {
  Humanoid.call(this, ambiguousAttributes);
}

GymnastWizard.prototype = Object.create(Humanoid.prototype);

GymnastWizard.prototype.backflipAppleToss = function() {
  return {
    sacrificialFruitHeal: function() {
      Object.defineProperty(badDude, "healthPoints", {value : badDude.healthPoints+10});
      Object.defineProperty(goodDude, "healthPoints", {value : goodDude.healthPoints+10});
      Object.defineProperty(mumbleBunny, "healthPoints", {value : mumbleBunny.healthPoints-20});
      return (`${mumbleBunny.name} appears athletically from the shadows and casts her signature spell Backflip Apple Toss. The sacrificial fruit heal successfully increases ${badDude.name}'s HP to ${badDude.healthPoints} and ${goodDude.name}'s HP to ${goodDude.healthPoints}, but lowers ${mumbleBunny.name}'s own HP to ${mumbleBunny.healthPoints}. No springs attached!`)
  }()
}
}

const badDude = new Warlock({
  createdAt: new Date(),
  dimensions: {
    length: 4,
    width: 1,
    height: 1,
  },
  healthPoints: 100,
  name: 'Schmebulock',
  team: 'Gnome',
  weapons: [
    'Cantrips',
    'Wand',
  ],
  language: 'Gnomish',
});

const goodDude = new Shadowdancer({
  createdAt: new Date(),
  dimensions: {
    length: 10,
    width: 3,
    height: 4,
  },
  healthPoints: 100,
  name: 'Hendrix',
  team: 'Myconid',
  weapons: [
    'Shadows',
    'Breakdancing',
  ],
  language: 'Myconish?',
});

const mumbleBunny = new GymnastWizard({
  createdAt: new Date(),
  dimensions: {
    length: .1,
    width: .1,
    height: .1,
  },
  healthPoints: 100,
  name: 'Mumble Bunny',
  team: 'Gymnasts',
  weapons: [
    'Springs',
    'Somersaults',
  ],
  language: 'Pommel Horse',
});
console.log(goodDude);
console.log(badDude);
console.log(mumbleBunny);
console.log(goodDude.psychicKnife());
console.log(badDude.eldritchBlast());
console.log(goodDude.psychicKnife());
console.log(badDude.eldritchBlast());
console.log(mumbleBunny.backflipAppleToss());