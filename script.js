
"Use strict";

let title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", "16999");
let adaptive = confirm("Нужен ли адаптив на сайте?");
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

let rollback = 20;

let allServicePrices, fullPrice, servicePercentPrice;

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

const getAllServicePrices = function (a, b) {
  return a + b;
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

//вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

//вывод строки с типами экранов для разработки screens
console.log(screens.toLowerCase().split(", "));

//сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(fullPrice));

//стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
console.log(servicePercentPrice);

