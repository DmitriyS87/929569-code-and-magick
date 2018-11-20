'use strict';

// Константы задания module2-task1:
var HEIGHTDIAGRAM = 150;
var message = 'Ура Вы победили!\nСписок результатов:';
var BARWIDTH = 40;
var SPACEBETWEENBAR = 50;
var CURRENTPLAYERNAME = 'Вы';
var MAINRESULTSX = 110;
var MAINRESULTSY = 20;
var MAINRESULTWIDTH = 420;
var MAINRESULTHEIGHT = 270;
var MINSATURATION = 0;
var RESULTSHADOWX = 10;
var RESULTSHADOWY = 10;
var ROWHEIGHT = 20;
var MESSAGEX = 120;
var MESSAGEY = 40;
var SYMBOLWIDHTPX = 8;
var DIAGRAMPADDINGLEFT = 40;
var SCORESTEXTMARGIN = 9;
var DIAGRAMPADDINGBOTTOM = 30;
// функция возвращает делитель для отрисовки диаграммы
var getDevider = function (times, heightPx) {
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return Math.round(maxTime / heightPx);
};

// Функция вычисляет произвольную насыщенность цвета в rgb()
var getColorSaturation = function (minSaturation) {
  return minSaturation + Math.ceil(Math.random() * (255 - minSaturation));
};

// Функция округляет входящее значение и возвращает его в виде строки
var getTimeString = function (time) {
  return Math.round(time).toString();
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем поле для вывода результатов
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(MAINRESULTSX, MAINRESULTSY, MAINRESULTWIDTH, MAINRESULTHEIGHT);
  ctx.fillStyle = 'white';
  ctx.fillRect(MAINRESULTSX - RESULTSHADOWX, MAINRESULTSY - RESULTSHADOWY, MAINRESULTWIDTH, MAINRESULTHEIGHT);
  // Печатаем текст
  var messageArray = message.split('\n');
  ctx.font = '16px Pt Mono';
  ctx.fillStyle = '#000';
  var messageMaxWidth = MAINRESULTWIDTH - (MESSAGEX - MAINRESULTSX) * 2;
  for (var stringIndex = 0; stringIndex < messageArray.length; stringIndex++) {
    ctx.fillText(messageArray[stringIndex], MESSAGEX, MESSAGEY + stringIndex * ROWHEIGHT, messageMaxWidth);
  }
  // высота гистограммы задана в 150px, Результаты игроков имеют другую систему исчисления. Получаем пропорцию для отрисовки гистограммы результатов
  var chartDevider = getDevider(times, HEIGHTDIAGRAM);
  // Вычисляем отступ по оси Х между соседними столбиками диаграммы
  var nextBarX = BARWIDTH + SPACEBETWEENBAR;
  // Переменная для хранения высоты столбика диаграммы
  var heightCurrentBar;
  // Рисуем диаграмму с результатами игроков
  var barX = MAINRESULTSX + DIAGRAMPADDINGLEFT;
  var barY = MAINRESULTHEIGHT - DIAGRAMPADDINGBOTTOM;
  for (var i = 0; i < names.length; i++) {
    heightCurrentBar = times[i] / chartDevider;
    ctx.fillStyle = 'rgb(0, 0, ' + getColorSaturation(MINSATURATION) + ')';
    // Цвет диаграммы результатов текущего игрока устанавливаем красным
    if (names[i] === CURRENTPLAYERNAME) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'
      ;
    }
    ctx.fillRect(barX + i * nextBarX, barY - heightCurrentBar, BARWIDTH, heightCurrentBar);// рисуем столбик гистограммы
    ctx.fillStyle = '#000';// задаем цвет шрифта надписей
    ctx.fillText(names[i], barX + i * nextBarX + BARWIDTH / 2 - names[i].length / 2 * SYMBOLWIDHTPX, barY + ROWHEIGHT);// подписываем имя игрока под его результатом
    ctx.fillText(getTimeString(times[i]), barX + i * nextBarX, barY - heightCurrentBar - SCORESTEXTMARGIN);// подписываем количество очков/время игрока
  }


};
