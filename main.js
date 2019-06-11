//полноэкранное меню

const menuOpen = document.getElementById('menuOpen');
const menuModal = document.getElementById('menuModal');
const menuClose = document.getElementById('menuClose');
    menuOpen.onclick = function () {
    menuModal.style.display = "flex";
};
    menuClose.onclick = function () {
    menuModal.style.display = "none";
};
//меню

const choiceList = document.querySelector('.choice-list')

choiceList.addEventListener ('click', function (e) {
    e.preventDefault()
    if (e.target.className === 'choice-list__title') {
        e.target.parentElement.classList.toggle('active')
        const itenId = localStorage.getItem('itenId')
        localStorage.setItem('itenId', e.target.parentElement.id)

    if (itenId != e.target.parentElement.id) {
        document.getElementById(itenId).classList.remove('active')
        localStorage.removeItem('itenId')
        localStorage.setItem('itenId', e.target.parentElement.id)
    }

    if (window.innerWidth <= 480 && e.target.parentElement.classList.contains('active')) {
        if (!e.target.parentElement.previousElementSibling) {
            console.log('object')
            choiceList.style.transform = 'translateX(114px)'
        } else if (!e.target.parentElement.nextElementSibling) {
            console.log('object')
            choiceList.style.transform = 'translateX(0)'
        } else {
            choiceList.style.transform = 'translateX(57px)'
        }
        e.target.nextElementSibling.style.width = `${window.innerWidth - 57}px`;
    } else {
            choiceList.style.transform = 'translateX(0)'
        }
    }

})
//слайдер

var slides = document.getElementsByClassName("slider__screen"),
    prev = document.querySelector(".sale__arrow-previos"),
    next =  document.querySelector(".sale__arrow-next");
    
var slideIndex = 1; 
showElem(slideIndex);
prev.addEventListener('click', (e) => {
  e.preventDefault()
  showElem(slideIndex -=1)
})
next.addEventListener('click', (e) => {
  e.preventDefault()
  showElem(slideIndex += 1)
})

function showElem(n) {
  var i;
  if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display ="none";
    }
    slides[slideIndex-1].style.display ="flex";   
    
  }

//команда 
var acc = document.getElementsByClassName("team-acco__name");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("team-acco__name--active");
  });
}

//отзывы
const previewSliderOne = document.querySelector('.slider_one');
const previewSliderTwo = document.querySelector('.slider_two');
const previewSliderThree = document.querySelector('.slider_three');

const avatarOne = document.querySelector('.avatar_one');
const avatarTwo = document.querySelector('.avatar_two');
const avatarThree = document.querySelector('.avatar_three');
let numClick = 1;
var slideInterval_1 = setInterval(autoClick, 6000);

autoClick();

function deleteClassActive() {
  for (let i = 0; i < document.querySelectorAll('.avatar__img').length; i++) {
    document.querySelectorAll('.avatar__img')[i].classList.remove('avatar__img_active');
    document.querySelectorAll('.preview__slider')[i].classList.remove('preview__slider--active');
  }
}

function autoClick() {
  deleteClassActive();
  switch (numClick) {
    case 1: previewSliderOne.classList.add('preview__slider--active');
      avatarOne.classList.add('avatar__img_active');
      numClick++;
      break;
    case 2: previewSliderTwo.classList.add('preview__slider--active');
      avatarTwo.classList.add('avatar__img_active');
      numClick++;
      break;
    case 3:
      previewSliderThree.classList.add('preview__slider--active');
      avatarThree.classList.add('avatar__img_active');
      numClick = 1;
      break;
  }
}


avatarOne.addEventListener('click', function (e) {
  numClick = 1;
  autoClick();
});

avatarTwo.addEventListener('click', function (e) {
  numClick = 2;
  autoClick();
});

avatarThree.addEventListener('click', function (e) {
  numClick = 3;
  autoClick();
});
//форма
var orderForm = document.forms.orderForm,
    formElems = orderForm.elements;

var _loop = function _loop(_i2) {
  if (formElems[_i2].hasAttribute('required')) {
    formElems[_i2].addEventListener('keydown', function () {
      var nextElem = formElems[_i2].nextElementSibling;

      if (nextElem && nextElem.classList.contains('warn-message')) {
        nextElem.remove();

        formElems[_i2].classList.remove('invalid');
      }
    });
  }
};

for (var _i2 = 0; _i2 < formElems.length; _i2++) {
  _loop(_i2);
}

var orderBtn = document.forms[0].elements.orderBtn;
orderBtn.addEventListener('click', function (event) {
  event.preventDefault();
  var formData = new FormData();
  formData.append('name', formElems.userName.value);
  formData.append('phone', formElems.userPhone.value);
  formData.append('comment', formElems.userComment.value);

  function showWarning(elem) {
    var warnMessage = document.createElement('div');
    warnMessage.classList.add('warn-message');
    warnMessage.textContent = elem.validationMessage;
    elem.classList.add('invalid');
    elem.insertAdjacentElement('afterEnd', warnMessage);
  }

  function checkForm(form) {
    var result = true;

    for (var _i3 = 0; _i3 < form.length; _i3++) {
      var nextElem = form[_i3].nextElementSibling;

      if (nextElem) {
        if (nextElem.classList.contains('warn-message')) {
          nextElem.remove();
        }

        form[_i3].classList.remove('invalid');
      }

      if (!form[_i3].checkValidity()) {
        result = false;
        showWarning(form[_i3]);
      }
    }

    return result;
  }

  function sendForm() {
    if (checkForm(orderForm)) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.send(formData);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status < 400) {
            var response = JSON.parse(xhr.response);
            modal.querySelector('#modalText').innerText = 'Норм';
            modal.querySelector('#modalContent').innerText = response.message;
            modal.style.display = 'block';
            overlay.style.display = 'block';

            document.onwheel = function () {
              return false;
            };
          } else if (xhr.status > 400) {
            modal.querySelector('#modalText').innerText = 'Ошибка';
            modal.querySelector('#modalContent').innerText = 'При отправке сообщения возникла ошибка!';
            modal.style.display = 'block';
            overlay.style.display = 'block';

            document.onwheel = function () {
              return true;
            };
          }
        }
      };
    }
  }

  sendForm(orderForm);
});


//скролл
const sections = $(".section");
const display = $(".maincontent");

let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const switchActiveClassInSideMenu = menuItemIndex => {
  $(".fixed-menu__item")
    .eq(menuItemIndex)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const performTransition = sectionEq => {
  if (inscroll) return;

  const sectionEqNum = parseInt(sectionEq);

  if (!!sectionEqNum === false)
    console.error("не верное значение для аргуемента sectionEq");

  inscroll = true;

  const position = sectionEqNum * -100 + "%";

  sections
    .eq(sectionEq)
    .addClass("active")
    .siblings()
    .removeClass("active");

  display.css({
    transform: `translateY(${position})`
  });

  setTimeout(() => {
    inscroll = false;
    switchActiveClassInSideMenu(sectionEq);
  }, 1000 + 300);
};

const scrollToSection = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(".wrapper").on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection("next");
  }
  if (deltaY < 0) {
    scrollToSection("prev");
  }
});

$('.wrapper').on('touchmove', e => {
  e.preventDefault();
});

$(document).on("keydown", e => {
  switch (e.keyCode) {
    case 38:
      scrollToSection("prev");
      break;
    case 40:
      scrollToSection("next");
      break;
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  const target = $(e.currentTarget).attr("data-scroll-to");

  performTransition(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function(event, direction) {
      const nextOrPrev = direction === "up" ? "next" : "prev";
      scrollToSection(nextOrPrev);
    }
  });
}

