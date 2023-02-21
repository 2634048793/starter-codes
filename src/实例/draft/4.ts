(function () {
  document.addEventListener("click", () => {
    const message = document.getElementById("pop-message") as HTMLDivElement;
    message.classList.add("is-visible");
    setTimeout(() => message.classList.remove("is-visible"), 2 * 1000);
  });
})();
