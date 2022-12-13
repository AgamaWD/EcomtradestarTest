const phoneCheckRegEx = /[^\d+]/g

document.addEventListener("DOMContentLoaded", ready);
 
function ready() {
    const formThankyou = document.getElementById("form-thankyou");
    const phoneInput = formThankyou.querySelector("#phone");
    const nameInput = formThankyou.querySelector("#name");
    const urlParamsStr = window.location.search.substring(1);
    const changeBtns = formThankyou.querySelectorAll(".jsChangeBtn")
    const saveBtns = formThankyou.querySelectorAll(".jsSaveBtn")
    
     //заполнение полей формы из url
    urlParamsStr.split('&').forEach(param => {
        paramСomposition = param.split("=");
        if (paramСomposition[0] === "name") {
            nameInput.value = decodeURI(paramСomposition[1])
        } else if (paramСomposition[0] === "phone") {
            phoneInput.value = decodeURI(paramСomposition[1])
        }
    })

    //Обработка клика по кнопке "Изменить"
    changeBtns.forEach(function(btn) {
        btn.addEventListener("click", e => {
            let targetLabel = e.target.closest("label");
            let targetInput = targetLabel.querySelector("input");

            targetLabel.classList.add("_changeable");
            targetInput.removeAttribute("disabled");
            targetInput.focus();
        })
    })

    //Обработка клика по кнопке "Сохранить"
    saveBtns.forEach(function(btn) {
        btn.addEventListener("click", e => {
            let targetLabel = e.target.closest("label");
            let targetInput = targetLabel.querySelector("input");

            targetInput.blur();
            targetInput.setAttribute("disabled", true);
            targetLabel.classList.remove("_changeable");
        })
    })

    //Корректировка телефона. Только + и цифры
    phoneInput.addEventListener("keyup", () => {
        phoneInput.value = phoneInput.value.replace(phoneCheckRegEx,'');
    })

    //Корректировка телефона при автозаполнении. Только + и цифры
    phoneInput.addEventListener("change", () => {
        phoneInput.value = phoneInput.value.replace(phoneCheckRegEx,'');
    })
}