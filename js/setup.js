'use strict';

// Constants
var NUMBER_OF_PIRSONS = 4;
var ENTER_CODE = 13;

// task3 data
var PersonsData = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireBoals: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
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

var openSetupWizard = function () {
  var setupWizardForm = document.querySelector('.overlay');
  setupWizardForm.classList.remove('hidden');

  var cross = setupWizardForm.querySelector('.setup-close');
  cross.addEventListener('click', function () {
    closeSetupWizard();
  });
  addKeysListener();
  someObjectFocusKeydownHandler(cross, ENTER_CODE, closeSetupWizard);


  var submitSetupForm = function () {
    var setupForm = document.querySelector('.setup-wizard-form');
    setupForm.submit();
  };
  // console.log(setupForm);
  var submitButton = document.querySelector('.setup-submit');
  someObjectFocusKeydownHandler(submitButton, ENTER_CODE, submitSetupForm);

  var addColorCoatClickHandler = function () {
    var colorCoat = setupWizardForm.querySelector('.setup-wizard .wizard-coat');
    colorCoat.addEventListener('click', function () {
      var coatInput = document.querySelector('.setup-wizard-appearance input:first-of-type');
      var colorValue = getRandomItem(PersonsData.coatColors);
      coatInput.value = colorValue;
      colorCoat.style.fill = colorValue;
    });
  };

  var addColorEyesClickHandler = function () {
    var colorEyes = setupWizardForm.querySelector('.setup-wizard .wizard-eyes');
    colorEyes.addEventListener('click', function () {
      var colorValue = getRandomItem(PersonsData.eyesColors);
      var eyesInput = document.querySelector('.setup-wizard-appearance input:last-of-type');
      eyesInput.value = colorValue;
      colorEyes.style.fill = colorValue;
    });
  };

  var addColorFireballsClickHandler = function () {
    var colorFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
    colorFireball.addEventListener('click', function () {
      var colorValue = getRandomItem(PersonsData.fireBoals);
      colorFireball.querySelector('input').value = colorValue;
      colorFireball.style.backgroundColor = colorValue;
    });
  };
  // fireBoals

  addColorCoatClickHandler();
  addColorEyesClickHandler();
  addColorFireballsClickHandler();
};

var closeSetupWizard = function () {
  var setupWizardForm = document.querySelector('.overlay');
  setupWizardForm.classList.add('hidden');
};

var doEscButtonCheck = function (evt) {
  if (evt.keyCode === 27) {
    closeSetupWizard();
  }
};

var addKeysListener = function () {
  var addDocumentEscClickHeandler = function () {
    document.addEventListener('keydown', doEscButtonCheck);
  };

  var removeDocumentEscClickHeandler = function () {
    document.removeEventListener('keydown', doEscButtonCheck);
  };

  addDocumentEscClickHeandler();

  var nameSetup = document.querySelector('.setup-user-name');
  nameSetup.addEventListener('focus', function () {
    removeDocumentEscClickHeandler();
  });
  nameSetup.addEventListener('blur', function () {
    addDocumentEscClickHeandler();
  });

};

var someObjectFocusKeydownHandler = function (object, key, funct) {
  object.addEventListener('focus', function () {
    document.addEventListener('keydown', function (evt) {

      if (evt.keyCode === key) {
        funct();
      }
    });
  });
};

// var makeSubmitDisable = function () {

// };

// var wizardNameInput = document.querySelector('.setup-user-name');
// wizardNameInput.addEventListener('invalid', makeSubmitDisable);

// if browser knows content
if ('content' in document.createElement('template')) {
  var setupDiv = document.querySelector('.setup-open');
  setupDiv.addEventListener('click', function () { // var addSetupDivClickHandler =
    openSetupWizard();
    // console.log(setupWizardForm.classList);
  });
  /* var submitButton = document.querySelector('.setup-submit');
  submitButton.addEventListener('click', function (evt) {

  });*/

  var setupIcon = document.querySelector('.setup-open-icon');
  someObjectFocusKeydownHandler(setupIcon, ENTER_CODE, openSetupWizard);

  // var hiddenObj = document.querySelector('.hidden');
  // hiddenObj.classList.remove('hidden');
  var fragment = document.querySelector('#similar-wizard-template').content;
  var randPersons = [];
  for (var i = 0; i < NUMBER_OF_PIRSONS; i++) {
    randPersons[i] = getRandomWizard(PersonsData);
    pushWizardData(randPersons[i]);
  }
  // var hiddenDiv = document.querySelector('.setup-similar');
  // hiddenDiv.classList.remove('hidden');
}
