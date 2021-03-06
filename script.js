
"Use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

const mainControlsSelect = document.querySelectorAll(".main-controls__select");
const customCheckboxes = document.querySelectorAll(".custom-checkbox");
const viewsSelect = document.getElementsByName("views-select");

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");
const checkboxCMS = document.getElementById("cms-open");
const hiddenSelectCMS = document.querySelector(".hidden-cms-variants");
const selectCMS = document.querySelectorAll(".cms-select");
const otherCMS = document.querySelector(
  ".hidden-cms-variants .main-controls__input"
);
const otherInputCMS = document.getElementById("cms-other-input");

const start = () => {
  addScreens();
  addServices();
  addPrices();
  showResult();
  inputDisabled();
};
// После нажатия на кнопку "рассчитать" все input блокируются,
// а на месте кнопки "рассчитать" появляется кнопка "сброс"
const inputDisabled = () => {
  startBtn.style.display = "none";
  resetBtn.style.display = "block";

  for (const viewSelect of viewsSelect) {
    viewSelect.setAttribute("disabled", "");
  }

  for (const customCheckbox of customCheckboxes) {
    customCheckbox.setAttribute("disabled", "");
  }

  screens.forEach(function (screen) {
    let input = screen.querySelector("input");
    input.setAttribute("disabled", "");
  });

  otherInputCMS.setAttribute("disabled", "");
};

//Метод для добавления информации по экранам:
const addScreens = () => {
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
};

// Метод добавления информации по доп.услугам:
const addServices = () => {
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
};

// Расчёты стоимости услуг и экранов
const addPrices = () => {
  appData.screenPrice = 0;
  appData.servicePricesNumber = 0;
  appData.servicePricesPercent = 0;
  appData.fullPrice = 0;
  appData.servicePercentPrice = 0;
  appData.cmsPercent = 0;

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

  appData.cmsPercent = +otherInputCMS.value;

  appData.fullPrice =
    appData.screenPrice +
    appData.servicePricesPercent +
    appData.servicePricesNumber +
    (appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber) *
      (appData.cmsPercent / 100);

  appData.servicePercentPrice = Math.ceil(
    appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
  );
};

// Метод, который будет выводить результаты на экран
const showResult = () => {
  total.value = appData.screenPrice; // Стоимость вёрстки
  totalCount.value = appData.screensCount; // Количество экранов для вёрстки
  totalCountOther.value =
    appData.servicePricesPercent + appData.servicePricesNumber; // Стоимость дополнительных услуг
  fullTotalCount.value = appData.fullPrice; // Полная стоимость
  totalCountRollback.value = appData.servicePercentPrice; // Полная стоимость с учётом отката
};

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
  cmsPercent: 0,

  init: function () {
    this.addTitle();
    buttonPlus.addEventListener("click", this.addScreenBlock);
    //Вызываем функцию appData.conditionCheck для проверки обеих форм выбора типа экрана - select и input
    screens[0].addEventListener("change", this.conditionCheck);
    screens[0].addEventListener("input", this.conditionCheck);
    inputRange.addEventListener("input", this.addRollback);
    // Изначально кнопка отключена
    this.disableButtonCount();
    resetBtn.addEventListener("click", this.reset);
    checkboxCMS.addEventListener("click", this.openCheckbox);
    selectCMS[0].addEventListener("change", this.otherCMS);
  },

  // Открываем скрытую менюшку CMS
  openCheckbox: function () {
    hiddenSelectCMS.style.display = "flex";
  },

  // Открываем скрытую форму при выборе "другое"
  otherCMS: function () {
    //console.log(selectCMS); // сейчас мы получаем весь этот HTML-элемент
    // Чтобы достать каждый option, нужно перебрать весь select
    for (let i = 0; i < selectCMS.length; i++) {
      const index = selectCMS[i].querySelector("select").selectedIndex;
      if (index === 2) {
        otherCMS.style.display = "flex";
      }
    }
  },

  reset: function () {
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    hiddenSelectCMS.style.display = "none";

    for (const viewSelect of viewsSelect) {
      viewSelect.removeAttribute("disabled");
    }
    for (const customCheckbox of customCheckboxes) {
      customCheckbox.checked = false;
      customCheckbox.removeAttribute("disabled");
    }

    otherInputCMS.removeAttribute("disabled", "");

    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;

    inputRangeValue.textContent = 0;
    appData.rollback = 0;
    inputRange.value = 0;

    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;

    for (let i = 0; i < screens.length; i++) {
      screens[i].querySelector("select").selectedIndex = 0;
      screens[i].querySelector("input").value = "";
    }

    screens.forEach(function (screen) {
      let input = screen.querySelector("input");
      input.removeAttribute("disabled", "");
    });
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  // Добавляем клон блока типа экрана
  addScreenBlock: function () {
    screens = document.querySelectorAll(".screen");
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

  addRollback: function (event) {
    inputRangeValue.textContent = event.target.value + "%"; // Записываем процент под формой range
    appData.rollback = event.target.value; // Записываем в свойство rollback значение, полученное в range
    if (appData.fullPrice !== 0) {
      appData.servicePercentPrice = Math.ceil(
        appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
      );
      totalCountRollback.value = appData.servicePercentPrice; // Обновляем значение totalCountRollback.value для функции showResult
    }
  },

  // logger: function () {
  //   console.log(appData.fullPrice);
  //   console.log(appData.servicePercentPrice);
  //   console.log(appData.screens);
  // },

  // Отключаем работу кнопки 'рассчитать'
  disableButtonCount: function () {
    startBtn.style.backgroundColor = "#777777";
    startBtn.removeEventListener("click", start);
  },

  // Включаем работу кнопки 'рассчитать'
  enableButtonCount: function () {
    startBtn.style.backgroundColor = "#A52A2A";
    startBtn.addEventListener("click", start);
  },

  // Функция проверки условия заполненности формы информации по экранам
  conditionCheck: function () {
    for (let i = 0; i < screens.length; i++) {
      const index = screens[i].querySelector("select").selectedIndex;
      const input = +screens[i].querySelector("input").value;
      if (index !== 0 && input > 0) {
        appData.enableButtonCount();
      } else {
        appData.disableButtonCount();
        return;
      }
    }
  },
}; // AppData

appData.init();

