"Use strict";

// let title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
// let screens = prompt(
//   "Какие типы экранов нужно разработать?",
//   "Простые, Сложные, Интерактивные"
// );
// let screenPrice = +prompt("Сколько будет стоить данная работа?", "16999");
// let adaptive = confirm("Нужен ли адаптив на сайте?");

let title = " КаЛьКулятор Верстки";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 16999;
let adaptive = true;
// let service1 = "Светлая/тёмная темы";
// let servicePrice1 = 9325;
// let service2 = "Переключение языков ru/eng";
// let servicePrice2 = 7560;

let rollback = 20;
let allServicePrices, fullPrice, servicePercentPrice;

let service1 = prompt(
  "Какой дополнительный тип услуги нужен?",
  "Светлая/тёмная темы"
);
let servicePrice1 = +prompt("Сколько это будет стоить?", "8325");
let service2 = prompt(
  "Какой дополнительный тип услуги нужен?",
  "Переключение языков ru/eng"
);
let servicePrice2 = +prompt("Сколько это будет стоить?", "7560");

const getAllServicePrices = function (a, b) {
  return a + b;
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

function getFullPrice(a, b) {
  return a + b;
}

const getTitle = function (str) {
  if (str.startsWith(" ")) {
    str = str.trim();
  }
  str = str.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
};

const getServicePercentPrices = function (num, rol) {
  return Math.ceil(num - num * (rol / 100));
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

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
