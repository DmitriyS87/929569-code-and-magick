'use strict';

var startMousedownElement = document.querySelector('.upload input');
var movingDialogContainer = document.querySelector('.overlay.setup');
var movingObject = {};
var MOVE_SENSIVITY = 3;
var defaultPosition = {};
var isDragged;

var pictureMousedownHandler = function (evt) {

  var inputClickHandler = function (evtClick) {
    evtClick.preventDefault();
    return startMousedownElement.removeEventListener('click', inputClickHandler);
  };

  movingObject.downX = evt.clientX;
  movingObject.downY = evt.clientY;

  isDragged = false;

  defaultPosition.x = parseInt(getComputedStyle(movingDialogContainer).left, 10);
  defaultPosition.y = parseInt(getComputedStyle(movingDialogContainer).top, 10);

  movingObject.shiftX = movingObject.downX - defaultPosition.x;
  movingObject.shiftY = movingObject.downY - defaultPosition.y;

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

    movingObject.moveX = evtMove.clientX - movingObject.shiftX;
    movingObject.moveY = evtMove.clientY - movingObject.shiftY;

    movingDialogContainer.style.left = movingObject.moveX + 'px';
    movingDialogContainer.style.top = movingObject.moveY + 'px';


  };


  document.addEventListener('mousemove', dialogMousemoveHandler);

  var dialogMouseupHandler = function () {

    if (isDragged) {
      movingDialogContainer.style.left = movingObject.moveX;
      movingDialogContainer.style.top = movingObject.moveY;
      startMousedownElement.addEventListener('click', inputClickHandler);
    }

    isDragged = false;
    document.removeEventListener('mousemove', dialogMousemoveHandler);
    document.removeEventListener('mouseup', dialogMouseupHandler);
  };
  document.addEventListener('mouseup', dialogMouseupHandler);
};

startMousedownElement.addEventListener('mousedown', pictureMousedownHandler);


var setDefaultMovinDialogXY = function () {
  movingDialogContainer.removeAttribute('style');
};

var setupWizardForm = document.querySelector('.overlay');
setupWizardForm.addEventListener('setupdialogclosed', setDefaultMovinDialogXY);
