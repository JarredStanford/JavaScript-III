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
"use strict";
function GameObject(attributes) {
  this.createdAt = Date();
  this.name = attributes.name;
  this.dimensions = attributes.dimensions;
}
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

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
  return `${this.name} took damage.`;
};
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
  this.spellPower = humanAttributes.spellPower;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function greet() {
  return `${this.name} offers a greeting in ${this.language}`;
};
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
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
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

Warlock.prototype.eldritchBlast = function(target) {
  let spellTarget = target;
  let caster = this.name;
  let damage = this.spellPower * 10;
  return function() {
      Object.defineProperty(spellTarget, "healthPoints", {value: spellTarget.healthPoints - damage});
      if (spellTarget.healthPoints > 0) {
        return `${caster} summons a blast of pure chaos descending from the Eldritch Moon itself. ${spellTarget.name} takes ${damage} chaos damage. ${spellTarget.name} has ${spellTarget.healthPoints} HP remaining.`;
      } else return `${caster}'s chaotic ways have torn ${spellTarget.name} to pieces, ${spellTarget.name} has died.`;
    }()
  };

function Shadowdancer(goodAttributes) {
  Humanoid.call(this, goodAttributes);
}

Shadowdancer.prototype = Object.create(Humanoid.prototype);

Shadowdancer.prototype.psychicKnife = function(target) {
  let spellTarget = target;
  let caster = this.name;
  let damage = this.spellPower * 10;
  return function() {
      Object.defineProperty(spellTarget, "healthPoints", {value: spellTarget.healthPoints - damage});
      if (spellTarget.healthPoints > 0) {
        return `OMG ${caster} stabs ${spellTarget.name} with a flurry of stabs from his Psychic Knife! ${spellTarget.name} takes ${damage} psychic damage. ${spellTarget.name} has ${spellTarget.healthPoints} HP remaining.`;
      } else return `${caster}'s Psychic power overwhelms ${spellTarget.name}, ${spellTarget.name} has died.`;
    }()
  };

function GymnastWizard(ambiguousAttributes) {
  Humanoid.call(this, ambiguousAttributes);
}

GymnastWizard.prototype = Object.create(Humanoid.prototype);

GymnastWizard.prototype.backflipAppleToss = function(target1, target2) {
  let spellTarget1 = target1;
  let spellTarget2 = target2;
  let caster = this;
  let damage = this.spellPower * 10;
  return function() {
      Object.defineProperty(spellTarget1, "healthPoints", {value: spellTarget1.healthPoints + damage});
      Object.defineProperty(spellTarget2, "healthPoints", {value: spellTarget2.healthPoints + damage});
      Object.defineProperty(caster, "healthPoints", {value: caster.healthPoints - 2 * damage});
      return `${caster.name} appears athletically from the shadows and casts her signature spell Backflip Apple Toss. The sacrificial fruit heal successfully increases ${spellTarget1.name}'s HP to ${spellTarget1.healthPoints} and ${spellTarget2.name}'s HP to ${spellTarget2.healthPoints}, but lowers ${caster.name}'s own HP to ${caster.healthPoints}. No springs attached!`;
    }()
  };

const badDude = new Warlock({
  createdAt: new Date(),
  dimensions: {
    length: 4,
    width: 1,
    height: 1
  },
  healthPoints: 100,
  name: "Schmebulock",
  team: "Gnome",
  weapons: ["Cantrips", "Wand"],
  language: "Gnomish",
  spellPower: 7
});

const goodDude = new Shadowdancer({
  createdAt: new Date(),
  dimensions: {
    length: 10,
    width: 3,
    height: 4
  },
  healthPoints: 100,
  name: "Hendrix",
  team: "Myconid",
  weapons: ["Shadows", "Breakdancing"],
  language: "Myconish?",
  spellPower: 5
});

const mumbleBunny = new GymnastWizard({
  createdAt: new Date(),
  dimensions: {
    length: 0.1,
    width: 0.1,
    height: 0.1
  },
  healthPoints: 100,
  name: "Mumble Bunny",
  team: "Gymnasts",
  weapons: ["Springs", "Somersaults"],
  language: "Pommel Horse",
  spellPower: 2
});
console.log(goodDude);
console.log(badDude);
console.log(mumbleBunny);
console.log(goodDude.psychicKnife(badDude));
console.log(badDude.eldritchBlast(goodDude));
console.log(goodDude.psychicKnife(badDude));
console.log(mumbleBunny.backflipAppleToss(badDude, goodDude));
console.log(goodDude.psychicKnife(mumbleBunny));
console.log(badDude.eldritchBlast(goodDude));

/*I spent way too much time on this...

OMG Hendrix stabs Schmebulock with a flurry of stabs from his Psychic Knife! Schmebulock takes 50 psychic damage. Schmebulock has 50 HP remaining.

Schmebulock summons a blast of pure chaos descending from the Eldritch Moon itself. Hendrix takes 70 chaos damage. Hendrix has 30 HP remaining.

Hendrix's Psychic power overwhelms Schmebulock, Schmebulock has died.

Mumble Bunny appears athletically from the shadows and casts her signature spell Backflip Apple Toss. The sacrificial fruit heal successfully increases Schmebulock's HP to 20 and Hendrix's HP to 50, but lowers Mumble Bunny's own HP to 10. No springs attached!

OMG Hendrix stabs Mumble Bunny with a flurry of stabs from his Psychic Knife! Mumble Bunny takes 50 psychic damage. Mumble Bunny has 50 HP remaining.

Schmebulock's chaotic ways have torn Hendrix to pieces, Hendrix has died.*/