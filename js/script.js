
let playing = false;//Начало игры
let score = 0;//Счет
let action;
let timeRemaining;//Время
let correctAnswer;//Правильные ответы

//Событие кнопки для начала игры
document.querySelector("#startreset").onclick = () =>//Стрелочная функция на событии ES6
{
    //если мы начинаем играеть
    if (playing) {
        //Заново начать
        location.reload();
    }
    //если мы не начнем играем
    else {
        //изменение режима игры
        playing = true;
        //Начальный счет 0
        score = 0;
        document.querySelector("#scorevalue").innerHTML = score;
        //Переменая с обратным счетам
        showElement("timeremaining");
        //Выставление лимита по времни
        timeRemaining = 60;
        //отсчет в секундах
        document.querySelector("#timeremainingvalue").innerHTML = timeRemaining;
        //Проигрыш
        hideElement("gameOver");
        //изменить кнопку для сброса
        document.querySelector("#startreset").innerHTML = "Начать заново";
        //обратный отсчет
        startCountdown();
        //Генирация примеров
        generateQA();
    }
}

for (let i = 1; i < 5; i++) {
    //если мы нажимаем на  ответ
    document.querySelector("#box" + i).onclick = () =>
    {
        //мы играем
        if (playing) {
            //Правильный ответ
            if (document.querySelector("#box" + i).innerHTML == correctAnswer) {
                //увеличить балл на 1
                score++;
                //установить значение балла
                document.querySelector("#scorevalue").innerHTML = score;
                //скрыть неправильное поле и показать правильное поле
                hideElement("wrong");
                showElement("correct");
                setTimeout(() =>
                {
                    hideElement("correct");
                }, 1000);

                 //Генирация примеров
                generateQA();
            }
            //Неправильный пример
            else {
                //показать неправильное и скрыть правильное
                hideElement("correct");
                showElement("wrong");
                setTimeout(() =>
                {
                    hideElement("wrong");
                }, 1000);
            }
        }
    }
}

function startCountdown()
{
    action = setInterval(() =>
    {
        //сократить время на 1 секунду в циклах
        timeRemaining -= 1;
        //show countdown in sec
        document.querySelector("#timeremainingvalue").innerHTML = timeRemaining;
        //показать обратный отсчет в секундах
        if (timeRemaining == 0) {
            //Проигрышь
            stopCountdown();
            //показать игру за коробкой
            showElement("gameOver");
            //показать игру поверх сообщения и набрать очки
            document.querySelector("#gameOver").innerHTML = "<p>Время вышло</p><p>Твой счет: " + score + ".</p>";
            //скрыть обратный отсчет
            hideElement("timeremaining");
            //Убрать правильный ответ
            hideElement("correct");
            //Убрать неправильный
            hideElement("wrong");
            //Начать заново
            playing = false;
            //Начать играть
            document.querySelector("#startreset").innerHTML = "Начать играть";
        }
    }, 1000);
}

function stopCountdown()
{
    //остановка обратного отсчета
    clearInterval(action);
}

function hideElement(Id)
{
    document.querySelector("#" + Id).style.display = "none";
}

function showElement(Id)
{
    document.querySelector("#" + Id).style.display = "block";
}
//#region  Generaticya
/////////////////////R//////////////////////
//////////////////////A////////////////////
///////////////////////N//////////////////
////////////////////////D////////////////
/////////////////////////O//////////////
//////////////////////////M////////////
function generateQA()
{
    //генирация чисел от  1-10
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    //правильный ответ
    correctAnswer = x + y;
    //Постановка вопроса
    document.querySelector("#question").innerHTML = x + " + " + y;
    //установка случайной позиции для правильного ответа
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.querySelector("#box" + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    //проверка и замена повторяющихся значений
    for (let i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while ((answers.indexOf(wrongAnswer)) > -1)
            document.querySelector("#box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer)
        }
    }
}
//end region

console.log(generateQA());
console.log(score);
console.log(action);
console.log(timeRemaining);
console.log(score);
console.log(correctAnswer);
console.log(startreset);

