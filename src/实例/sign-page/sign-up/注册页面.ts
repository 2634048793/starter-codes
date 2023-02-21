(function () {
  const addFocusedStyle = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement;
    input.addEventListener("focus", () => {
      input.classList.add("on-focus");
    });
    input.addEventListener("blur", () => {
      input.classList.remove("on-focus");
    });
  };

  addFocusedStyle("email");
  addFocusedStyle("verification");
  addFocusedStyle("password");
  addFocusedStyle("confirm");
  addFocusedStyle("invite");

  const addErrorStyle = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement;
    let validate = () => {
      if (input.value === "") {
        input.classList.add("on-error");
      } else {
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

  let email = document.getElementById("email") as HTMLInputElement;
  let verification = document.getElementById(
    "verification"
  ) as HTMLInputElement;
  let passwordil = document.getElementById("password") as HTMLInputElement;
  let confirm = document.getElementById("confirm") as HTMLInputElement;
  let invite = document.getElementById("invite") as HTMLInputElement;
  const message = document.getElementById("pop-message") as HTMLDivElement;
  const submit = document.getElementById("submit") as HTMLDivElement;
  submit.addEventListener("click", () => {
    if (
      email.value === "" ||
      verification.value === "" ||
      passwordil.value === "" ||
      confirm.value === "" ||
      invite.value === ""
    ) {
      message.classList.add("is-visible");
    }
    setTimeout(() => message.classList.remove("is-visible"), 2 * 1000);
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
})();
