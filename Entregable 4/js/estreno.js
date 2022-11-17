import { scrollAnimation } from "./scrollAnimator.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("body").style.overflowX = "clip";
    document.querySelector("#call-to-action").addEventListener("click", () => {
        document.querySelector("section.reserve").scrollIntoView({ behavior: 'smooth' });
    });
    animateCards();
    animateLeftScroll();
    let charactersTitle = document.querySelector("#characters-title");
    scrollAnimation(charactersTitle, 550, (percentage) => {
        charactersTitle.style.opacity = percentage;
        charactersTitle.style.fontSize = 16 + (percentage * 18) + "px";
        charactersTitle.style.top = -90 + (percentage * 90) + "px";
    });
    let parallax = document.querySelector(".parallax");
    parallax.addEventListener("mousemove", cursorParallax)

    let scrollParallax = document.querySelector(".scrolleable");
    scrollAnimation(scrollParallax, scrollParallax.clientHeight - parallax.clientHeight, (percentage) => {
        let o = percentage;
        let navHeightInPx = document.getElementById("nav").clientHeight;
        parallax.style.top = navHeightInPx + "px";
        scrollParallax.style.marginTop = navHeightInPx *-1 + "px";
        let pela = document.querySelector(".the-rock");
        let logo = document.querySelector(".logo-parallax");
        let h1 = document.querySelector(".call-to-action");
        if(percentage <= 0.333) {
            percentage *= 3;
            document.querySelector(".buildings-2").style.opacity = 0.8 - percentage;
            document.querySelector(".sun").style.transform = "translateY(" + (percentage * 360) + "px)"
            pela.style.transform = setProperty(pela, "scale", 1 + (percentage*2));
            pela.style.left = 60 + (percentage * 60) + "%";
            logo.style.transform = setProperty(logo, "translateX", (percentage * ((parallax.clientWidth / 2) - logo.clientWidth / 2) + 20) + "px");
            h1.style.opacity = 0;
            h1.style.display = "none";
            let sand1 = document.querySelector(".sand");
            let sand2 = document.querySelector(".sand-2");
            let sand12 = document.querySelector(".sand-1-2");
            let sand22 = document.querySelector(".sand-2-2");
            let palm1 = document.querySelector(".palm-1");
            let palm2 = document.querySelector(".palm-2");
            let buildings = document.querySelector(".buildings-1");
            sand1.style.transform = setProperty(sand1, "scale", 1 + (percentage / 5));
            sand2.style.transform = setProperty(sand2, "scale", 1 + (percentage / 5));
            sand12.style.transform = setProperty(sand12, "scale", 1 + (percentage / 5));
            sand22.style.transform = setProperty(sand22, "scale", 1 + (percentage / 5));
            palm1.style.transform = setProperty(palm1, "scale", 1 + (percentage / 5));
            palm2.style.transform = setProperty(palm2, "scale", 1 + (percentage / 5));
            buildings.style.transform = setProperty(buildings, "scale", 1 + (percentage / 5));
            let sea = document.querySelector(".sea-2");
            sea.style.backgroundColor = "#4800d0";
            let img = document.getElementById("sea-img");
            img.style.opacity = 1 - (percentage / 1.8);
        } else if (percentage > 0.333 && percentage <= 0.666) {
            percentage -= 0.333;
            percentage *= 3;
            logo.style.transform = setProperty(logo, "scale", 1 + percentage);
            logo.style.transform = setProperty(logo, "translateY", ((percentage / 4) * 100) + "px");
            h1.style.opacity = 0;
            h1.style.display = "none";
        } else {
            h1.style.display = "inherit";
            percentage -= 0.666;
            percentage *= 3;
            h1.style.opacity = percentage + 0.3;
        }
    }, "start");
});

