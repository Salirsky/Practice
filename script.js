let title = "Practice";
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", "16999");
let rollback = 20;

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

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
// let servicePercentPrice2 = (fullPrice - fullPrice * (rollback / 100));

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));

console.log(
  "Процент отката посреднику за работу " +
    fullPrice * (rollback / 100) +
    " рублей"
);

console.log(servicePercentPrice);
console.log(fullPrice);

switch (true) {
  case 30000 <= fullPrice:
    console.log("Даем скидку в 10%");
    break;
  case 15000 <= fullPrice && fullPrice < 30000:
    console.log("Даем скидку в 5%");
    break;
  case fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    break;
  case fullPrice < 0:
    console.log("Что-то пошло не так");
    break;
  default:
    console.log("Всё пошло вообще не так");
}
