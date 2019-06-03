const choiceList = document.querySelector('choice-list')

choiceList.addEventListener ('click', function (e) {
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

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#items");
const firstSlide = document.getElementsByClassName('first-slide');
const lastSlide = document.getElementsByClassName('last-slide');
const firstStep = 0;
const lastStep = document.body.clientWidth;
let currentStep = 0;

items.style.right = currentStep;

right.addEventListener("click", function(){
    firstSlide.style.display = 'flex';
    lastSlide.style.display = 'none';
    console.log(firstSlide);

  
 
});