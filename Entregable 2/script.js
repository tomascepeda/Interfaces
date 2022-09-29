document.addEventListener("DOMContentLoaded", () => {
    let buttonsToggleNavMenu = document.querySelectorAll(".button-toggle-nav-menu-js");
    buttonsToggleNavMenu.forEach(button => button.addEventListener("click", toggleNav));
    console.log("buttonsToggleNavMenu");
});

function toggleNav() {
    let navMenu = document.querySelector("#sidebar-js");
    let navBackground = document.querySelector("#sidebar-menu-background-js");
    navBackground.classList.toggle("open");
    navMenu.classList.toggle("open");
}
