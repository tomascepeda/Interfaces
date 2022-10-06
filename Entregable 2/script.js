document.addEventListener("DOMContentLoaded", () => {
    loading();
    loadScrolls();
    let buttonsToggleNavMenu = document.querySelectorAll(".button-toggle-nav-menu-js");
    buttonsToggleNavMenu.forEach(button => button.addEventListener("click", toggleNav));
    let autoScrollBtn = document.getElementById("auto-scroll-top");
    if (autoScrollBtn) {
        autoScrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
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
    if (progress) {
        let i = 0;
        let timeProgress = setInterval(() => {
            if (i <= 100)
                progress.innerHTML = i++ + "%";
        }, 48);

        setTimeout(() => {
            let loading = document.getElementById("loading");
            if (loading) {
                loading.classList.toggle("loading");
                loading.classList.add("none");
                document.getElementById("nav").classList.toggle("none");
                document.getElementById("main").classList.toggle("none");
                clearInterval(timeProgress);
            }
        }, 5000);
    }
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
    let cardWidth = document.querySelector(".carousel .card").clientWidth;
    let carousel = btn.parentElement.nextElementSibling;
    btn.nextElementSibling.classList.remove("invisible");
    if (carousel.scrollLeft <= (cardWidth * 3)) {
        btn.classList.add("invisible");
    }
    carousel.scroll({
        left: carousel.scrollLeft - (cardWidth * 3),
        top: 0,
        behavior: 'smooth'
    });
}

function scrollRight(btn) {
    let cardWidth = document.querySelector(".carousel .card").clientWidth;
    let carousel = btn.parentElement.nextElementSibling;
    let maxScroll = carousel.scrollWidth - carousel.clientWidth;
    btn.previousElementSibling.classList.remove("invisible");
    if (carousel.scrollLeft >= (maxScroll - cardWidth * 3)) {
        btn.classList.add("invisible");
    }
    carousel.scroll({
        left: carousel.scrollLeft + (cardWidth * 3),
        top: 0,
        behavior: 'smooth'
    });
}
