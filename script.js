let title = "Practice";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1200;
let rollback = 20;
let fullPrice = 50740;
let adaptive = true;

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
