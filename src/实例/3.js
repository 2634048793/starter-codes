(function () {
    var name = document.getElementById("name");
    var nameError = document.getElementById("name-error");
    var validate = function () {
        if (name.value === "") {
            name.classList.add("on-error");
            nameError.style.display = "block";
        }
        else {
            name.classList.remove("on-error");
            name.classList.add("on-input");
            nameError.style.display = "none";
        }
    };
    name.addEventListener("input", validate);
    name.addEventListener("blur", validate);
})();
