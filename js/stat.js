'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Вводные данные задания module2-task1:
  var heightDiagram = 150;
  var message = 'Ура Вы победили!\nСписок результатов:';
  var barWidth = 40;
  var spaceBetweenBar = 50;
  var currentPlayerName = 'Вы';
  var mainResultsX = 110;
  var mainResultsY = 20;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(mainResultsX, mainResultsY, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(mainResultsX - 10, mainResultsY - 10, 420, 270);
  // Печатаем текст
  var messageArray = message.split('\n');
  ctx.font = '16px Pt Mono';
  ctx.fillStyle = '#000';
  for (var stringIndex = 0; stringIndex < messageArray.length; stringIndex++) {
    ctx.fillText(messageArray[stringIndex], 120, 40 + stringIndex * 20, 380);
  }
  // функция возвращает делитель для отрисовки диаграммы
  var getDevider = function (heightPx) {
    var maxTime = times[0];
    for (var i = 1; i < names.length; i++) {
      if (times[i] > maxTime) {
        maxTime = times[i];
      }
    }
    return Math.round(maxTime / heightPx);
  };
  // высота гистограммы задана в 150px, Результаты игроков имеют другую систему исчисления. Получаем пропорцию для отрисовки гистограммы результатов
  var chartDevider = getDevider(heightDiagram);
  // Вычисляем отступ по оси Х между соседними столбиками диаграммы
  var nextBarX = barWidth + spaceBetweenBar;
  // Переменная для хранения высоты столбика диаграммы
  var heightCurrentBar;
  // Функция вычисляет произвольную насыщенность цвета в rgb()
  var getColorSaturation = function () {
    return Math.ceil(Math.random() * 255);
  };
  // Рисуем диаграмму с результатами игроков
  for (var i = 0; i < names.length; i++) {
    heightCurrentBar = times[i] / chartDevider;
    ctx.fillStyle = 'rgb(0, 0, ' + getColorSaturation() + ')';
    // Цвет диаграммы результатов текущего игрока устанавливаем красным
    if (names[i] === currentPlayerName) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'
      ;
    }
    var getTimeString = function (j) {
      return Math.round(times[j]).toString();
    };
    ctx.fillRect(mainResultsX + 40 + i * nextBarX, 240 - heightCurrentBar, 40, heightCurrentBar);// рисуем столбик гистограммы
    ctx.fillStyle = '#000';// задаем цвет шрифта надписей
    ctx.fillText(names[i], mainResultsX + 40 + i * nextBarX + 20 - names[i].length / 2 * 8, 260);// подписываем имя игрока под его результатом
    ctx.fillText(getTimeString(i), mainResultsX + 40 + i * nextBarX, 240 - heightCurrentBar - 9);// подписываем количество очков/время игрока
  }


};
