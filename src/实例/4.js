(function () {
    document.addEventListener("click", function () {
        var message = document.getElementById("pop-message");
        message.style.display = "block";
        setTimeout(function () { return message.classList.add("is-visible"); });
        setTimeout(function () { return message.classList.remove("is-visible"); }, 2 * 1000);
    });
})();
