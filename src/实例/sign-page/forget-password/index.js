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
    addFocusedStyle("code");
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
    addErrorStyle("code");
    var email = document.getElementById("email");
    var code = document.getElementById("code");
    var message = document.getElementById("pop-message");
    var submit = document.getElementById("submit");
    submit.addEventListener("click", function () {
        if (email.value === "" || code.value === "") {
            message.classList.add("is-visible");
            setTimeout(function () { return message.classList.remove("is-visible"); }, 2 * 1000);
        }
        if (email.value === "") {
            email.classList.add("on-error");
        }
        if (code.value === "") {
            code.classList.add("on-error");
        }
    });
})();
