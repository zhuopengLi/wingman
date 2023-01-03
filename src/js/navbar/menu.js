const acBtn = document.querySelector("#activity-btn");

export default acBtn.addEventListener("click", () => {
    acBtn.setAttribute(
        "aria-expanded",
        acBtn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
});