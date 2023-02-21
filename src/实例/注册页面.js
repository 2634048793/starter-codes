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
    //   let email = document.getElementById("email") as HTMLInputElement;
    //   let verification = document.getElementById(
    //     "verification"
    //   ) as HTMLInputElement;
    //   let passwordil = document.getElementById("password") as HTMLInputElement;
    //   let confirm = document.getElementById("confirm") as HTMLInputElement;
    //   let invite = document.getElementById("invite") as HTMLInputElement;
    //   const message = document.getElementById("pop-message") as HTMLDivElement;
    //   const submit = document.getElementById("submit") as HTMLDivElement;
    //   submit.addEventListener("click", () => {
    //     if (
    //       email.value === "" ||
    //       verification.value === "" ||
    //       passwordil.value === "" ||
    //       confirm.value === "" ||
    //       invite.value === ""
    //     ) {
    //       message.classList.add("is-vis");
    //       setTimeout(() => message.classList.remove("is-visible"), 2 * 1000);
    //     }
    //     if (email.value === "") {
    //       email.classList.add("on-error");
    //     }
    //     if (verification.value === "") {
    //       verification.classList.add("on-error");
    //     }
    //     if (passwordil.value === "") {
    //         passwordil.classList.add("on-error");
    //     }
    //     if (confirm.value === "") {
    //         confirm.classList.add("on-error");
    //     }
    //     if (invite.value === "") {
    //         invite.classList.add("on-error");
    //     }
    //   });
    var email = document.getElementById("email");
    var submit = document.getElementById("submit");
    var message = document.getElementById("pop-message");
    submit.addEventListener("click", function () {
        if (email.value === "") {
            email.classList.add("on-error");
            message.classList.add("is-visvle");
        }
    });
})();
