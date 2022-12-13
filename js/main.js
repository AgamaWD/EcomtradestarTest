const phoneCheckRegEx = /[^\d+]/g
//const thankyouPageUrl = "/thankyou.html"

//Для гитхаба
const thankyouPageUrl = `${document.location.protocol}//${document.location.host}/EcomtradestarTest/thankyou.html`

document.addEventListener("DOMContentLoaded", ready);
 
function ready() {
    const formOrder = document.getElementById("form-order");
    const phoneInput = formOrder.querySelector("#phone");
    const nameInput = formOrder.querySelector("#name");
    const modal = document.getElementById('modal');

    //добавление даты
    setDate()

    //Корректировка телефона. Только + и цифры
    phoneInput.addEventListener("keyup", () => {
        phoneInput.value = phoneInput.value.replace(phoneCheckRegEx,'');
    })

    //Корректировка телефона при автозаполнении. Только + и цифры
    phoneInput.addEventListener("change", () => {
        phoneInput.value = phoneInput.value.replace(phoneCheckRegEx,'');
    })

    //отправка формы и переход на страницу благодарности
    formOrder.addEventListener("submit", function(e) {
        this.submit();
        let values = `?name=${nameInput.value}&phone=${phoneInput.value}`
        setTimeout(function() {
            window.location.href = thankyouPageUrl + values;
        }, 0);
    });

}

//функция добавления даты
function setDate() {
    const currentDateEl = document.querySelector(".info__date._current");
    const lastDateEl = document.querySelector(".info__date._last");
    let currentDate = new Date();
    currentDateEl.textContent = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`
    let lastDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    lastDateEl.textContent = `${lastDate.getDate()}.${lastDate.getMonth() + 1}.${lastDate.getFullYear()}`

}

//расчёт высоты кнопок
function keyHeight() {
    const keys = document.querySelectorAll(".calculator__key");
    let keyWidth = keys[0].offsetWidth;
    keys.forEach(key => {
     key.style.height = keyWidth + "px";
    });    
} 

//работа модального окна
function openModal() {
    modal.classList.remove('hidden')
    keyHeight()
    calculator()
    document.body.style.overflow = "hidden"
    setTimeout(() => {document.addEventListener('click', outsideClick)}, 0)
};

function closeModal() {
    document.body.style.overflow = "visible"
    modal.classList.add('hidden')
    document.removeEventListener('click', outsideClick)
};

function outsideClick(event) {
    const modalClass = '.modal__body';
    const targetEl = event.target;
    const targetParent = targetEl.closest(modalClass);

    if(!targetEl.classList.contains(modalClass) && targetParent === null) {
        modal.classList.add('hidden')
        document.removeEventListener('click', outsideClick)
    }
}

function calculator() {
    const calculator = document.getElementById("calculator");
    const btns = calculator.querySelectorAll(".calculator__key");
    const result = calculator.querySelector(".calculator__result");
    const regExNumber = /[\d,]/;
    const regExAction = /[+\-x\/]/;

    btns.forEach(function(btn) {
        btn.addEventListener("click", (e) => {
            let btnValue = e.target.textContent

            if(btnValue.match(regExNumber)) {
                result.value = result.value == "0" && btnValue != "," ? btnValue : result.value + btnValue
            }else if(btnValue.match(regExAction) && btnValue.length == 1) {
                result.value = "0"
            }else if(btnValue == "=") {
                result.value = "0"
            }else if(btnValue == "%") {
                result.value = "0"
            }else if(btnValue == "+/-") {
                result.value = "0"
            }else if(btnValue == "AC") {
                result.value = "0"
            }
        })
    })
}