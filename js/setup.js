'use strict';

// Constants
var NUMBER_OF_PIRSONS = 4;
var ENTER_CODE = 13;
var ESC_CODE = 27;

// task4 data
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
/*
var EnterKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    if (document.activeElement === evt.originalTarget) {
      funct();
    }
  }
};
*/
/*
var setKeydownEvent = function (object, key, funct) {
  object.addEventListener('keydown', function (evt) {
    if (evt.keyCode === key) {
      if (document.activeElement === evt.originalTarget) {
        funct();
      }
    }
  });
};
*/

var openSetupWizard = function () {
  setupWizardForm.classList.remove('hidden');

  var closeSetupWizard = function () {
    var setupWizardForm = document.querySelector('.overlay');
    setupWizardForm.classList.add('hidden');
  };

  var cross = setupWizardForm.querySelector('.setup-close');
  cross.addEventListener('click', function () {
    closeSetupWizard();
  });

  var coatClickHandler = function () {
    var coatInput = document.querySelector('.setup-wizard-appearance input:first-of-type');
    var colorValue = getRandomItem(PersonsData.coatColors);
    coatInput.value = colorValue;
    colorCoat.style.fill = colorValue;

  };


  var addKeysEvents = function () {
    var escClickHeandler = function () {
      document.addEventListener('keydown', EscKeydownHandler);
    };

    var removeEscClickHeandler = function () {
      document.removeEventListener('keydown', EscKeydownHandler);
    };

    var nameSetup = document.querySelector('.setup-user-name');

    escClickHeandler();
    nameSetup.addEventListener('focus', function () {
      removeEscClickHeandler();
    });
    nameSetup.addEventListener('blur', function () {
      escClickHeandler();
    });


  };


  var submitButton = document.querySelector('.setup-submit');

  var submitKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      if (document.activeElement === evt.originalTarget) {
        submitSetupForm();
      }
    }
  };

  submitButton.addEventListener('keydown', submitKeydownHandler);

  addKeysEvents();

  var crossKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      if (document.activeElement === evt.originalTarget) {
        closeSetupWizard();
      }
    }
  };

  cross.addEventListener('keydown', crossKeydownHandler);

  var colorCoat = setupWizardForm.querySelector('.setup-wizard .wizard-coat');
  colorCoat.addEventListener('click', coatClickHandler);

  var eyesClickHandler = function () {
    var colorValue = getRandomItem(PersonsData.eyesColors);
    var eyesInput = document.querySelector('.setup-wizard-appearance input:last-of-type');
    eyesInput.value = colorValue;
    colorEyes.style.fill = colorValue;
  };

  var colorEyes = setupWizardForm.querySelector('.setup-wizard .wizard-eyes');
  colorEyes.addEventListener('click', eyesClickHandler);

  var fireballClickHandler = function () {
    var colorValue = getRandomItem(PersonsData.fireBoals);
    colorFireball.querySelector('input').value = colorValue;
    colorFireball.style.backgroundColor = colorValue;
  };

  var colorFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
  colorFireball.addEventListener('click', fireballClickHandler);


  var EscKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeSetupWizard();
    }
  };
  var submitSetupForm = function () {
    var setupForm = document.querySelector('.setup-wizard-form');
    setupForm.submit();
  };
};


var setupWizardForm = document.querySelector('.overlay');


var setupDiv = document.querySelector('.setup-open');
setupDiv.addEventListener('click', function () {
  openSetupWizard();
});

var setupIcon = document.querySelector('.setup-open-icon');

var setupIconKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    if (document.activeElement === evt.originalTarget) {
      openSetupWizard();
    }
  }
};

setupIcon.addEventListener('keydown', setupIconKeydownHandler);

var fragment = document.querySelector('#similar-wizard-template').content;
var randPersons = [];
for (var i = 0; i < NUMBER_OF_PIRSONS; i++) {
  randPersons[i] = getRandomWizard(PersonsData);
  pushWizardData(randPersons[i]);
}

