"Use strict";

const appData = {
  rollback: 20,
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  // servPrice: 0,
  services: {},

  // Убрали все переопределения функций и теперь этот метод нужен только для вызова всех функций в нужном порядке.
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getTitle();
    appData.getServicePercentPrice();

    appData.logger();
  },

  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        " КаЛьКулятор Верстки"
      );
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какие типы экранов нужно разработать?", "Простые");
      let price = 0;
      do {
        price = +prompt("Сколько будет стоить данная работа?", "20000");
      } while (!appData.isNumber(appData.screenPrice));

      appData.screens.push({ id: i, name: name, price: price }); // Внутрь массива сохраняем элемент в виде объекта, у которого будет идентификатор, имя и стоимость
    }

    for (let i = 0; i < 2; i++) {
      // Воспользоваться итератором (переменной i), чтобы решить проблему схлопывания name в случае одинакового названия
      let name = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Светлая/тёмная темы"
      );
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", "6000");
      } while (!appData.isNumber(price));

      appData.services[name] = +price; // В виде ключа указываем переменную name, в виде значения - price. Таким образом мы собрали в объект servises все ответы на вопросы пользователю
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  // Этот метод будет заниматься высчитыванием стоимости услуг и экранов
  addPrices: function () {
    //Реализовать методом reduce
    for (let screen of appData.screens) {
      appData.screenPrice += screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  isString: function (str) {
    if (typeof str == "string") {
      return true;
    } else {
      return false;
    }
  },

  // Должен считать сумму всех доп. услуг. Функции стоит делать что-то одно, либо считать, либо задавать вопросы. Надо её отрефакторить.
  // Название и цену стоит записывать в объект в виде пар ключ:значение
  // Тогда мы сможем вопросы перенести в asking, а в функции оставить расчёты - это будет вернее с точки зрения логики
  //getAllServicePrices: function () {
  // Т.к на момент запуска данного метода у нас уже будет существовать объект с ответами на вопросы,
  // Нам остаётся перебрать этот объект циклом for---in и просто суммировать стоимость

  // Таким образом, в св-ва allServicePrices попадёт сумма всех значений из appData.services
  //},

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

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title = appData.title.trim();
    appData.title = appData.title.toLowerCase();
    appData.title =
      appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
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

    // for (let key in appData) {
    //   console.log(key);
    // }
  },
}; // AppData

appData.start();

console.log(appData.title);
