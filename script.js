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

let screens = document.querySelectorAll(".screen");

const appData = {
  rollback: 20,
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    appData.addScreens();
    appData.addServices();

    appData.addPrices();

    // appData.getServicePercentPrice();
    // appData.logger();

    console.log(appData); // Посмотрим, что попало в расчёты
    appData.showResult();
  },
  // Метод, который будет выводить результаты на экран
  showResult: function () {
    total.value = appData.screenPrice;
    // totalCount =
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber; // Стоимость дополнительных услуг
    fullTotalCount.value = appData.fullPrice;
    // totalCountRollback =
  },

  //Метод для добавления информации по экранам:
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select"); // Получили элементы и теперь можем достать из них значения
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  // Добавляем клон блока типа экрана
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    //Похоже, после клонирования кол-во индексов не изменяется, потому что клонируются они только после 1-й формы, но не дальше
  },

  // Метод добавления информации по доп.услугам:
  addServices: function () {
    // Здесь необходимо будет перебрать обе коллекции, достать оттуда информацию и записать в объект services
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value; // объект, в который мы записываем свойства
      }
    });
  },

  // Этот метод будет заниматься высчитыванием стоимости услуг и экранов
  addPrices: function () {
    //Реализовать методом reduce
    for (let screen of appData.screens) {
      appData.screenPrice += screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;
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
