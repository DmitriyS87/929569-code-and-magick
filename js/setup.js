'use strict';

// Constants
var NUMBEROFPIRSONS = 4;

// task3 data
var personsData = {
  names: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'],
  surnames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};
// random function: return random index from imput massive data
var getRandomChoise = function (massiveData) {
  var randomIndex = Math.ceil(Math.random() * (massiveData.length - 1));
  return randomIndex;
};
// function return random person specification in object
var getRandPerson = function (objPersons) {
  var personData = {
    name: objPersons.names[getRandomChoise(objPersons.names)] + ' ' + objPersons.surnames[getRandomChoise(objPersons.surnames)],
    coatColor: objPersons.coatColors[getRandomChoise(objPersons.coatColors)],
    eyesColor: objPersons.eyesColors[getRandomChoise(objPersons.eyesColors)]
  };
  return personData;
};
// make some DOM element
var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// make person object and write in new massive randPersons
var randPersons = [];
// randPersons[0] = getRandPerson(personsData);

for (var i = 0; i < NUMBEROFPIRSONS; i++) {
  randPersons[i] = getRandPerson(personsData);
}
// console.log(randPersons);

// find first hidden area
var hiddenObj = document.querySelector('.hidden');
// remove style hidden
hiddenObj.classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var divItem = makeElement('div', '#similar-wizard-template', randPersons[0].name);
similarWizardTemplate.appendChild(divItem);
