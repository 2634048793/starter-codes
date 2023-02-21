(function () {
  let name = document.getElementById("name") as HTMLInputElement;
  let nameError = document.getElementById("name-error") as HTMLDivElement;
  let validate = () => {
    if (name.value === "") {
      name.classList.add("on-error");
      nameError.style.display = "block";
    } else {
      name.classList.remove("on-error");
      name.classList.add("on-input");
      nameError.style.display = "none";
    }
  };
  name.addEventListener("input", validate);
  name.addEventListener("blur", validate);

})();
