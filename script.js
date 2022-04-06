"Use strict";

const appData = {
  rollback: 20,
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  servPrice: 0,

  // Убрали все переопределения функций и теперь этот метод нужен только для вызова всех функций в нужном порядке.
  start: function () {
    appData.asking();

    appData.getAllServicePrices();
    appData.getFullPrice();
    appData.getTitle();
    appData.getServicePercentPrices();

    appData.logger();
  },

  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        " КаЛьКулятор Верстки"
      );
    } while (!appData.isString(appData.title));

    do {
      appData.screens = prompt(
        "Какие типы экранов нужно разработать?",
        "Простые, Сложные, Интерактивные"
      );
    } while (!appData.isString(appData.screens));

    do {
      appData.screenPrice = +prompt(
        "Сколько будет стоить данная работа?",
        "20000"
      );
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  isString: function (str) {
    if (typeof str == "string") {
      return true;
    } else {
      return false;
    }
  },

  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Светлая/тёмная темы"
        );
      } else if (i === 1) {
        appData.service2 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Переключение языков ru/eng"
        );
      }
      do {
        appData.servPrice = +prompt("Сколько это будет стоить?", "6000");
      } while (!appData.isNumber(appData.servPrice));
      sum += appData.servPrice;
    }
    appData.allServicePrices = sum;
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

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);

    for (let key in appData) {
      console.log(key);
    }
  },
}; // AppData

appData.start();

console.log(appData.title);
