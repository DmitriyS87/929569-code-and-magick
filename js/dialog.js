'use strict';

var startMousedownElement = document.querySelector('.upload');
var movingDialogContainer = document.querySelector('.overlay.setup');
var movingObject = {};
var MOVE_SENSIVITY = 3;
var defaultPosition = {};

var pictureMousedownHandler = function (evt) {

  movingObject.downX = evt.clientX;
  movingObject.downY = evt.clientY;

  document.addEventListener('mousemove', dialogMousemoveHandler);
};
startMousedownElement.addEventListener('mousedown', pictureMousedownHandler);

var dialogMousemoveHandler = function (evt) {

  if (!movingObject.avatar) {
    var moveX = evt.clientX - movingObject.downX;
    var moveY = evt.clientY - movingObject.downY;
    if (Math.abs(moveX) < MOVE_SENSIVITY && Math.abs(moveY) < MOVE_SENSIVITY) {
      return;
    }

    movingObject.avatar = movingDialogContainer.cloneNode(true);
    movingDialogContainer.classList.add('hidden');
    var parentElement = movingDialogContainer.parentNode;
    defaultPosition.x = parentElement.clientWidth * parseInt(getComputedStyle(movingDialogContainer).left, 10) / 100;
    defaultPosition.y = parseInt(getComputedStyle(movingDialogContainer).top, 10);
    movingObject.shiftX = movingObject.downX - defaultPosition.x;
    movingObject.shiftY = movingObject.downY - defaultPosition.y;
    document.body.appendChild(movingObject.avatar);
    movingObject.avatar.style.zIndex = 9999;
    movingObject.avatar.style.position = 'absolute';
  }

  movingObject.avatar.style.left = evt.clientX - movingObject.shiftX + 'px';
  movingObject.avatar.style.top = evt.clientY - movingObject.shiftY + 'px';
  document.addEventListener('mouseup', dialogMouseupHandler);
};

var dialogMouseupHandler = function () {
  if (movingObject.avatar) {
    movingDialogContainer.style.left = movingObject.avatar.style.left;
    movingDialogContainer.style.top = movingObject.avatar.style.top;
    movingObject.avatar.remove();
    movingDialogContainer.classList.remove('hidden');
    document.removeEventListener('mousemove', dialogMousemoveHandler);
  }
  movingObject.avatar = '';

};

var setDefaultMovinDialogXY = function () {
  movingDialogContainer.removeAttribute('style');
};

var setupWizardForm = document.querySelector('.overlay');
setupWizardForm.addEventListener('setupdialogclosed', setDefaultMovinDialogXY);
