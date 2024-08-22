// adding focus state to the name element
document.getElementById('name').focus()

// adding the job role functionality
const jobRole = document.getElementById('title')
const otherJobRole = document.getElementById('other-job-role')

otherJobRole.style.display = 'none'

jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block'
    } else {
        otherJobRole.style.display = 'none'
    }
})

// t-shirt info functionality
const design = document.getElementById('design')
const color = document.getElementById('color')

color.disabled = true

design.addEventListener('change', (e) => {
    color.disabled = false
    for (let item of color.children) {
        if (e.target.value === item.getAttribute('data-theme')) {
            item.hidden = false
            item.selected = true
        } else {
            item.hidden = true
            item.selected = false
        }
    }
})

// calculating total of the activities

const activities = document.getElementById('activities')
const total = document.getElementById('activities-cost')
let total_sum = 0

activities.addEventListener('change', (e) => {
    if (e.target.checked) {
        total_sum += Number(e.target.getAttribute('data-cost'))
    } else {
        total_sum -= Number(e.target.getAttribute('data-cost'))
    }
    total.innerText = `Total: $${total_sum}`
})

// working on payment info section

const payment = document.getElementById('payment')
const creditCard = document.getElementById('credit-card')
const paypal = document.getElementById('paypal')
const bitcoin = document.getElementById('bitcoin')

paypal.hidden = true
bitcoin.hidden = true

payment.children[1].setAttribute('selected', true)

payment.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        paypal.hidden = true
        bitcoin.hidden = true
        creditCard.hidden = false
    }
    if (e.target.value === 'paypal') {
        paypal.hidden = false
        bitcoin.hidden = true
        creditCard.hidden = true
    }
    if (e.target.value === 'bitcoin') {
        paypal.hidden = true
        bitcoin.hidden = false
        creditCard.hidden = true
    }
})

// working on accessibility

const activitiesInput = activities.querySelectorAll('input[type="checkbox"]')

for (let item of activitiesInput) {
    item.addEventListener('focus', (e) => {
        item.parentElement.classList.add('focus')
    })
    item.addEventListener('blur', (e) => {
        item.parentElement.classList.remove('focus')
    })
}

// programming the activities section so that conflicting time slots are not selected (Extra Credit)

activities.addEventListener('change', (e) => {
    const val = e.target.dataset.dayAndTime
    
    for (let item of activitiesInput) {

        if (e.target.checked) {
            if (e.target === item) continue 
            if (item.dataset.dayAndTime === val) {
                item.classList.add('disabled')
                item.disabled = true 
            } 
            // else {
            //     item.classList.remove('disabled')
            //     item.disabled = false 
            // }
        } else {
            if (item.dataset.dayAndTime === val) {
                item.disabled = false 
            }
        }

        
    }
})

// working on form validation
const name = document.getElementById('name')
const email = document.getElementById('email')



const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    let isValid = true

    if (name.value === '') {
        name.parentElement.classList.add('not-valid')
        name.parentElement.classList.remove('valid')
        name.parentElement.lastElementChild.style.display = 'block'
        isValid = false
    } else {
        name.parentElement.classList.add('valid')
        name.parentElement.classList.remove('not-valid')
        name.parentElement.lastElementChild.style.display = 'none'
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const bool = emailPattern.test(email.value)
    const emptyHint = document.getElementById('empty-hint')
    if (!bool) {
        isValid = false
        emptyHint.style.display = 'none'
        email.parentElement.classList.add('not-valid')
        email.parentElement.classList.remove('valid')
        email.parentElement.lastElementChild.style.display = 'block'
    } else {
        emptyHint.style.display = 'none'
        email.parentElement.classList.add('valid')
        email.parentElement.classList.remove('not-valid')
        email.parentElement.lastElementChild.style.display = 'none'
    }
    if (email.value === '') {
        email.parentElement.lastElementChild.style.display = 'none'
        emptyHint.style.display = 'block'
    }

    const checkboxes = activities.querySelectorAll('input[type="checkbox"]')

    let flag = false 

    for (let item of checkboxes) {
        if (item.checked) {
            flag = true
            break 
        }
    }

    if (!flag) {
        activities.classList.add('not-valid')
        activities.classList.remove('valid')
        activities.lastElementChild.style.display = 'block'
    } else {
        activities.classList.add('valid')
        activities.classList.remove('not-valid')
        activities.lastElementChild.style.display = 'none'
    }

    let creditFlag = true

    if (payment.value === 'credit-card') {
        const card = document.getElementById('cc-num')
        const zip = document.getElementById('zip')
        const cvv = document.getElementById('cvv')
        const cardPattern = /^\d{13,16}$/
        const zipPattern = /^\d{5}$/
        const cvvPattern = /^\d{3}$/

        const cardBool = cardPattern.test(card.value)
        const zipBool = zipPattern.test(zip.value)
        const cvvBool = cvvPattern.test(cvv.value)

        if (!cardBool) {
            card.parentElement.classList.add('not-valid')
            card.parentElement.classList.remove('valid')
            card.parentElement.lastElementChild.style.display = 'block'
            creditFlag = false
        } else {
            card.parentElement.classList.add('valid')
            card.parentElement.classList.remove('not-valid')
            card.parentElement.lastElementChild.style.display = 'none'
        }

        if (!zipBool) {
            zip.parentElement.classList.add('not-valid')
            zip.parentElement.classList.remove('valid')
            zip.parentElement.lastElementChild.style.display = 'block'
            creditFlag = false
        } else {
            zip.parentElement.classList.add('valid')
            zip.parentElement.classList.remove('not-valid')
            zip.parentElement.lastElementChild.style.display = 'none'
        }

        if (!cvvBool) {
            cvv.parentElement.classList.add('not-valid')
            cvv.parentElement.classList.remove('valid')
            cvv.parentElement.lastElementChild.style.display = 'block'
            creditFlag = false
        } else {
            cvv.parentElement.classList.add('valid')
            cvv.parentElement.classList.remove('not-valid')
            cvv.parentElement.lastElementChild.style.display = 'none'
        }

    }

    if (isValid && flag && creditFlag) {
        console.log('correct')
    } else {
        e.preventDefault()
    }

})

// Programming real time error messages

email.addEventListener('keyup', (e) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const bool = emailPattern.test(email.value)
    document.getElementById('empty-hint').style.display = 'none'
    if (!bool) {
        email.parentElement.classList.add('not-valid')
        email.parentElement.classList.remove('valid')
        email.parentElement.lastElementChild.style.display = 'block'
    } else {
        email.parentElement.classList.add('valid')
        email.parentElement.classList.remove('not-valid')
        email.parentElement.lastElementChild.style.display = 'none'
    }
    if (email.value === '') {
        email.parentElement.classList.remove('not-valid')
        email.parentElement.lastElementChild.style.display = 'none'
    }
})


