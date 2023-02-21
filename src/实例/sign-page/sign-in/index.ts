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
  addFocusedStyle("password");

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
  addErrorStyle("password");

  let email = document.getElementById("email") as HTMLInputElement;
  let password = document.getElementById("password") as HTMLInputElement;
  const message = document.getElementById("pop-message") as HTMLDivElement;
  const submit = document.getElementById("submit") as HTMLDivElement;

  submit.addEventListener("click", () => {
    if (email.value === "" || password.value === "") {
      message.classList.add("is-visible");
      setTimeout(() => message.classList.remove("is-visible"), 2 * 1000);
    }
    if (email.value === "") {
      email.classList.add("on-error");
    }
    if (password.value === "") {
      password.classList.add("on-error");
    }
  });
})();
