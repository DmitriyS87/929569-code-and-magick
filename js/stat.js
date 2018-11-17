    window.renderStatistics = function(ctx,names,times) {
        var maxTime=times[0];
        var maxIndex=0;
        var chartDeviderConst;//постоянная - пропорция для отрисовки диаграммы
        //Сздаем квадратное облако для вывода результата
        ctx.fillStyle='rgba(0, 0, 0, 0.7)';
        ctx.fillRect(110,20,420,270);
        ctx.fillStyle='white';
        ctx.fillRect(100,10,420,270);
        //Печатаем текст
        var messageStats='Ура Вы победили!\nСписок результатов:'.split('\n');
        ctx.font ='16px Pt Mono';
        ctx.fillStyle='#000';
        for (var i=0; i<messageStats.length; i++) {
            ctx.fillText(messageStats[i],120,40+i*20,380);
        }
         // Прочитаем массив со временем и вычислим максимальное время - самая высокая гистограмма на будущем графике
        for (var i=1;i<names.length;i++) {
            if (times[i]>maxTime) {
                maxTime=times[i];
                maxIndex=i;
            };
        };
        //высота гистограммы задана в 150px, значения в игре имеют другую систему исчисления. Получаем пропорцию для отрисовки
        chartDeviderConst=Math.round(maxTime/150);
        var figureDistance=90; //ширина столбика 40px + расстояние между ними 50px. Константа участвует в вычислении положения следующего столбика
        var chartItemHeight; 

        for (var i=0; i<names.length;i++) {
            chartItemHeight=times[i]/chartDeviderConst;
            ctx.fillStyle='rgb(0, 0, ' + Math.ceil(Math.random()*255) + ')';//задаем рандом на насыщенность синим
            if (names[i]=='Вы') {ctx.fillStyle='rgba(255, 0, 0, 1)'};//Наше значение устанавливаем красным
            ctx.fillRect(160+i*figureDistance,240-chartItemHeight,40,chartItemHeight);//рисуем столбик гистограммы
            ctx.fillStyle='#000';//задаем цвет шрифта надписей
            ctx.fillText(names[i],160+i*figureDistance+20-names[i].length/2*8,260);//подписываем количество очков/время игрока
            ctx.fillText(Math.round(times[i]).toString(),160+i*figureDistance,240-chartItemHeight-9);//подписываем имя игрока под его результатом
        }



    }