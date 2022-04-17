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
//let screens2 = document.getElementsByName("views-select"); // Нужно прописать своё name для экранов

const appData = {
  rollback: 0,
  title: "",
  screens: [], // Экраны - сюда мы будем записывать значения, как только они будут выбраны пользователем
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
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    //startBtn.addEventListener("click", appData.start); // appData.testCount(event) - передаём в testCount событие - клик по кнопке. - не работает
    //startBtn.addEventListener("click", appData.testCount);
    appData.addRollback();
    //Вызываем функцию appData.conditionCheck для проверки обеих форм выбора типа экрана - select и input
    screens[0].addEventListener("change", appData.conditionCheck);
    screens[0].addEventListener("input", appData.conditionCheck);
    // Изначально кнопка отключена
    appData.disableButtonCount();
  },
  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    appData.addScreens();
    console.log(appData.screens);
    appData.addServices();
    console.log(appData.servicesPercent);
    console.log(appData.servicesNumber);
    appData.addPrices();

    // // appData.getServicePercentPrice();
    // // appData.logger();

    // //console.log(appData); // Посмотрим, что попало в расчёты
    appData.showResult();
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
    appData.screens = []; // Обнуляем информацию по экранам
    appData.screensCount = 0;
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select"); // Получили элементы и теперь можем достать из них значения
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      //console.dir(select);
      // Нас интересует selectedIndex - оно хранит индекс того option, который мы выбрали
      //console.dir(select.options[select.selectedIndex]);
      // Обратимся к options и по индексу достанем тот options, который выбран
      //console.dir(select.options[select.selectedIndex].textContent);
      // А затем обратимся к свойству .textContent

      appData.screens.push({
        // Отправляем в массив appData.screens информацию о выбранном экране
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });

      appData.screensCount += +input.value;
    });

    //console.log(appData.screens);
  },

  // Добавляем клон блока типа экрана
  addScreenBlock: function () {
    screens = document.querySelectorAll(".screen"); // Обновляем screens каждый раз - сейчас вручную, но если ввести в js screens через динамический document.getElementsByName, то он сам будет обновляться, нужно только добавить уникальное имя в HTML
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
    screens[screens.length - 1].addEventListener(
      "change",
      appData.conditionCheck
    );
    screens[screens.length - 1].addEventListener(
      "input",
      appData.conditionCheck
    );
    appData.conditionCheck();
  },

  // Метод добавления информации по доп.услугам:
  addServices: function () {
    //appData.servicesNumber = {};
    // Здесь необходимо будет перебрать обе коллекции, достать оттуда информацию и записать в объект services
    appData.servicesPercent = [];
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    appData.servicesNumber = [];
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
    appData.screenPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;

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

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },

  // Отключаем работу кнопки
  disableButtonCount: function () {
    startBtn.style.backgroundColor = "#777777";
    startBtn.removeEventListener("click", appData.start);
  },

  // Включаем работу кнопки
  enableButtonCount: function () {
    startBtn.style.backgroundColor = "#A52A2A";
    startBtn.addEventListener("click", appData.start);
  },

  // Функция проверки условия заполненности формы информации по экранам
  conditionCheck: function () {
    // forEachh здесь не подходит, потому что return в её случае работает не так, как нам в данном случае нужно
    for (i = 0; i < screens.length; i++) {
      const index = screens[i].querySelector("select").selectedIndex;
      const input = +screens[i].querySelector("input").value;
      //console.log(input);
      if (index !== 0 && input > 0) {
        appData.enableButtonCount();
      } else {
        appData.disableButtonCount();
        return;
      }
    }
  },
}; // AppData

//appData.start();

appData.init();
