const game = document.getElementById("game");

//функция, чтобы по окончанию игры она начиналась снова
function startGame(game, cardsCount) {
  const cardsNumberArray = []; // массив
  let firstCard = null; //переменная для открывания только 2 карточек
  let secondCard = null; //переменная для открывания только 2 карточек

  for (let i = 1; i <= cardsCount; i++) {
    cardsNumberArray.push(i, i); // два i, потому что должно быть 2 одинаковых числа
  };


  //перемешивание
  for (let i = 0; i < cardsNumberArray.length; i++) {
    let randomIndex = Math.floor(Math.random() * cardsNumberArray.length);

    let temp = cardsNumberArray[i];
    cardsNumberArray[i] = cardsNumberArray[randomIndex];
    cardsNumberArray[randomIndex] = temp;
  }


  // настройка сетки
  let columns = 2;

  if (cardsCount === 3) {
    columns = 3;
  };

  if (cardsCount === 4) {
    columns = 4;
  };

  if (cardsCount === 5) {
    columns = 5;
  };

  if (cardsCount > 5) {
    columns = 4;
  }
  game.style = `grid-template-columns: repeat(${columns}, 1fr);`


  // создание карточек
  for (const cardNumber of cardsNumberArray) {
    let card = document.createElement("div");
    card.textContent = cardNumber;

    card.classList.add("card");

    //клик по карточке
    card.addEventListener('click', function () {

      if (card.classList.contains("open") || card.classList.contains("success")) {
        return
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        firstCard = null;
        secondCard = null;
      }

      // добавление класса open
      card.classList.add("open");

      //делаем проверку и присваиваем в переменную карточку при клике
      if (firstCard === null) {
        firstCard = card;
      } else {
        secondCard = card;
      }

      // записываем номер карточки
      if (firstCard !== null && secondCard !== null) {
        let firstCardNumber = firstCard.textContent;
        let secondCardCardNumber = secondCard.textContent;

        // если карточки совпали добавляем класс
        if (firstCardNumber === secondCardCardNumber) {
          firstCard.classList.add("success");
          secondCard.classList.add("success");
        }
      }

      //если кол-во цифр в массиве равно кол-во классов, то игра завепршена
      if (cardsNumberArray.length === document.querySelectorAll(".success").length) {

        setTimeout(function () {
          game.innerHTML = "";

          alert("Поздравляем!");

          let cardsCount = Number(prompt("Введите количество пар", 4)); // кол-во пар
          startGame(game, cardsCount);
        }, 400)
      }
    });

    game.append(card);
  }
};

let cardsCount = Number(prompt("Введите количество пар", 4)); // кол-во пар
startGame(game, cardsCount);
