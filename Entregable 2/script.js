document.addEventListener("DOMContentLoaded", () => {
    let buttonsToggleNavMenu = document.querySelectorAll(".button-toggle-nav-menu-js");
    buttonsToggleNavMenu.forEach(button => button.addEventListener("click", toggleNav));
    loading();
});

function toggleNav() {
    let navMenu = document.querySelector("#sidebar-js");
    let navBackground = document.querySelector("#sidebar-menu-background-js");
    navBackground.classList.toggle("open");
    navMenu.classList.toggle("open");
}

function loading() {
    
    let progress = document.getElementById("progress");
    let i = 0;
    let timeProgress = setInterval(() => {
        if(i <= 100)
            progress.innerHTML = i++ + "%";
    }, 48);

    setTimeout(() => {
        document.getElementById("loading").classList.toggle("loading");
        document.getElementById("loading").classList.add("none");
        document.getElementById("nav").classList.toggle("none");
        document.getElementById("main").classList.toggle("none");
        clearInterval(timeProgress);
    }, 5000);
}