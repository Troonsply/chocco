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
        modalText.textContent = "Отправлено";
      } else {
        modal.style.display = "block";
        modalWindow.style.opacity = "1";
        document.body.style.overflow = "hidden";
        modalText.textContent = "Ошибка";

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