function animateLeftScroll() {
    let h1s = document.querySelectorAll(".scroll-animated-right-column h1");
    let images = document.querySelectorAll(".scroll-animated-left-column img");
    h1s.forEach((h1, i) => {
        let isFirstImage = i == 0;
        let isLastImage = i == h1s.length -1;
        let phaseOneFinish = 0.3;
        let phaseThreeStart = 0.7;
        let isOnPhaseOne = (percentage) => percentage <= phaseOneFinish;
        let isOnPhaseThree = (percentage) => percentage >= phaseThreeStart;
        let scrollValue = window.innerHeight + (window.innerHeight/3);
        if (isFirstImage)
            scrollAnimation(h1, scrollValue, (percentage) => {
                images[i].style.opacity = 1;
                images[i].style.left = 0;
                if (isOnPhaseOne(percentage)) {
                    let percentagePhaseOne = ((percentage * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = percentagePhaseOne;
                    images[i].style.left = percentage <= phaseOneFinish ? -120 + (percentagePhaseOne * 120) + "%" : "0";
                } else if (isOnPhaseThree(percentage)) {
                    let percentagePhaseThree = (((percentage - phaseThreeStart) * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = 1 - percentagePhaseThree;
                }
            });
        else if (isLastImage)
            scrollAnimation(h1, scrollValue, (percentage) => {
                if (percentage <= phaseThreeStart) {
                    let percentage2 = ((percentage * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = percentage2;
                    images[i].style.left = 0;
                } else {
                    let percentage2 = (((percentage - phaseThreeStart) * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = 1 - percentage2;
                    images[i].style.left = (percentage2 * -120) + "%";
                }
            });
        else
            scrollAnimation(h1, scrollValue, (percentage) => {
                images[i].style.opacity = 1;
                if (isOnPhaseOne(percentage)) {
                    let percentagePhaseOne = ((percentage * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = percentagePhaseOne;
                } else if (isOnPhaseThree(percentage)) {
                    let percentagePhaseThree = (((percentage - phaseThreeStart) * 100) / phaseOneFinish) / 100;
                    images[i].style.opacity = 1 - percentagePhaseThree;
                }
            });
    });
}

function animateCards() {
    let cards = document.querySelectorAll(".section-cards-info .card");
    let maxCardsAnimation = 500;
    scrollAnimation(cards[0], maxCardsAnimation, (percentage, card) => card.style.left = -35 + (percentage * 35) + "%");
    scrollAnimation(cards[1], maxCardsAnimation, (percentage, card) => card.style.marginTop = 200 - (percentage * 200) + "px");
    scrollAnimation(cards[2], maxCardsAnimation, (percentage, card) => card.style.left = 35 - (percentage * 35) + "%");
}

function cursorParallax(e) {
    let container = document.querySelector(".parallax").getBoundingClientRect();
    let x = e.clientX - container.left;
    let y = e.clientY - container.top;
    let percentX = x / container.width;
    let percentY = y / container.height;
    let maxSunMovementX = 110;
    let maxSunMovementY = 70;
    let left, top;
    let sun = document.querySelector(".sun");
    let sunHalfWidth = sun.offsetWidth / 2;
    let sunTop = 150;
    let shadowTop = 80;
    let shadowMin = 200;
    let diffPercent = (shadowTop - shadowMin) / 100;
    let shadowValue = (diffPercent * percentY * 100)*-1 + shadowTop;
    left = (sunHalfWidth - ((percentX + 1.5) * 2 * maxSunMovementX)) * -1;
    top = sunTop - ((percentY * 2 * maxSunMovementY));
    sun.style.left = "calc(50% - " + left + "px)";
    sun.style.top = top + "px";
    let shadow = document.querySelector(".buildings-2");
    shadow.style.transform = `rotateZ(180deg) rotateY(180deg) perspective(${shadowValue}px) rotateX(-45deg)`;
    let pela = document.querySelector(".the-rock");
    pela.style.transform = setProperty(pela, "translateX", (percentX * 10) - 10 + "%");
    pela.style.transform = setProperty(pela, "translateY", (percentY * 5) - 5 + "%");
    let sands = document.querySelectorAll(".s2-parallax");
    sands.forEach(s => s.style.transform = `translateX(${((percentX) * 2) - 2}%) translateY(${((percentY) * 5) - 5}%)`);
    document.querySelector(".palm-1").style.transform = `rotate(8deg) rotateY(180deg) translateX(${((percentX) * 2) - 2}%) translateY(${((percentY) * 5) - 5}%)`;
}

function setProperty(element, property, value) {
    let elem = element.style.transform;
    let inicio = elem.indexOf(property);
    let index = inicio;
    if(inicio != -1) {
        while(elem[index] != ")")
                index++;
        elem = elem.substr(0, inicio-1) + elem.substr(index+1, elem.length-1);
    }
    elem = elem.substr(0, elem.length);
    elem += "" + property + "(" + value + ")";
    return elem;
}