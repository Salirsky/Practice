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

let screensSelect = document.querySelectorAll(".main-controls__select option");
let screens = document.querySelectorAll(".screen");

//console.log(screensSelect);

const appData = {
  rollback: 0,
  title: "",
  screens: [],
  screensCount: 0,
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
    appData.addRollback();
    appData.countBan();
  },
  // Метод, который будет выводить результаты на экран
  showResult: function () {
    total.value = appData.screenPrice; // Стоимость вёрстки
    totalCount.value = appData.screensCount; // Количество экранов для вёрстки
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber; // Стоимость дополнительных услуг
    fullTotalCount.value = appData.fullPrice; // Полная стоимость
    totalCountRollback.value = appData.servicePercentPrice; // Полная стоимость с учётом отката
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

      appData.screensCount += +input.value;
    });

    console.dir(appData.screens);
  },

  // Добавляем клон блока типа экрана
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
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

  addRollback: function () {
    const rangeLogger = function (event) {
      inputRangeValue.textContent = event.target.value + "%";
      appData.rollback = event.target.value; // Записываем в свойство rollback значение, полученное в range
    };
    inputRange.addEventListener("input", rangeLogger);
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

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  // logger: function () {
  //   console.log(appData.fullPrice);
  //   console.log(appData.servicePercentPrice);
  //   console.log(appData.screens);
  // },

  countBan: function () {
    //console.dir(appData.screens);
    console.log(appData.screens);
    if (
      appData.screensCount === 0 ||
      appData.screens[0].name == "Тип экранов"
    ) {
      startBtn.addEventListener("click", function (event) {
        event.preventDefault(); // запретили работу кнопки
        console.log("Я не буду считать твоё ничего!");
      });
    } else {
      console.log("Всё в порядке!");
    }
  },
}; // AppData

appData.start();

appData.init();
