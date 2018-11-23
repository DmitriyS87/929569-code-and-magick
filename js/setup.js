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

var getRandomItem = function (massiveData) {
  var randomIndex = Math.ceil(Math.random() * (massiveData.length - 1));
  return massiveData[randomIndex];
};

var getOneOrZero = function () {
  return Math.round(Math.random());
};

var nameSurnameReverse = function (names, surNames) {
  if (getOneOrZero() < 1) {
    return getRandomItem(names) + ' ' + getRandomItem(surNames);
  } else {
    return getRandomItem(surNames) + ' ' + getRandomItem(names);
  }
};

// function return random person specification in object
var getRandomWizard = function (objPersons) {
  var personData = {
    name: nameSurnameReverse(objPersons.names, objPersons.surnames),
    coatColor: getRandomItem(objPersons.coatColors),
    eyesColor: getRandomItem(objPersons.eyesColors)
  };
  return personData;
};

var pushWizardData = function (players) {
  var clone = fragment.cloneNode(true);
  var p = clone.querySelector('.setup-similar-label');
  p.textContent = players.name;
  var coatColorElement = clone.querySelector('.wizard-coat');
  coatColorElement.style.fill = players.coatColor;
  var eyesColorElement = clone.querySelector('.wizard-eyes');
  eyesColorElement.style.fill = players.eyesColor;
  var insertPlace = document.querySelector('.setup-similar-list');
  insertPlace.appendChild(clone);

};

// if browser knows content
if ('content' in document.createElement('template')) {
  var hiddenObj = document.querySelector('.hidden');
  hiddenObj.classList.remove('hidden');
  var fragment = document.querySelector('#similar-wizard-template').content;
  var randPersons = [];
  for (var i = 0; i < NUMBER_OF_PIRSONS; i++) {
    randPersons[i] = getRandomWizard(PersonsData);
    pushWizardData(randPersons[i]);
  }
  var hiddenDiv = document.querySelector('.setup-similar');
  hiddenDiv.classList.remove('hidden');
}
