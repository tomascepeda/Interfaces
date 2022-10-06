document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("scroll", onScroll);
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
