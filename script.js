"Use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

// Данную коллекцию нужно переопределять перед каждым расчётом, чтобы в неё попадали новые элементы
let screens = document.querySelectorAll(".screen"); // Здесь содержится псевдомассив данных со страницы

const appData = {
  rollback: 20,
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start); // По кнопке start запускается appData.start
    //Делае кнопка "+", создающая клон окошка типа экрана
    buttonPlus.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent; // Поменяли название вкладки на title из h1
  },

  start: function () {
    appData.addScreens();
    // appData.asking();
    // appData.addPrices();
    // appData.getFullPrice();
    // appData.getTitle();
    // appData.getServicePercentPrice();
    // appData.logger();
  },

  //Перебираем экраны:
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(
      function (screen, index) {
        const select = screen.querySelector("select"); // Получили элементы и теперь можем достать из них значения
        const input = screen.querySelector("input");
        //console.dir(select); // сейчас нас интересует свойство selectedIndex - он хранит выбранный варинат. Ещё нас интересует options - html коллекция - достанем из неё textContent
        //console.log(select.options[select.selectedIndex].textContent);
        const selectName = select.options[select.selectedIndex].textContent;

        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
        });
      }
      // На каждой итерации мы будем принимать каждый очередной итерируемый элемент (screen)
    );
    console.log(appData.screens);
  },

  // Добавляем клон блока типа экрана
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    // Чтобы получить последний элемент в коллекции, нужно обратиться по index length-1 - получим индекс самого последнего элемента
    screens[screens.length - 1].after(cloneScreen); // Сделали функционал для кнопки "+"
    //Похоже, после клонирования кол-во индексов не изменяется, потому что клонируются они только после 1-й формы, но не дальше
  },

  // Попробуем рассчитать несколько типов экранов и посмотрим, что попадает в свойства appData.screens

  asking: function () {
    // Теперь нам этот блок не нужен, потому что мы получаем title из вёрстки
    // do {
    //   appData.title = prompt(
    //     "Как называется ваш проект?",
    //     " КаЛьКулятор Верстки"
    //   );
    // } while (
    //   appData.dataTypeCheck(appData.title) == "empty" ||
    //   appData.dataTypeCheck(appData.title) == "number"
    // );

    // Этот блок нам тоже не нужен, потому что мы всё это также получаем из вёрстки
    // for (let i = 0; i < 2; i++) {
    //   let name;
    //   do {
    //     name = prompt(
    //       "Какие типы экранов нужно разработать?",
    //       "Простые/Сложные/Интерактивные"
    //     );
    //   } while (
    //     appData.dataTypeCheck(name) == "empty" ||
    //     appData.dataTypeCheck(name) == "number"
    //   );
    //   let price = 0;
    //   do {
    //     price = prompt("Сколько будет стоить данная работа?", "20000");
    //   } while (!(appData.dataTypeCheck(price) == "number"));

    // Эту часть мы поместили в функцию addScreens.
    // appData.screens.push({ id: i, name: name, price: +price });
    //}

    // Тоже нужно будет перевести в отдельный метод
    for (let i = 0; i < 2; i++) {
      let name = [];
      do {
        name = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Светлая/тёмная темы"
        );
      } while (
        appData.dataTypeCheck(name) == "empty" ||
        appData.dataTypeCheck(name) == "number"
      );
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", "6000");
      } while (!(appData.dataTypeCheck(price) == "number"));

      appData.services[name] = +price;
    }

    // Про адаптив тоже возьмём информацию из вёрстки
    //appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // Этот метод будет заниматься высчитыванием стоимости услуг и экранов
  addPrices: function () {
    //Реализовать методом reduce
    for (let screen of appData.screens) {
      appData.screenPrice += screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  // Мой способ проверки типа вводимых данных, кажется, тоже больше не нужен
  dataTypeCheck: function (data) {
    if (data === null || data === "") {
      return "empty";
    } else if (!Number.isNaN(parseFloat(data)) && isFinite(data)) {
      return "number";
    } else if (!(!Number.isNaN(parseFloat(data)) && isFinite(data))) {
      return "string";
    } else {
      return "weird";
    }
  },

  getRollbackMessage: function (price) {
    switch (true) {
      case 30000 <= price:
        return "Даем скидку в 10%";

      case 15000 <= price && price < 30000:
        return "Даем скидку в 5%";

      case price < 15000 && price == 0:
        return "Скидка не предусмотрена";

      case price < 0:
        return "Что-то пошло не так";

      default:
        return "Вставай, Наташа х)";
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title = appData.title.trim();
    appData.title = appData.title.toLowerCase();
    appData.title =
      appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
  },

  getServicePercentPrice: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
}; // AppData

appData.start();

appData.init();
