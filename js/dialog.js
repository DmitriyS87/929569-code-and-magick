'use strict';
var MOVE_SENSIVITY = 3;


var movingObject = {};
var defaultPosition = {};

var pictureMousedownHandler = function (evt) {
  var isDragged = true;
  var movingDialogContainer = document.querySelector('.overlay.setup');

  var inputClickHandler = function (evtClick) {
    evtClick.preventDefault();
    return startMousedownElement.removeEventListener('click', inputClickHandler);
  };

  movingObject = {
    downX: evt.clientX,
    downY: evt.clientY
  };

  isDragged = false;

  defaultPosition = {
    x: parseInt(getComputedStyle(movingDialogContainer).left, 10),
    y: parseInt(getComputedStyle(movingDialogContainer).top, 10)
  };

  var differenceCords = {
    shiftX: movingObject.downX - defaultPosition.x,
    shiftY: movingObject.downY - defaultPosition.y
  };

  var dialogMousemoveHandler = function (evtMove) {

    if (!isDragged) {

      var moveX = evtMove.clientX - movingObject.downX;
      var moveY = evtMove.clientY - movingObject.downY;

      if (Math.abs(moveX) < MOVE_SENSIVITY && Math.abs(moveY) < MOVE_SENSIVITY) {
        return;
      } else {
        isDragged = true;
      }

      movingDialogContainer.style.zIndex = 9999;
      movingDialogContainer.style.position = 'absolute';
    }

    moveX = evtMove.clientX - differenceCords.shiftX;
    moveY = evtMove.clientY - differenceCords.shiftY;

    movingDialogContainer.style.left = moveX + 'px';
    movingDialogContainer.style.top = moveY + 'px';

  };

  document.addEventListener('mousemove', dialogMousemoveHandler);

  var dialogMouseupHandler = function () {

    if (isDragged) {
      startMousedownElement.addEventListener('click', inputClickHandler);
    } else {
      movingDialogContainer.style.left = defaultPosition.x;
      movingDialogContainer.style.top = defaultPosition.y;
    }

    isDragged = false;
    document.removeEventListener('mousemove', dialogMousemoveHandler);
    document.removeEventListener('mouseup', dialogMouseupHandler);
  };
  document.addEventListener('mouseup', dialogMouseupHandler);
};

var startMousedownElement = document.querySelector('.upload input');
startMousedownElement.addEventListener('mousedown', pictureMousedownHandler);


var setDefaultMovinDialogXY = function () {
  document.querySelector('.overlay.setup').removeAttribute('style');
};

var setupWizardForm = document.querySelector('.overlay');
setupWizardForm.addEventListener('setupdialogclosed', setDefaultMovinDialogXY);
