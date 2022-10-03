document.addEventListener("DOMContentLoaded", () => {
    loading();
    let buttonsToggleNavMenu = document.querySelectorAll(".button-toggle-nav-menu-js");
    buttonsToggleNavMenu.forEach(button => button.addEventListener("click", toggleNav));
    loadScrolls();
});

function toggleNav() {
    let navMenu = document.querySelector("#sidebar-js");
    let navBackground = document.querySelector("#sidebar-menu-background-js");
    navBackground.classList.toggle("open");
    navMenu.classList.toggle("open");
    let svgs = document.querySelectorAll(".nav-hamburger svg");
    svgs.forEach(svg => {
        svg.classList.toggle("close-hamburger");
    });
}

function loading() {
    let progress = document.getElementById("progress");
    let i = 0;
    let timeProgress = setInterval(() => {
        if (i <= 100)
            progress.innerHTML = i++ + "%";
    }, 48);

    setTimeout(() => {
        document.getElementById("loading").classList.toggle("loading");
        document.getElementById("loading").classList.add("none");
        document.getElementById("nav").classList.toggle("none");
        document.getElementById("main").classList.toggle("none");
        clearInterval(timeProgress);
    }, 0);
}

function loadScrolls() {
    let previousBtns = document.querySelectorAll(".carousel-previous");
    let nextBtns = document.querySelectorAll(".carousel-next");
    previousBtns.forEach(btn => {
        btn.addEventListener("click", () => scrollLeft(btn));
    });
    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => scrollRight(btn));
    });
}

function scrollLeft(btn) {
    let carousel = btn.parentElement.nextElementSibling;
    btn.nextElementSibling.classList.remove("invisible");
    if (carousel.scrollLeft == 0) {
        btn.classList.add("invisible");
    }
    carousel.scroll({
        left: carousel.scrollLeft - document.querySelector(".carousel .card").clientWidth,
        top: 0,
        behavior: 'smooth'
    });
}

function scrollRight(btn) {
    let carousel = btn.parentElement.nextElementSibling;
    let maxScroll = carousel.scrollWidth - carousel.clientWidth;
    btn.previousElementSibling.classList.remove("invisible");
    if (carousel.scrollLeft >= maxScroll) {
        btn.classList.add("invisible");
    }
    carousel.scroll({
        left: carousel.scrollLeft + document.querySelector(".carousel .card").clientWidth,
        top: 0,
        behavior: 'smooth'
    });
}
