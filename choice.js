
    const choiceList =document.querySelector('.choice-list')

    choiceList.addEventListener('click', function (e) {
        if (e.target.className === 'choice-list__title') {
            e.target.parentElement.classList.toggle('active')
            const itenId = localStorage.getItem('itenId')
            localStorage.setItem('itenId', e.target.parentElement.id)

            if (itenId != e.target.parentElement.id) {
                element.getElementById(itenId).classList.remove('active')
                localStorage.removeItem('itenId')
                localStorage.setItem('itenId', e.target.parentElement.id)
            }

            if (window.innerWidth <= 480 && e.target.parentElement.classList.contains('active')) {
                console.log(e.target.parentElement.previousElementSibling);
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