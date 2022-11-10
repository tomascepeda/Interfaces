document.addEventListener("DOMContentLoaded", () => {
    loading();
    loadAnimatedItemsSidebar();
    loadScrolls();
    loadCarouselsPageables();
    loadAccordions();
    loadCartButtons();
    document.querySelector(".button-toggle-nav-menu-js").addEventListener("click", toggleNav);
    reduceHeader();
    document.addEventListener("scroll", reduceHeader)
    let autoScrollBtns = document.querySelectorAll(".auto-scroll-top");
    autoScrollBtns.forEach(autoScrollBtn => {
        autoScrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

let id = makeCounter();
let autoScrollInterval = 3000;
let carouselIntervals = new Map();

function toggleNav() {
    let navMenu = document.querySelector("#sidebar-js");
    let navBackground = document.querySelector("#sidebar-menu-background-js");
    navBackground.classList.toggle("open");
    navMenu.classList.toggle("open");
}

function reduceHeader() {
    let min = 55;
    let max = 84;
    let maxScroll = 200;
    let diff = max - min;
    let element = document.querySelector("#nav");
    let scroll = window.scrollY < 0 ? 0 : window.scrollY;
    scroll = scroll > maxScroll ? maxScroll : scroll;
    let percentage = (scroll / (maxScroll / 100)) / 100;
    let headerHeight = (max - (diff * percentage));
    element.style = "height: " + headerHeight + "px";

    let sidebar = document.querySelector(".sidebar");
    let sidebarHeight = window.innerHeight - headerHeight;
    sidebar.style.top = headerHeight + "px";
    sidebar.style.height = sidebarHeight + "px";
}
    

function loadAnimatedItemsSidebar() {
    let items = document.querySelectorAll(".sidebar ul li");
    let hiddenItems = 0;
    let milisecondsDelay = 30;
    items.forEach((item, i) => {
        let isHidden = item.classList.contains("d-none");
        if (isHidden)
            hiddenItems++;
        
        item.style.transitionDelay = `${(i - hiddenItems) * milisecondsDelay}ms`;
    });
}

function loading() {
    let progress = document.getElementById("progress");
    if (progress) {
        let i = 0;
        let timeProgress = setInterval(() => {
            if (i <= 100)
                progress.innerHTML = "Cargando " + i++ + "%";
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
        }, 1);
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

function loadCarouselsPageables() {
    let carousels = document.querySelectorAll(".carousel-pageable");
    setTimeout(() => {
        carousels.forEach(carousel => {
            let carouselId = id();
            carousel.setAttribute("value", 0);
            carousel.setAttribute("id", carouselId);
            let countPages = getAmountPages(carousel);
            let carouselPagesDiv = document.createElement("div");
            carouselPagesDiv.className = "carousel-pages";
            let intervalAutoScroll = setInterval(() => autoScroll(carousel), autoScrollInterval);
            carouselIntervals.set(carouselId, intervalAutoScroll);
            for (let i = 0; i < countPages; i++) {
                let div = document.createElement("div");
                div.setAttribute("value", i);
                if (i == 0)
                    div.className = "active";
                carouselPagesDiv.appendChild(div);
                div.addEventListener("click", () => onClickPage(i, carousel, intervalAutoScroll))
            }
            carousel.parentNode.insertBefore(carouselPagesDiv, carousel.nextSibling);
        });
    }, 1);
}

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}

function autoScroll(carousel) {
    let amountPages = getAmountPages(carousel) -1;
    let currentPage = parseInt(carousel.getAttribute("value"));
    if (amountPages == currentPage) 
        onClickPage(0, carousel);
    else
        onClickPage(currentPage+1, carousel);
        
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function onClickPage(pageNum, carousel, interval = false) {
    if (interval)
        clearInterval(interval);
    let amountPages = getAmountPages(carousel);
    let btnPrevious = carousel.previousElementSibling.querySelector(".carousel-previous");
    let btnNext = carousel.previousElementSibling.querySelector(".carousel-next");
    btnPrevious.classList.remove("invisible");
    btnNext.classList.remove("invisible");
    if (pageNum == 0) {
        btnPrevious.classList.add("invisible");
    }
    if ((amountPages -1) == pageNum) {
        btnNext.classList.add("invisible");
    }
    carousel.setAttribute("value", pageNum);
    let scroll = carousel.clientWidth * pageNum;
    let pages = Array.from(carousel.nextElementSibling.children);
    pages.forEach((page, i) => {
        page.classList.remove("active");
        if (i == pageNum)
            page.classList.add("active");
    })
    carousel.scroll({
        left: scroll,
        top: 0,
        behavior: 'smooth'
    });
}

function isPageableCarousel(carousel) {
    return carousel.classList.contains("carousel-pageable");
}

function scrollLeft(btn) {
    let cardWidth = document.querySelector(".carousel .card").clientWidth;
    let carousel = btn.parentElement.nextElementSibling;
    if (isPageableCarousel(carousel)) {
        let carouselInterval = carouselIntervals.get(parseInt(carousel.getAttribute("id")));
        onClickPage(getPreviousPage(carousel), carousel, carouselInterval);
    } else {
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
}

function scrollRight(btn) {
    let cardWidth = document.querySelector(".carousel .card").clientWidth;
    let carousel = btn.parentElement.nextElementSibling;
    if (isPageableCarousel(carousel)) {
        let carouselInterval = carouselIntervals.get(parseInt(carousel.getAttribute("id")));
        onClickPage(getNextPage(carousel), carousel, carouselInterval);
    } else {
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
}

function getAmountPages(carousel) {
    return Math.ceil(carousel.scrollWidth / carousel.clientWidth)
}

function getNextPage(carousel) {
    return parseInt(carousel.getAttribute("value"))+1;
}

function getPreviousPage(carousel) {
    return parseInt(carousel.getAttribute("value"))-1;
}

function loadAccordions() {
    let accordions = document.querySelectorAll(".accordion-header");
    accordions.forEach(accordionHeader => {
        accordionHeader.addEventListener("click", () => {
            let accordionContent = accordionHeader.nextElementSibling;
            accordionHeader.classList.toggle("open");
            accordionContent.classList.toggle("open");
        });
    });
}

function loadCartButtons() {
    document.querySelectorAll(".btn-accent").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let btnMessage = btn.querySelector(".add-to-cart-message");
            let btnCart = document.querySelector("#btn-cart");
            let cartCounter = document.querySelector("#cart-counter");
            let gamesInChart = parseInt(cartCounter.innerHTML);
            if (btn.classList.contains("added")) {
                btnMessage.innerHTML = "Agregar al carrito";
                btn.classList.remove("added");
                gamesInChart--;
                cartCounter.innerHTML = gamesInChart;
                if (gamesInChart == "0")
                    btnCart.classList.add("none");
            } else {
                btnMessage.innerHTML = "Quitar del carrito";
                gamesInChart++;
                cartCounter.innerHTML = gamesInChart;
                btnCart.classList.remove("none");
                btn.classList.add("added");
            }
        });
    });
}