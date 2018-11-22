'use strict';

// Constants
var NUMBER_OF_PIRSONS = 4;

// task3 data
var PersonsData = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};
// random function: return random item from imput massive data
var getRandomChoise = function (massiveData, massiveDataCustom) {
  var randomIndex = Math.ceil(Math.random() * (massiveData.length - 1));
  var resultString;
  if (massiveDataCustom !== undefined) {
    var randomIndex2 = Math.ceil(Math.random() * (massiveDataCustom.length - 1));
    var first = Math.round(Math.random());
    switch (first) {
      case 1: resultString = massiveDataCustom[randomIndex2] + ' ' + massiveData[randomIndex];
        break;
      default: resultString = massiveData[randomIndex] + ' ' + massiveDataCustom[randomIndex2];
        break;
    }
  } else {
    resultString = massiveData[randomIndex];
  }
  return resultString;
};

// function return random person specification in object
var getRandPerson = function (objPersons) {
  var personData = {
    name: getRandomChoise(objPersons.names, objPersons.surnames),
    coatColor: getRandomChoise(objPersons.coatColors),
    eyesColor: getRandomChoise(objPersons.eyesColors)
  };
  return personData;
};

var pushPlayerData = function (players) {
  // clon fragment
  var clone = fragment.cloneNode(true);
  // writnig wizards info
  var p = clone.querySelector('.setup-similar-label');
  p.textContent = players.name;
  var coatColorElement = clone.querySelector('.wizard-coat');
  coatColorElement.style.fill = players.coatColor;
  var eyesColorElement = clone.querySelector('.wizard-eyes');
  eyesColorElement.style.fill = players.eyesColor;
  // push it to user
  var insertPlace = document.querySelector('.setup-similar-list');
  insertPlace.appendChild(clone);

};

// if browser knows content
if ('content' in document.createElement('template')) {
  // find first hidden area
  var hiddenObj = document.querySelector('.hidden');
  // remove style hidden
  hiddenObj.classList.remove('hidden');
  // read find template by id
  var fragment = document.querySelector('#similar-wizard-template').content;
  // make person object and write in new massive randPersons
  var randPersons = [];
  for (var i = 0; i < NUMBER_OF_PIRSONS; i++) {
    randPersons[i] = getRandPerson(PersonsData);
    // construct template clone with randPersons data and push it to user
    pushPlayerData(randPersons[i]);
  }
  // show players subbox
  var hiddenDiv = document.querySelector('.setup-similar');
  hiddenDiv.classList.remove('hidden');
}
