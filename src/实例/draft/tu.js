(function () {
    var submit = document.getElementById("submit");
    var text = document.getElementById("text");
    submit.addEventListener("click", function () {
        if (text.type === "password") {
            text.type = "text";
        }
        else {
            text.type = "password";
        }
    });
})();
