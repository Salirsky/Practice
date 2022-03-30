// "Use strict";

let title = prompt("Как называется ваш проект?");
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
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

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

const getAllServicePrices = function () {
  const allServicePrices = servicePrice1 + servicePrice2;
};

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(screens.toLowerCase().split(", "));

console.log(getRollbackMessage(fullPrice));
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(
  "Процент отката посреднику за работу " +
    fullPrice * (rollback / 100) +
    " рублей"
);
console.log(servicePercentPrice);
console.log(fullPrice);
