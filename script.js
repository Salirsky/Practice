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

  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        " КаЛьКулятор Верстки"
      );
    } while (!isString(appData.title));

    do {
      appData.screens = prompt(
        "Какие типы экранов нужно разработать?",
        "Простые, Сложные, Интерактивные"
      );
    } while (!isString(appData.screens));

    do {
      appData.screenPrice = +prompt(
        "Сколько будет стоить данная работа?",
        "20000"
      );
    } while (!isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = function (str) {
  if (typeof str == "string") {
    return true;
  } else {
    return false;
  }
};

const getAllServicePrices = function () {
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
    } while (!isNumber(appData.servPrice));
    sum += appData.servPrice;
  }
  return sum;
};

const getRollbackMessage = function (price) {
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
};

function getFullPrice() {
  return appData.screenPrice + appData.allServicePrices;
}

const getTitle = function () {
  appData.title = appData.title.trim();
  appData.title = appData.title.toLowerCase();
  appData.title =
    appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
  return appData.title;
};

const getServicePercentPrices = function () {
  return Math.ceil(
    appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
  );
};

appData.asking();

appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice();
appData.title = getTitle();
appData.servicePercentPrice = getServicePercentPrices();

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
