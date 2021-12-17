document.addEventListener('DOMContentLoaded', function () {

  //select выбор материалов//            
  const element = document.querySelector('#selectCustom'),
    //Библиотечный second-selectCustom
    second = document.querySelector('second-selectCustom');
  const choices = new Choices(element, {
    searchEnabled: false
  });

  //Типа счётчика для следующих select
  let selects = document.querySelectorAll('.my-select')

  selects.forEach((element) => {
    const choices = new Choices(element, {
      searchEnabled: false
    });
  })


  //Яндекс карта map//
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', { //1 метка
        center: [48.87221569451269, 2.3541800858743356],
        zoom: 17,
        controls: [] //Убрали увеличитель и др..
      }, {
        searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myGeoObject = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Евклид',
        balloonContent: '10:00-20:00'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/favicon-map.png',
        // iconImageHref: 'https://e7.pngegg.com/pngimages/142/60/png-clipart-computer-icons-geo-fence-others-miscellaneous-fence.png',
        // Размеры метки.
        iconImageSize: [30, 42],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
      }),

      myPlacemark = new ymaps.Placemark([], { //2 метка
        hintContent: 'Отели',
        balloonContent: 'июль',
        iconContent: '12'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: 'https://e7.pngegg.com/pngimages/142/60/png-clipart-computer-icons-geo-fence-others-miscellaneous-fence.png',
        // Размеры метки.
        iconImageSize: [48, 48],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-24, -24],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [15, 15],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout
      });

    myMap.geoObjects.add(myGeoObject);
  });

  //Маска телефона//
  var selector = document.querySelector("input[type='tel']"); //Всем input с атрибутом type со значением tel
  var im = new Inputmask("+7 (999)-999-99-99"); //Задали внешний вид маски

  //С помощью метода .mask инициализировали этот плагин и натравили его на selector-ы input[type='tel']
  im.mask(selector);

  //Валидация телефона//
  //Первый аргумент передаём селектор т.е html с классом form
  new JustValidate('.form', {
    //Второй аргумент передаём его(form) правила
    rules: {
      name: { //data-validate-field="name"
        required: true, //Это означает поле обязательное для заполнение
        minLength: 2,
        maxLenght: 30
      },
      tel: { //data-validate-rules="phone"
        required: true, //Это означает поле обязательное для заполнение
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          console.log(phone)
          return Number(phone) && phone.length === 10
        }
      },
      mail: { //data-validate-field="mail"
        required: true, //Это означает поле обязательное для заполнение
        email: true //Проверяет сама себя на валидность, например @ на месте
      },
    },
    //От проверяющего дополнен код
    messages: { //Извещает об ошибке
      tel: {
        required: 'Укажите ваш телефон'
      },
      name: 'Как вас зовут?',
      mail: 'Укажите ваш e-mail'
    },
    colorWrong: '#FF5C00' //цвет сообщений валидации(ошибки фразы) и бордера
  });



})