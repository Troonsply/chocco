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

const form = document.querySelector('.form__tag')
const send = document.querySelector('.form__button')
const modal = document.querySelector('.modal')
const modalText = document.querySelector('.modal__title')
const modalExit = document.querySelector('.modal__btn')
const modalWindow = document.querySelector('.modal__window')
 
function validateForm(form) {
    let valid = true;

        if (!validateField(form.elements.name)) {
        valid = false;
    }
        if (!validateField(form.elements.phone)) {
        valid = false;
    }
        if (!validateField(form.elements.comment)) {
        valid = false;
    }
    return valid;
}

function validateField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();

}

send.addEventListener('click', function (e) {
  e.preventDefault();
  let formData = new FormData();

  if (validateForm(form)) {

    formData.append("name", form.elements.name.value);
    formData.append("phone", form.elements.phone.value);
    formData.append("comment", form.elements.comment.value);
    formData.append("to", "katyusha.buslova@gmail.com");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader("X-Requested-Width", "XMLHttpRequest");
    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log(xhr.response);
        modal.style.display = "block";
        modalWindow.style.opacity = "1";
        document.body.style.overflow = "hidden";
        modalText.textContent = "Отправка удалась";
      } else {
        modal.style.display = "block";
        modalWindow.style.opacity = "1";
        document.body.style.overflow = "hidden";
        modalText.textContent = "Произошла ошибка";

      }
    });
  }
});
modalExit.addEventListener('click', function(e){
  e.preventDefault();
  modal.style.display = 'none';
  document.body.style.overflow = "auto";
  
});
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
   
  }
}


