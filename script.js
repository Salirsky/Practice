"Use strict";

// let title = " КаЛьКулятор Верстки";
// let screens = "Простые, Сложные, Интерактивные";
// let screenPrice = 16999;
// let adaptive = true;
// let service1 = "Светлая/тёмная темы";
// let servicePrice1 = 9325;
// let service2 = "Переключение языков ru/eng";
// let servicePrice2 = 7560;
let rollback = 20;

let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices, fullPrice, servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );

  screenPrice = +prompt("Сколько будет стоить данная работа?", "16999");

  while (
    !isNumber(screenPrice)
    // isNaN(screenPrice) ||
    // screenPrice.trim() === "" ||
    // screenPrice === null
    // Много проверок - много возможных ошибок. Есть решение изящнее.
  ) {
    screenPrice = +prompt("Сколько будет стоить данная работа?", "16999");
  }

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Светлая/тёмная темы"
      );
    } else if (i === 1) {
      service2 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Переключение языков ru/eng"
      );
    }
    sum += +prompt("Сколько это будет стоить?", "5999");
  }
  return sum;
  // return servicePrice1 + servicePrice1;
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
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
  return screenPrice + allServicePrices;
}

const getTitle = function () {
  title = title.trim();
  title = title.toLowerCase();
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return title;
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(
  "Стоимость вёрстки экранов " +
    screenPrice +
    " рублей и стоимость разработки сайта " +
    fullPrice +
    " рублей"
);

// console.log(screens.toLowerCase().split(", "));
// console.log(servicePercentPrice);
// console.log("Стоимость разработки сайта " + fullPrice + " рублей");
// console.log(screens.toLowerCase().split(", "));
// console.log(  "Процент отката посреднику за работу " +
//     fullPrice * (rollback / 100) +
//     " рублей"
// );
