document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("scroll", onScroll);
    document.querySelector("#call-to-action").addEventListener("click", () => {
        document.querySelector("section.reserve").scrollIntoView({ behavior: 'smooth' });
    });
});

function onScroll(e) {
    let scroll = window.scrollY;
    let mouseIcon = document.querySelector("#scroll-icon-js");
    if (scroll == 0)
        showMouseIcon(mouseIcon);
    else
        hideMouseIcon(mouseIcon);
}

function showMouseIcon(icon) {
    icon.classList.remove("invisible");
}

function hideMouseIcon(icon) {
    icon.classList.add("invisible");
}
