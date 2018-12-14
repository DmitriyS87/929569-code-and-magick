'use strict';

var dialogSetupContainer = document.querySelector('.overlay.setup');
var artifactsShopElements = document.querySelector('.setup-artifacts-shop').children;
var setupedArtifactsElements = document.querySelector('.setup-artifacts').children;

var dragAndDropElement = function (movingElement) {
  var MOVE_SENSIVITY = 3;

  var movingObject = {};
  var defaultPosition = {};

  var pictureMousedownHandler = function (evt) {
    var isDragged = true;

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
      x: parseInt(getComputedStyle(movingElement).left, 10),
      y: parseInt(getComputedStyle(movingElement).top, 10)
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

        movingElement.style.zIndex = 9999;
        movingElement.style.position = 'absolute';
      }

      moveX = evtMove.clientX - differenceCords.shiftX;
      moveY = evtMove.clientY - differenceCords.shiftY;

      movingElement.style.left = moveX + 'px';
      movingElement.style.top = moveY + 'px';

    };

    document.addEventListener('mousemove', dialogMousemoveHandler);

    var dialogMouseupHandler = function () {

      if (isDragged) {
        startMousedownElement.addEventListener('click', inputClickHandler);
      }
      isDragged = false;
      document.removeEventListener('mousemove', dialogMousemoveHandler);
      document.removeEventListener('mouseup', dialogMouseupHandler);
    };
    document.addEventListener('mouseup', dialogMouseupHandler);
  };

  var startMousedownElement = document.querySelector('.upload input');
  startMousedownElement.addEventListener('mousedown', pictureMousedownHandler);
};

var drugEl = null;

var artDNDStartHandler = function (evtStart) {
  evtStart.target.style.zIndex = 9999;
  evtStart.target.style.position = 'absolute';
  evtStart.target.style.opacity = '0.4';

  drugEl = evtStart.target;


  evtStart.dataTransfer.setData('text/plain', evtStart.target.id);
  evtStart.dataTransfer.setDragImage(evtStart.target, 20, 20);
  evtStart.dataTransfer.mozCursor = 'pointer';
};

var divOverHandler = function (evtOver) {
  if (evtOver.preventDefault()) {
    evtOver.preventDefault();
  }

  evtOver.dataTransfer.effectAllowed = 'move';
};

var divEnterHandler = function (evtOver) {
  evtOver.target.classList.add('enter');
};

var divLeaveHandler = function (evtLeave) {
  evtLeave.target.classList.remove('enter');
};

var artDNDEndHandler = function (evtEnd) {
  evtEnd.target.removeAttribute('style');
};

var artDNDDropHandler = function (evtDrop) {
  evtDrop.stopPropagation();
  evtDrop.preventDefault();
  var data = evtDrop.dataTransfer.getData('text/plain');
  if (drugEl !== evtDrop.target && drugEl.parentNode !== evtDrop.target) {
    evtDrop.target.innerHTML = '';
    var dropElement = document.getElementById(data);
    evtDrop.target.appendChild(dropElement);
    evtDrop.target.classList.remove('enter');
  }
};

var setListenersToArt = function (parentDiv, name) {
  var currentCell;
  for (var i = 0; i < parentDiv.length; i++) {
    currentCell = parentDiv[i].querySelector('.setup-artifacts-cell img');
    parentDiv[i].addEventListener('drop', artDNDDropHandler);
    parentDiv[i].addEventListener('dragover', divOverHandler);
    parentDiv[i].addEventListener('dragenter', divEnterHandler);
    parentDiv[i].addEventListener('dragleave', divLeaveHandler);
    if (currentCell) {
      currentCell.addEventListener('dragstart', artDNDStartHandler);
      currentCell.setAttribute('id', '\'' + currentCell.alt + i + '\'');
      currentCell.addEventListener('dragend', artDNDEndHandler);
    }
    parentDiv[i].setAttribute('id', name + i);
  }
};

setListenersToArt(artifactsShopElements, 'shop');
setListenersToArt(setupedArtifactsElements, 'setup');

if (dialogSetupContainer) {
  dragAndDropElement(dialogSetupContainer);
}

var setDefaultMovinDialogXY = function () {
  document.querySelector('.overlay.setup').removeAttribute('style');
};

var setupWizardForm = document.querySelector('.overlay');
setupWizardForm.addEventListener('setupdialogclosed', setDefaultMovinDialogXY);
