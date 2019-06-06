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


