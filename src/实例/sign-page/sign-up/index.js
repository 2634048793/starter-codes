(function () {
    var addFocusedStyle = function (id) {
        var input = document.getElementById(id);
        input.addEventListener("focus", function () {
            input.classList.add("on-focus");
        });
        input.addEventListener("blur", function () {
            input.classList.remove("on-focus");
        });
    };
    addFocusedStyle("email");
    addFocusedStyle("verification");
    addFocusedStyle("password");
    addFocusedStyle("confirm");
    addFocusedStyle("invite");
    var addErrorStyle = function (id) {
        var input = document.getElementById(id);
        var validate = function () {
            if (input.value === "") {
                input.classList.add("on-error");
            }
            else {
                input.classList.remove("on-error");
            }
        };
        input.addEventListener("input", validate);
        input.addEventListener("blur", validate);
    };
    addErrorStyle("email");
    addErrorStyle("verification");
    addErrorStyle("password");
    addErrorStyle("confirm");
    addErrorStyle("invite");
    var email = document.getElementById("email");
    var verification = document.getElementById("verification");
    var passwordil = document.getElementById("password");
    var confirm = document.getElementById("confirm");
    var invite = document.getElementById("invite");
    var message = document.getElementById("pop-message");
    var submit = document.getElementById("submit");
    submit.addEventListener("click", function () {
        if (email.value === "" ||
            verification.value === "" ||
            passwordil.value === "" ||
            confirm.value === "" ||
            invite.value === "") {
            message.classList.add("is-visible");
        }
        setTimeout(function () { return message.classList.remove("is-visible"); }, 2 * 1000);
        if (email.value === "") {
            email.classList.add("on-error");
        }
        if (verification.value === "") {
            verification.classList.add("on-error");
        }
        if (passwordil.value === "") {
            passwordil.classList.add("on-error");
        }
        if (confirm.value === "") {
            confirm.classList.add("on-error");
        }
        if (invite.value === "") {
            invite.classList.add("on-error");
        }
    });
    var sendCode = document.getElementById("send-code");
    var countDown = document.getElementById("count-down");
    sendCode.addEventListener("click", function () {
        sendCode.style.display = "none";
        countDown.style.display = "block";
        var count = 59;
        countDown.innerText = count + "s";
        var timer = setInterval(function () {
            countDown.innerText = count + "s";
            count--;
            if (count <= 0) {
                clearInterval(timer);
                sendCode.style.display = "block";
                countDown.style.display = "none";
            }
        }, 1000);
    });
})();
