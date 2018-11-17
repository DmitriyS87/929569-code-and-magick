    window.renderStatistics = function(ctx,names,times) {
        var maxTime=times[0];
        var maxIndex=0;
        var chartDeviderConst;
        //Сздаем квадратное облако для вывода результата
        ctx.fillStyle='rgba(0, 0, 0, 0.7)';
        ctx.fillRect(110,20,420,270);
        ctx.fillStyle='white';
        ctx.fillRect(100,10,420,270);
        //Печатаем текст
        var messageStats='Ура Вы победили!\nСписок результатов:'.split('\n');
        ctx.font ='16px Pt Mono';
        ctx.fillStyle='#000';
        //this.alert(messageStats[1]);
        for (var i=0; i<2; i++) {
            ctx.fillText(messageStats[i],120,30+i*20,380);
        }
         // Прочитаем массив со временем и вычислим максимальную высоту для прорисовки
        for (var i=1;i<names.length;i++) {
            if (times[i]>maxTime) {
                maxTime=times[i];
                maxIndex=i;
            };
        };
        //получаем пропорцию для остальных значений массива
        chartDeviderConst=Math.round(maxTime/150);
        var figureDistance=90;
        var chartItemHeight; 
       // var getColor=function() {
        //    var CountBlue=Math.random();
          //  var stringColor = 'rgb(0,0,' + Math.ceil(CountBlue) + ')';
       //     return stringColor
       // }    
        for (var i=0; i<names.length;i++) {
            chartItemHeight=times[i]/chartDeviderConst;
            ctx.fillStyle='rgb(0, 0, ' + Math.ceil(Math.random()*255) + ')';//getColor();
            if (names[i]=='Вы') {ctx.fillStyle='rgba(255, 0, 0, 1)'};
            ctx.fillRect(160+i*figureDistance,240-chartItemHeight,40,chartItemHeight);
            ctx.fillStyle='#000';
            ctx.fillText(names[i],160+i*figureDistance+20-names[i].length/2*8,260);
            ctx.fillText(Math.round(times[i]).toString(),160+i*figureDistance,240-chartItemHeight-9);
        }



    }