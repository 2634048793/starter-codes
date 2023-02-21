(function () {
  const submit = document.getElementById("submit") as HTMLDivElement;
  let text = document.getElementById("text") as HTMLInputElement;
  submit.addEventListener("click", () => {
    if (text.type === "password") {
        text.type = "text";
      }
    else
      {
        text.type = "password";
      }

  });
})();
